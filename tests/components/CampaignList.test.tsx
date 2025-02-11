import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CampaignList from '../../src/components/CampaignList';
import { fetchCampaigns, runCampaign, stopCampaign } from '../../src/services/campaignService';
import { Campaign } from '../../src/types';

jest.mock('../../src/services/campaignService');

const mockedFetchCampaigns = fetchCampaigns as jest.MockedFunction<typeof fetchCampaigns>;
const mockedRunCampaign = runCampaign as jest.MockedFunction<typeof runCampaign>;
const mockedStopCampaign = stopCampaign as jest.MockedFunction<typeof stopCampaign>;

describe('CampaignList', () => {
  const campaigns: Campaign[] = [
    { id: '1', title: 'Campaign 1', landingPageUrl: 'http://campaign1.com', payouts: [], isRunning: false },
    { id: '2', title: 'Campaign 2', landingPageUrl: 'http://campaign2.com', payouts: [], isRunning: true },
  ];

  beforeEach(() => {
    mockedFetchCampaigns.mockResolvedValue(campaigns);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders campaign list and handles search and filter', async () => {
    render(<CampaignList />);

    await waitFor(() => expect(mockedFetchCampaigns).toHaveBeenCalled());

    expect(screen.getByPlaceholderText('Search by Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search by URL')).toBeInTheDocument();
    expect(screen.getByText('Any Status')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Search by Title'), { target: { value: 'Campaign 1' } });
    fireEvent.change(screen.getByPlaceholderText('Search by URL'), { target: { value: 'http://campaign1.com' } });
    fireEvent.change(screen.getByText('Any Status'), { target: { value: 'running' } });

    await waitFor(() => expect(mockedFetchCampaigns).toHaveBeenCalledTimes(2));
  });

  it('handles running and stopping campaigns', async () => {
    render(<CampaignList />);

    await waitFor(() => expect(mockedFetchCampaigns).toHaveBeenCalled());

    const runButton = screen.getByText('Run Campaign');
    fireEvent.click(runButton);

    await waitFor(() => expect(mockedRunCampaign).toHaveBeenCalledWith('1'));

    const stopButton = screen.getByText('Stop Campaign');
    fireEvent.click(stopButton);

    await waitFor(() => expect(mockedStopCampaign).toHaveBeenCalledWith('2'));
  });
});
