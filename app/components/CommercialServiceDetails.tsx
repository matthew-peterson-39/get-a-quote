import React, { useState } from "react";

type CommercialServiceDetailsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  prevStep: () => void;
};

const commercialServices = [
  "Commercial Lockout",
  "Lock Change",
  "Lock Rekeying",
  "Lock Installation",
  "Lock Repair",
  "Safe Lockout",
  "Mailbox Lock Change",
  "File Cabinet"
];

const CommercialServiceDetails: React.FC<CommercialServiceDetailsProps> = ({ formData, handleChange, handleSubmit, prevStep }) => {
  const [search, setSearch] = useState("");

  const filteredServices = commercialServices.filter(service =>
    service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Search for a service</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          placeholder="Search services..."
        />
      </div>
      <ul className="mb-4">
        {filteredServices.map((service) => (
          <li key={service} className="mb-2">
            <label className="block text-sm font-medium text-gray-700">
              <input
                type="radio"
                name="serviceDetails"
                value={service}
                onChange={handleChange}
                className="mr-2"
              />
              {service}
            </label>
          </li>
        ))}
      </ul>
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
          Submit
        </button>
      </div>
    </form>
  );
};

export default CommercialServiceDetails;
