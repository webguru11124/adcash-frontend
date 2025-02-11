import React from 'react';

interface Campaign {
  id: string;
  title: string;
  landingPageUrl: string;
  payouts: number[];
  isRunning: boolean;
  onRun: (id: string) => void;
  onStop: (id: string) => void;
}

const CampaignItem: React.FC<Campaign> = ({ id, title, landingPageUrl, payouts, isRunning, onRun, onStop }) => {
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
      <p>Payouts: {payouts.join(', ')}</p>
      <button onClick={isRunning ? handleStop : handleRun}>
        {isRunning ? 'Stop Campaign' : 'Run Campaign'}
      </button>
    </div>
  );
};

export default CampaignItem;