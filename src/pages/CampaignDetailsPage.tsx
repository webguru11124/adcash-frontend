import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCampaignById, deleteCampaign } from '../services/campaignService';
import { Campaign } from '../types';

const CampaignDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        if(!id) return;
        const data = await getCampaignById(id);
        setCampaign(data);
      } catch {
        setError('Failed to fetch campaign details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCampaign();
  }, [id]);

  const handleDelete = async () => {
    try {
      if(!id) return;
      await deleteCampaign(id);
      navigate('/');
    } catch {
      setError('Failed to delete campaign.');
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  if (!campaign) {
    return <div className="text-center mt-10">Campaign not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-4">{campaign.title}</h1>
      <p className="mb-2"><strong>Landing Page URL:</strong> {campaign.landingPageUrl}</p>
      <p className="mb-2"><strong>Payouts:</strong></p>
      <ul className="list-disc list-inside mb-4">
        {campaign.payouts.map(payout => (
          <li key={payout.id}>{payout.amount} - {payout.country}</li>
        ))}
      </ul>
      <p className="mb-4"><strong>Status:</strong> {campaign.isRunning ? 'Running' : 'Stopped'}</p>
      <div className="flex space-x-4">
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete Campaign</button>
      </div>
    </div>
  );
};

export default CampaignDetailsPage;