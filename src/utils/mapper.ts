/* eslint-disable @typescript-eslint/no-explicit-any */
import { Campaign, CampaignBackend, CampaignFormData } from '../types';

export const mapBackendToFrontend = (backendCampaign: CampaignBackend): Campaign => {
  return {
    id: backendCampaign.id,
    title: backendCampaign.title,
    landingPageUrl: backendCampaign.landing_page_url,
    isRunning: backendCampaign.is_running,
    payouts: backendCampaign.payouts.map((payout: any) => ({
      amount: payout.amount,
      campaignId: backendCampaign.id,
      country: payout.country,
      id: payout.id
    }))
  };
};

export const mapFrontendToBackend = (frontendCampaign: CampaignFormData): any => {
  return {
    title: frontendCampaign.title,
    landing_page_url: frontendCampaign.landingPageUrl,
    is_running: frontendCampaign.isRunning,
    payouts: frontendCampaign.payouts.map(payout => ({
      amount: payout.amount,
      country: payout.country
    }))
  };
};
