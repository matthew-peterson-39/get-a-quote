import React, { useState } from "react";

type AutomotiveServiceDetailsProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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

const mockServices = [
  "Lockout - all types of vehicles lockout",
  "Trunk lockout",
  "Car key replacement",
  "Duplicate car keys",
  "Laser key cut",
  "Car key programming",
  "Car key cut service",
  "Motorcycle key replacement",
  "Motorcycle key duplication",
  "Ignition lock repair",
  "Door lock repair",
  "Broken key extraction",
  "Computer programming (ECU, VIN writing, Modules programming with OEM software)"
];

const AutomotiveServiceDetails: React.FC<AutomotiveServiceDetailsProps> = ({ formData, handleChange, handleSubmit, prevStep }) => {
  const [step, setStep] = useState(1);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [search, setSearch] = useState("");

  const handleNext = () => {
    setStep(step + 1);
  };

  const filteredServices = mockServices.filter(service =>
    service.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && (
        <div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Make</label>
            <select
              value={make}
              onChange={(e) => setMake(e.target.value)}
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
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
              value={year}
              onChange={(e) => setYear(e.target.value)}
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
              onClick={prevStep}
              className="px-4 py-2 text-white bg-gray-600 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-200"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
              disabled={!make || !model || !year}
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
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default AutomotiveServiceDetails;
