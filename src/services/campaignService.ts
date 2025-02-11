import axios from 'axios';
import { Campaign, CampaignFormData } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCampaigns = async (): Promise<Campaign[]> => {
  try {
    const response = await axios.get<Campaign[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const createCampaign = async (campaign: CampaignFormData): Promise<Campaign> => {
  try {
    const response = await axios.post<Campaign>(API_URL, campaign);
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  try {
    const response = await axios.put<Campaign>(`${API_URL}/${id}`, campaign);
    return response.data;
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const deleteCampaign = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};

export const runCampaign = async (id: string): Promise<Campaign> => {
  try {
    const response = await axios.post<Campaign>(`${API_URL}/${id}/run`);
    return response.data;
  } catch (error) {
    console.error('Error running campaign:', error);
    throw error;
  }
};

export const stopCampaign = async (id: string): Promise<Campaign> => {
  try {
    const response = await axios.post<Campaign>(`${API_URL}/${id}/stop`);
    return response.data;
  } catch (error) {
    console.error('Error stopping campaign:', error);
    throw error;
  }
};

export const getCampaignById = async (id: string): Promise<Campaign> => {
  try {
    const response = await axios.get<Campaign>(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    throw error;
  }
};