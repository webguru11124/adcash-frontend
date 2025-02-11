import React from 'react';
import { Link } from 'react-router-dom';
import CampaignList from '../components/CampaignList';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Campaign Management</h1>
      <Link to="/create" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mb-4 inline-block">Create New Campaign</Link>
      <CampaignList />
    </div>
  );
};

export default HomePage;