import React from 'react'
import { useNavigate } from 'react-router-dom'
import CampaignForm from '../components/CampaignForm'
import { createCampaign } from '../services/campaignService'
import { CampaignFormData } from '../types'

const CreateCampaignPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateCampaign = async (campaign: CampaignFormData) => {
    await createCampaign(campaign);
    navigate('/');
  };

  return (
    <div>
      <h1>Create New Campaign</h1>
      <CampaignForm onSubmit={handleCreateCampaign} />
      <button onClick={() => navigate('/')}>Back to Campaign List</button>
    </div>
  )
}

export default CreateCampaignPage