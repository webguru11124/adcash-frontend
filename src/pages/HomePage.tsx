import React from 'react';
import { Link } from 'react-router-dom';
import CampaignList from '../components/CampaignList';

const HomePage: React.FC = () => {
  return (
    <div>
      <h1>Campaign Management</h1>
      <Link to="/create-campaign">Create New Campaign</Link>
      <CampaignList />
    </div>
  );
};

export default HomePage;