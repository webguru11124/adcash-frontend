import React, { useEffect, useState } from 'react';
import { fetchCampaigns, runCampaign, stopCampaign } from '../services/campaignService';
import { Campaign } from '../types';
import CampaignItem from './CampaignItem';

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    const getCampaigns = async () => {
      const data = await fetchCampaigns();
      setCampaigns(data);
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
    await runCampaign(id);
    const updatedCampaigns = await fetchCampaigns();
    setCampaigns(updatedCampaigns);
  };

  const handleStop = async (id: string) => {
    await stopCampaign(id);
    const updatedCampaigns = await fetchCampaigns();
    setCampaigns(updatedCampaigns);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Title, URL, or Status"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
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