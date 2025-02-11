import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CampaignForm from '../components/CampaignForm'
import { createCampaign } from '../services/campaignService'
import { CampaignFormData } from '../types'

const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleCreateCampaign = async (campaign: CampaignFormData) => {
    try {
      await createCampaign(campaign);
      navigate('/');
    } catch {
      setError('Failed to create campaign.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Campaign</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <CampaignForm onSubmit={handleCreateCampaign} />
      <button 
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        onClick={() => navigate('/')}
      >
        Back to Campaign List
      </button>
    </div>
  )
}

export default CreateCampaignPage