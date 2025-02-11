import React, { useEffect, useState } from 'react';
import { fetchCampaigns, runCampaign, stopCampaign } from '../services/campaignService';
import { Campaign } from '../types';
import CampaignItem from './CampaignItem';

const CampaignList: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [titleSearchTerm, setTitleSearchTerm] = useState('');
  const [urlSearchTerm, setUrlSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('any');
  const [error, setError] = useState<string | null>(null);

  const getCampaigns = async () => {
    try {
      const filters = {
        title: titleSearchTerm ? titleSearchTerm : undefined,
        landingPageUrl: urlSearchTerm ? urlSearchTerm : undefined,
        isRunning: statusFilter === 'any' ? undefined : statusFilter === 'running',
      };
      const data = await fetchCampaigns(filters);
      setCampaigns(data);
    } catch {
      setError('Failed to fetch campaigns.');
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [titleSearchTerm, urlSearchTerm, statusFilter]);

  const handleRun = async (id: string) => {
    try {
      await runCampaign(id);
      getCampaigns();
    } catch {
      setError('Failed to run campaign.');
    }
  };

  const handleStop = async (id: string) => {
    try {
      await stopCampaign(id);
      getCampaigns();
    } catch {
      setError('Failed to stop campaign.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="Search by Title"
        value={titleSearchTerm}
        onChange={(e) => setTitleSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Search by URL"
        value={urlSearchTerm}
        onChange={(e) => setUrlSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      >
        <option value="any">Any Status</option>
        <option value="running">Running</option>
        <option value="stopped">Stopped</option>
      </select>
      <ul className="space-y-4">
        {campaigns.map(campaign => (
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