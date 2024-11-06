import React, { useState } from 'react';
import AddressAutocomplete from './AddressAutocomplete';

type CustomerInfoProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    serviceAddress: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isAddressValid: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddressValidation: (address: string, serviceFee: number, isValid: boolean) => void;
  nextStep: () => void;
  prevStep: () => void;
  validateStep: () => boolean;
};

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  formData,
  handleChange,
  handleAddressValidation,
  nextStep,
  prevStep,
  validateStep
}) => {
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceAddress: '',
  });

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    // Create a synthetic event to maintain compatibility with handleChange
    const syntheticEvent = {
      target: {
        name: 'serviceAddress',
        value: address
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleChange(syntheticEvent);
    
    // Validate the address and pass through the coordinates if needed
    handleAddressValidation(address, 100, true);
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      serviceAddress: '',
    };

    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
      valid = false;
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
      valid = false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
      valid = false;
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
      valid = false;
    } else if (!validatePhoneNumber(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
      valid = false;
    }
    if (!formData.serviceAddress) {
      newErrors.serviceAddress = 'Service address is required';
      valid = false;
    }

    setErrors(newErrors);

    if (valid && formData.isAddressValid) {
      nextStep();
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          placeholder="Your First Name"
        />
        {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          placeholder="Your Last Name"
        />
        {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
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
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
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
        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Service Address</label>
        <AddressAutocomplete 
          onAddressSelect={handleAddressSelect}
        />
        {errors.serviceAddress && <p className="text-red-600 text-sm mt-1">{errors.serviceAddress}</p>}
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
          className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring ${formData.isAddressValid ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-200' : 'bg-gray-400 cursor-not-allowed'}`}
          disabled={!formData.isAddressValid}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CustomerInfo;