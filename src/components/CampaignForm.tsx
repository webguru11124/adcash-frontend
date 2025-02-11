import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CampaignFormData } from '../types';

const CampaignForm: React.FC<{ onSubmit: (campaign: CampaignFormData) => void }> = ({ onSubmit }) => {
  const { control, handleSubmit, reset } = useForm<CampaignFormData>({
    defaultValues: {
      title: '',
      landingPageUrl: '',
      isRunning: false,
      payouts: [{ amount: 0, country: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'payouts',
  });

  const submitHandler = (data: CampaignFormData) => {
    if (data.payouts.some(payout => payout.amount <= 0 || !payout.country)) {
      alert('Please ensure all payouts have a valid amount and country.');
      return;
    }
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>
          Title:
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input type="text" {...field} required />}
          />
        </label>
      </div>
      <div>
        <label>
          Landing Page URL:
          <Controller
            name="landingPageUrl"
            control={control}
            render={({ field }) => <input type="url" {...field} required />}
          />
        </label>
      </div>
      <div>
        <label>Payouts:</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Controller
              name={`payouts.${index}.amount`}
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  required
                />
              )}
            />
            <Controller
              name={`payouts.${index}.country`}
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  {...field}
                  required
                />
              )}
            />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ amount: 0, country: '' })}>Add Payout</button>
      </div>
      <button type="submit">Create Campaign</button>
    </form>
  );
};

export default CampaignForm;