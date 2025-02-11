import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Payout } from '../types';

interface CampaignItemProps {
  id: string;
  title: string;
  landingPageUrl: string;
  payouts: Payout[];
  isRunning: boolean;
  onRun: (id: string) => void;
  onStop: (id: string) => void;
}

const CampaignItem: React.FC<CampaignItemProps> = ({ id, title, landingPageUrl, payouts, isRunning, onRun, onStop }) => {
  const navigate = useNavigate();

  const handleRun = () => {
    onRun(id);
  };

  const handleStop = () => {
    onStop(id);
  };

  const handleNavigate = () => {
    navigate(`/campaign/${id}`);
  };

  return (
    <div className="campaign-item border p-4 rounded shadow cursor-pointer" onClick={handleNavigate}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p>Landing Page: <a href={landingPageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline" onClick={(e) => e.stopPropagation()}>{landingPageUrl}</a></p>
      <p>Payouts:</p>
      <ul className="list-disc ml-5">
        {payouts.map(payout => (
          <li key={payout.id}>{payout.amount} - {payout.country}</li>
        ))}
      </ul>
      <button
        className={`mt-4 py-2 px-4 rounded ${isRunning ? 'bg-red-500 hover:bg-red-700' : 'bg-green-500 hover:bg-green-700'} text-white`}
        onClick={(e) => { e.stopPropagation(); if (isRunning) handleStop(); else handleRun(); }}
      >
        {isRunning ? 'Stop Campaign' : 'Run Campaign'}
      </button>
    </div>
  );
};

export default CampaignItem;