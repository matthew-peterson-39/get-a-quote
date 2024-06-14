import React from "react";

type ZipCodeCheckProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleZipCodeCheck: () => void;
};

const ZipCodeCheck: React.FC<ZipCodeCheckProps> = ({ formData, handleChange, handleZipCodeCheck }) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Enter your service location zip code</label>
        <input
          type="text"
          name="zipCode"
          value={formData.zipCode}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          placeholder="Zip Code"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleZipCodeCheck}
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ZipCodeCheck;
