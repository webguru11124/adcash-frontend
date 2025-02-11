import axios from 'axios';
import { Campaign, CampaignBackend, CampaignFormData } from '../types';
import { mapBackendToFrontend, mapFrontendToBackend } from '../utils/mapper';

const API_URL = import.meta.env.VITE_API_URL;

export const fetchCampaigns = async (filters?: { title?: string; landingPageUrl?: string; isRunning?: boolean }): Promise<Campaign[]> => {
  try {
    const response = await axios.get<CampaignBackend[]>(`${API_URL}/filter`, { params: {
      title: filters?.title,
      landing_page_url: filters?.landingPageUrl,
      is_running: filters?.isRunning,
    } });
    return response.data.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const createCampaign = async (campaign: CampaignFormData): Promise<Campaign> => {
  try {
    const response = await axios.post<CampaignBackend>(API_URL, mapFrontendToBackend(campaign));
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  try {
    const response = await axios.put<CampaignBackend>(`${API_URL}/${id}`, mapFrontendToBackend(campaign as CampaignFormData));
    return mapBackendToFrontend(response.data);
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
    const response = await axios.put<CampaignBackend>(`${API_URL}/${id}/status`, { is_running: true });
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error running campaign:', error);
    throw error;
  }
};

export const stopCampaign = async (id: string): Promise<Campaign> => {
  try {
    const response = await axios.put<CampaignBackend>(`${API_URL}/${id}/status`, { is_running: false });
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error stopping campaign:', error);
    throw error;
  }
};

export const getCampaignById = async (id: string): Promise<Campaign> => {
  try {
    const response = await axios.get<CampaignBackend>(`${API_URL}/${id}`);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    throw error;
  }
};