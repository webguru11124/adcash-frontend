import axios from 'axios';
import { Campaign, CampaignBackend, CampaignFormData } from '../types';
import { mapBackendToFrontend, mapFrontendToBackend } from '../utils/mapper';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Upgrade-Insecure-Requests": "1",
    "Content-Type": "application/json"
  },
  withCredentials: false  // Prevents cookie issues between HTTPS frontend & HTTP backend
});

export const fetchCampaigns = async (filters?: { title?: string; landingPageUrl?: string; isRunning?: boolean }): Promise<Campaign[]> => {
  try {
    const response = await axiosInstance.get<CampaignBackend[]>('/filter', {
      params: {
        title: filters?.title,
        landing_page_url: filters?.landingPageUrl,
        is_running: filters?.isRunning,
      }
    });
    return response.data.map(mapBackendToFrontend);
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    throw error;
  }
};

export const createCampaign = async (campaign: CampaignFormData): Promise<Campaign> => {
  try {
    const response = await axiosInstance.post<CampaignBackend>('/', mapFrontendToBackend(campaign));
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error creating campaign:', error);
    throw error;
  }
};

export const updateCampaign = async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
  try {
    const response = await axiosInstance.put<CampaignBackend>(`/${id}`, mapFrontendToBackend(campaign as CampaignFormData));
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error updating campaign:', error);
    throw error;
  }
};

export const deleteCampaign = async (id: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/${id}`);
  } catch (error) {
    console.error('Error deleting campaign:', error);
    throw error;
  }
};

export const runCampaign = async (id: string): Promise<Campaign> => {
  try {
    const response = await axiosInstance.put<CampaignBackend>(`/${id}/status`, { is_running: true });
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error running campaign:', error);
    throw error;
  }
};

export const stopCampaign = async (id: string): Promise<Campaign> => {
  try {
    const response = await axiosInstance.put<CampaignBackend>(`/${id}/status`, { is_running: false });
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error stopping campaign:', error);
    throw error;
  }
};

export const getCampaignById = async (id: string): Promise<Campaign> => {
  try {
    const response = await axiosInstance.get<CampaignBackend>(`/${id}`);
    return mapBackendToFrontend(response.data);
  } catch (error) {
    console.error('Error fetching campaign by ID:', error);
    throw error;
  }
};
