"use client";

import React, { useEffect, useState } from 'react';
import ServiceSelection from './components/ServiceSelection';
import CustomerInfo from './components/CustomerInfo';
import AutomotiveServiceDetails from './components/AutomotiveServiceDetails';
import ResidentialServiceDetails from './components/ResidentialServiceDetails';
import CommercialServiceDetails from './components/CommercialServiceDetails';
import ReviewAndSubmit from './components/ReviewAndSubmit';
import TimeSlotSelection from './components/TimeSlotSelection';
import LoadGoogleMaps from './components/LoadGoogleMaps';

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    serviceDetails: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    selectedDate: null as Date | null,
    timeSlot: "",
    serviceAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    estimatedCost: 100,
    isAddressValid: false
  });
  const [quoteSaved, setQuoteSaved] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleServiceSelect = (selectedService: string) => {
    setFormData({ ...formData, service: selectedService });
    nextStep();
  };

  const handleAddressValidation = (address: string, serviceFee: number, isValid: boolean) => {
    setFormData({
      ...formData,
      serviceAddress: address,
      estimatedCost: serviceFee,
      isAddressValid: isValid
    });
  };

  const handleSaveQuote = async () => {
    // Logic to save the quote
  };

  const handleBookService = () => {
    nextStep();
  };

  const resetForm = () => {
    // Reset form data
  };

  const validateStep = (): boolean => {
    switch (step) {
      case 1: // Service Selection
        return formData.service !== "";
      case 2: // Service Details
        return formData.serviceDetails !== "";
      case 3: // Customer Info
        return (
          formData.firstName !== "" &&
          formData.lastName !== "" &&
          formData.phone !== "" &&
          formData.serviceAddress !== "" &&
          formData.isAddressValid
        );
      default:
        return true;
    }
  };

  return (
      <main>
        <div className="w-full max-w-md min-h-[614px] p-8 bg-white text-black form-container">
          <h2 className="mb-6 text-2xl font-semibold text-center text-black">Get A Quote</h2>
          {step === 1 && (
            <ServiceSelection 
              handleServiceSelect={handleServiceSelect} />
          )}
          {step === 2 && formData.service === "Automotive" && (
            <AutomotiveServiceDetails 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={nextStep} 
              prevStep={prevStep} />
          )}
          {step === 2 && formData.service === "Residential" && (
            <ResidentialServiceDetails 
              formData={formData} 
              handleChange={handleChange}
              handleSubmit={nextStep}
              prevStep={prevStep} />
          )}
          {step === 2 && formData.service === "Commercial" && (
            <CommercialServiceDetails 
              formData={formData} 
              handleChange={handleChange} 
              handleSubmit={nextStep} 
              prevStep={prevStep} />
          )}
          {step === 3 && (
            <LoadGoogleMaps>
              <CustomerInfo 
                formData={formData} 
                handleChange={handleChange}
                handleAddressValidation={handleAddressValidation}
                nextStep={nextStep} 
                prevStep={prevStep}
                validateStep={validateStep} />
            </LoadGoogleMaps>
          )}
          {step === 4 && (
            <ReviewAndSubmit
              formData={formData}
              prevStep={prevStep}
              handleSaveQuote={handleSaveQuote}
              handleBookService={handleBookService}
              handleTimeSlot={nextStep}
              businessName="844 Ohio Key"
              resetForm={resetForm}
            />
          )}
          {step === 5 && (
            <TimeSlotSelection
              selectedSlot={formData.timeSlot}
              selectedDate={formData.selectedDate}
              handleSlotChange={handleChange}
              handleDateChange={handleDateChange}
              handleSubmit={nextStep}
              prevStep={prevStep}
            />
          )}
        </div>
      </main>
  );
};

export default Home;