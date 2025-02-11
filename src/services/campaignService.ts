import axios from 'axios';
import { Campaign, CampaignFormData } from '../types';

const API_URL = '/api/campaigns';


export const fetchCampaigns = async (): Promise<Campaign[]> => {
  const response = await axios.get<Campaign[]>(API_URL);
  return response.data;
};

export const createCampaign = async (campaign: CampaignFormData): Promise<Campaign> => {
  const response = await axios.post<Campaign>(API_URL, campaign);
  return response.data;
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  const response = await axios.put<Campaign>(`${API_URL}/${id}`, campaign);
  return response.data;
};

export const deleteCampaign = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const runCampaign = async (id: string): Promise<Campaign> => {
  const response = await axios.post<Campaign>(`${API_URL}/${id}/run`);
  return response.data;
};

export const stopCampaign = async (id: string): Promise<Campaign> => {
  const response = await axios.post<Campaign>(`${API_URL}/${id}/stop`);
  return response.data;
};

export const getCampaignById = async (id: string): Promise<Campaign> => {
  const response = await axios.get<Campaign>(`${API_URL}/${id}`);
  return response.data;
};