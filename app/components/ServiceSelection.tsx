import React from "react";

type ServiceSelectionProps = {
  handleServiceSelect: (service: string) => void;
};

const ServiceSelection: React.FC<ServiceSelectionProps> = ({ handleServiceSelect }) => {
  return (
    <div>
      <label className="block mb-4 text-sm font-medium text-gray-700">What service do you require?</label>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleServiceSelect("Automotive")}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Automotive
        </button>
        <button
          onClick={() => handleServiceSelect("Residential")}
          className="w-full px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
        >
          Residential
        </button>
        <button
          onClick={() => handleServiceSelect("Commercial")}
          className="w-full px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-200"
        >
          Commercial
        </button>
      </div>
    </div>
  );
};

export default ServiceSelection;
