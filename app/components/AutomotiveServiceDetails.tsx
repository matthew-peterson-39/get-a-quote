import React, { useState } from "react";

type AutomotiveServiceDetailsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  prevStep: () => void;
};

const mockMakes = ["Toyota", "Honda", "Ford"];
const mockModels = {
  Toyota: ["Camry", "Corolla", "Prius"],
  Honda: ["Civic", "Accord", "Fit"],
  Ford: ["Focus", "Mustang", "Fiesta"]
};
const mockYears = ["2020", "2019", "2018"];

const automotiveServices = [
  "Automotive Lockout",
  "Car Key Replacement",
  "Car Key Duplication",
  "Car Key Programming",
  "Car Key Cutting",
  "Ignition Lock Repair",
  "Door Lock Repair",
  "Motorcycle Key Replacement",
  "Motorcycle Key Duplication",
  "Other Automotive Key Replacement",
  "Other Automotive Key Duplication"
];

const AutomotiveServiceDetails: React.FC<AutomotiveServiceDetailsProps> = ({ formData, handleChange, handleSubmit, prevStep }) => {
  const [step, setStep] = useState(1);
  const [search, setSearch] = useState(formData.search || "");
  const [make, setMake] = useState(formData.make || "");
  const [model, setModel] = useState(formData.model || "");
  const [year, setYear] = useState(formData.year || "");

  const handleNext = () => {
    setStep(step + 1);
  };

  const filteredServices = automotiveServices.filter(service =>
    service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Is your vehicle running?</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="vehicleRunning"
                  value="Yes"
                  checked={formData.vehicleRunning === "Yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="vehicleRunning"
                  value="No"
                  checked={formData.vehicleRunning === "No"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Are your keys locked inside the trunk?</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="keysInTrunk"
                  value="Yes"
                  checked={formData.keysInTrunk === "Yes"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="keysInTrunk"
                  value="No"
                  checked={formData.keysInTrunk === "No"}
                  onChange={handleChange}
                  className="form-radio"
                />
                <span className="ml-2">No</span>
              </label>
            </div>
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
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
              disabled={!formData.vehicleRunning || !formData.keysInTrunk}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
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
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Make</label>
            <select
              name="make"
              value={make}
              onChange={(e) => {
                setMake(e.target.value);
                handleChange(e);
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
            >
              <option value="">Select Make</option>
              {mockMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Model</label>
            <select
              name="model"
              value={model}
              onChange={(e) => {
                setModel(e.target.value);
                handleChange(e);
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
              disabled={!make}
            >
              <option value="">Select Model</option>
              {make &&
                mockModels[make].map((model) => (
                  <option key={model} value={model}>
                    {model}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Year</label>
            <select
              name="year"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                handleChange(e);
              }}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
            >
              <option value="">Select Year</option>
              {mockYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
              disabled={!make || !model || !year}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AutomotiveServiceDetails;
