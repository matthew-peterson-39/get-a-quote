import React from 'react';
import { text } from 'stream/consumers';

type CustomerInfoProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
};

const CustomerInfo: React.FC<CustomerInfoProps> = ({ formData, handleChange, nextStep, prevStep }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); nextStep(); }}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          style={{ color: 'black' }}          
          placeholder="Your Name"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          placeholder="Your Email"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          placeholder="Your Phone Number"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={prevStep}
          className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CustomerInfo;
