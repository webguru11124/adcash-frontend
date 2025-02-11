import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CampaignForm from '../../src/components/CampaignForm';

describe('CampaignForm', () => {
  const onSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form and handles submission', () => {
    render(<CampaignForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'New Campaign' } });
    fireEvent.change(screen.getByLabelText('Landing Page URL:'), { target: { value: 'http://new.com' } });
    fireEvent.change(screen.getByLabelText('Payouts:'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Payouts:'), { target: { value: 'US' } });

    fireEvent.click(screen.getByText('Create Campaign'));

    expect(onSubmit).toHaveBeenCalledWith({
      title: 'New Campaign',
      landingPageUrl: 'http://new.com',
      isRunning: false,
      payouts: [{ amount: 100, country: 'US' }],
    });
  });

  it('validates payouts before submission', () => {
    render(<CampaignForm onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText('Title:'), { target: { value: 'New Campaign' } });
    fireEvent.change(screen.getByLabelText('Landing Page URL:'), { target: { value: 'http://new.com' } });
    fireEvent.change(screen.getByLabelText('Payouts:'), { target: { value: '0' } });
    fireEvent.change(screen.getByLabelText('Payouts:'), { target: { value: '' } });

    fireEvent.click(screen.getByText('Create Campaign'));

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByText('Please ensure all payouts have a valid amount and country.')).toBeInTheDocument();
  });
});
