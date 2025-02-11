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

  useEffect(() => {
    const fetchCampaign = async () => {
      if(!id) return;
      const data = await getCampaignById(id);
      setCampaign(data);
      setLoading(false);
    };
    fetchCampaign();
  }, [id]);

  const handleDelete = async () => {
    if(!id) return;
    await deleteCampaign(id);
    navigate('/');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!campaign) {
    return <div>Campaign not found</div>;
  }

  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>Landing Page URL: {campaign.landingPageUrl}</p>
      <p>Payouts: {campaign.payouts.join(', ')}</p>
      <p>Status: {campaign.isRunning ? 'Running' : 'Stopped'}</p>
      <button onClick={handleDelete}>Delete Campaign</button>
      <button onClick={() => navigate(`/edit-campaign/${id}`)}>Edit Campaign</button>
    </div>
  );
};

export default CampaignDetailsPage;