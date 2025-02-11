import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CampaignDetailsPage from '../../src/pages/CampaignDetailsPage';
import { getCampaignById, deleteCampaign } from '../../src/services/campaignService';
import { Campaign } from '../../src/types';

jest.mock('../../src/services/campaignService');
const mockedGetCampaignById = getCampaignById as jest.MockedFunction<typeof getCampaignById>;
const mockedDeleteCampaign = deleteCampaign as jest.MockedFunction<typeof deleteCampaign>;

describe('CampaignDetailsPage', () => {
  const campaign: Campaign = {
    id: '1',
    title: 'Test Campaign',
    landingPageUrl: 'http://test.com',
    payouts: [{ id: 1, amount: 100, country: 'US', campaignId: '1' }],
    isRunning: false,
  };

  beforeEach(() => {
    mockedGetCampaignById.mockResolvedValue(campaign);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders campaign details and handles delete', async () => {
    render(
      <MemoryRouter initialEntries={['/campaign/1']}>
        <Routes>
          <Route path="/campaign/:id" element={<CampaignDetailsPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(mockedGetCampaignById).toHaveBeenCalledWith('1'));

    expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    expect(screen.getByText('http://test.com')).toBeInTheDocument();
    expect(screen.getByText('100 - US')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Delete Campaign'));

    await waitFor(() => expect(mockedDeleteCampaign).toHaveBeenCalledWith('1'));
  });
});
