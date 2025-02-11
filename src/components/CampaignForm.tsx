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
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Title:
          <Controller
            name="title"
            control={control}
            render={({ field }) => <input type="text" {...field} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />}
          />
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Landing Page URL:
          <Controller
            name="landingPageUrl"
            control={control}
            render={({ field }) => <input type="url" {...field} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2" />}
          />
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Payouts:</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex space-x-2 items-center">
            <Controller
              name={`payouts.${index}.amount`}
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
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
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-3 py-2"
                />
              )}
            />
            <button type="button" onClick={() => remove(index)} className="text-red-600 hover:text-red-900">Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ amount: 0, country: '' })} className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Payout</button>
      </div>
      <button type="submit" className="inline-flex items-end px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create Campaign</button>
    </form>
  );
};

export default CampaignForm;