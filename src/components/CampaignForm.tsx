import React, { useState } from 'react';

const CampaignForm: React.FC<{ onSubmit: (campaign: { title: string; landingPageUrl: string; payouts: number[] }) => void }> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [landingPageUrl, setLandingPageUrl] = useState('');
  const [payouts, setPayouts] = useState<number[]>([0]);

  const handlePayoutChange = (index: number, value: number) => {
    const newPayouts = [...payouts];
    newPayouts[index] = value;
    setPayouts(newPayouts);
  };

  const addPayout = () => {
    setPayouts([...payouts, 0]);
  };

  const removePayout = (index: number) => {
    setPayouts(payouts.filter((_, i) => i !== index));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title || !landingPageUrl || payouts.length === 0 || payouts.some(payout => payout <= 0)) {
      alert('Please fill in all fields and ensure at least one payout is greater than zero.');
      return;
    }
    onSubmit({ title, landingPageUrl, payouts });
    setTitle('');
    setLandingPageUrl('');
    setPayouts([0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Landing Page URL:
          <input type="url" value={landingPageUrl} onChange={(e) => setLandingPageUrl(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>Payouts:</label>
        {payouts.map((payout, index) => (
          <div key={index}>
            <input
              type="number"
              value={payout}
              onChange={(e) => handlePayoutChange(index, Number(e.target.value))}
              required
            />
            <button type="button" onClick={() => removePayout(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addPayout}>Add Payout</button>
      </div>
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CampaignForm;