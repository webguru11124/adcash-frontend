export interface Payout {
  id: number;
  amount: number;
  country: string;
  campaign_id: number;
}

export interface Campaign {
  id: string;
  title: string;
  landingPageUrl: string;
  isRunning: boolean;
  payouts: Payout[];
}

export type CampaignFormData = {
  title: string;
  landingPageUrl: string;
  isRunning?: boolean;
  payouts: { amount: number; country: string }[];
};