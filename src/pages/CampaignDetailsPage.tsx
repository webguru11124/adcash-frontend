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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>Landing Page URL: {campaign.landingPageUrl}</p>
      <p>Payouts:</p>
      <ul>
        {campaign.payouts.map(payout => (
          <li key={payout.id}>{payout.amount} - {payout.country}</li>
        ))}
      </ul>
      <p>Status: {campaign.isRunning ? 'Running' : 'Stopped'}</p>
      <button onClick={handleDelete}>Delete Campaign</button>
      <button onClick={() => navigate(`/edit-campaign/${id}`)}>Edit Campaign</button>
    </div>
  );
};

export default CampaignDetailsPage;