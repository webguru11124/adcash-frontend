import React from 'react';
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
  const handleRun = () => {
    onRun(id);
  };

  const handleStop = () => {
    onStop(id);
  };

  return (
    <div className="campaign-item">
      <h3>{title}</h3>
      <p>Landing Page: <a href={landingPageUrl} target="_blank" rel="noopener noreferrer">{landingPageUrl}</a></p>
      <p>Payouts:</p>
      <ul>
        {payouts.map(payout => (
          <li key={payout.id}>{payout.amount} - {payout.country}</li>
        ))}
      </ul>
      <button onClick={isRunning ? handleStop : handleRun}>
        {isRunning ? 'Stop Campaign' : 'Run Campaign'}
      </button>
    </div>
  );
};

export default CampaignItem;