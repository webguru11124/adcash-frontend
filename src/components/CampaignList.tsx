import React, { useEffect, useState } from 'react';
import { Campaign } from '../types'; // Assuming you have a types file for TypeScript types
import { fetchCampaigns } from '../services/campaignService';

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
            <h3>{campaign.title}</h3>
            <p>Landing Page: {campaign.landingPageUrl}</p>
            <p>Status: {campaign.isRunning ? 'Running' : 'Stopped'}</p>
            {/* Add buttons for running/stopping the campaign here */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;