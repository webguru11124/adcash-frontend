export interface Payout {
  id: number;
  amount: number;
  country: string;
  campaignId: string;
}

export interface Campaign {
  id: string;
  title: string;
  landingPageUrl: string;
  isRunning: boolean;
  payouts: Payout[];
}

export interface CampaignBackend {
  id: string;
  title: string;
  landing_page_url: string;
  is_running: boolean;
  payouts: Payout[];
}

export type CampaignFormData = {
  title: string;
  landingPageUrl: string;
  isRunning?: boolean;
  payouts: { amount: number; country: string }[];
};