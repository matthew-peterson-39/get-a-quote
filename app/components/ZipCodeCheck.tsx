import React, { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

type ZipCodeCheckProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleZipCodeCheck: () => void;
  setFormData: (formData: any) => void; // Add this prop
};

const ZipCodeCheck: React.FC<ZipCodeCheckProps> = ({ formData, handleChange, handleZipCodeCheck, setFormData }) => {
  const [address, setAddress] = useState(formData.serviceAddress || "");

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setFormData({ ...formData, serviceAddress: selectedAddress });
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Enter your service address</label>
        <AddressAutocomplete onAddressSelect={handleAddressSelect} />
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
