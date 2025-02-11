import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CampaignItem from '../../src/components/CampaignItem';
import { Payout } from '../../src/types';

describe('CampaignItem', () => {
  const payouts: Payout[] = [{ id: 1, amount: 100, country: 'US', campaignId: "1" }];
  const onRun = jest.fn();
  const onStop = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders campaign item and handles run/stop actions', () => {
    render(
      <CampaignItem
        id="1"
        title="Test Campaign"
        landingPageUrl="http://test.com"
        payouts={payouts}
        isRunning={false}
        onRun={onRun}
        onStop={onStop}
      />
    );

    expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    expect(screen.getByText('http://test.com')).toBeInTheDocument();
    expect(screen.getByText('100 - US')).toBeInTheDocument();

    const runButton = screen.getByText('Run Campaign');
    fireEvent.click(runButton);

    expect(onRun).toHaveBeenCalledWith('1');

    render(
      <CampaignItem
        id="1"
        title="Test Campaign"
        landingPageUrl="http://test.com"
        payouts={payouts}
        isRunning={true}
        onRun={onRun}
        onStop={onStop}
      />
    );

    const stopButton = screen.getByText('Stop Campaign');
    fireEvent.click(stopButton);

    expect(onStop).toHaveBeenCalledWith('1');
  });
});
