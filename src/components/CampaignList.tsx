import React, { useEffect, useState } from 'react';
import { fetchCampaigns, runCampaign, stopCampaign } from '../services/campaignService';
import { Campaign } from '../types';
import CampaignItem from './CampaignItem';

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch {
        setError('Failed to fetch campaigns.');
      }
    };

    getCampaigns();
  }, []);

  useEffect(() => {
    const results = campaigns.filter(campaign =>
      campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      campaign.landingPageUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (campaign.isRunning ? 'Running' : 'Stopped').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCampaigns(results);
  }, [searchTerm, campaigns]);

  const handleRun = async (id: string) => {
    try {
      await runCampaign(id);
      const updatedCampaigns = await fetchCampaigns();
      setCampaigns(updatedCampaigns);
    } catch {
      setError('Failed to run campaign.');
    }
  };

  const handleStop = async (id: string) => {
    try {
      await stopCampaign(id);
      const updatedCampaigns = await fetchCampaigns();
      setCampaigns(updatedCampaigns);
    } catch {
      setError('Failed to stop campaign.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Search by Title, URL, or Status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <ul className="space-y-4">
        {filteredCampaigns.map(campaign => (
          <li key={campaign.id}>
            <CampaignItem
              id={campaign.id}
              title={campaign.title}
              landingPageUrl={campaign.landingPageUrl}
              payouts={campaign.payouts}
              isRunning={campaign.isRunning}
              onRun={handleRun}
              onStop={handleStop}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;