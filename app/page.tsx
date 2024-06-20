"use client";

import React, { useEffect, useState } from 'react';
import ServiceSelection from './components/ServiceSelection';
import CustomerInfo from './components/CustomerInfo';
import AutomotiveServiceDetails from './components/AutomotiveServiceDetails';
import ResidentialServiceDetails from './components/ResidentialServiceDetails';
import CommercialServiceDetails from './components/CommercialServiceDetails';
import DistanceCheck from './components/DistanceCheck';
import ReviewAndSubmit from './components/ReviewAndSubmit';
import TimeSlotSelection from './components/TimeSlotSelection';
import LoadGoogleMaps from './components/LoadGoogleMaps';
import { fetchAvailableDates, fetchUnavailableDates } from './utils/workizApi';

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceDetails: "",
    selectedDate: null as Date | null,
    timeSlot: "",
    serviceAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    estimatedCost: 100 // Example estimate
  });
  const [quoteSaved, setQuoteSaved] = useState(false);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => {
    // Adjusting the step based on current step and form data
    if (step === 5 && formData.service !== "") {
      setStep(4);
    } else if (step === 4 && formData.service !== "") {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleValidAddress = (address: string, serviceFee: number) => {
    setFormData({ ...formData, serviceAddress: address, estimatedCost: serviceFee });
    nextStep();
  };

  const handleServiceSelect = (selectedService: string) => {
    setFormData({ ...formData, service: selectedService });
    nextStep();
  };

  const handleSaveQuote = async () => {
    try {
      const saveQuoteResponse = await fetch('/api/save-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const saveQuoteResult = await saveQuoteResponse.json();
      if (!saveQuoteResponse.ok) {
        alert(`Failed to save quote: ${saveQuoteResult.error}`);
        return;
      }

      const generateLeadResponse = await fetch('/api/generate-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData }),
      });

      const generateLeadResult = await generateLeadResponse.json();
      if (!generateLeadResponse.ok) {
        alert(`Failed to generate lead: ${generateLeadResult.error}`);
        return;
      }

      setQuoteSaved(true);
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred.');
    }
  };

  const handleBookService = () => {
    nextStep();
  };

  const handleSubmitBooking = () => {
    alert("Service booked!");
    // Add logic to book the service
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      service: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceDetails: "",
      selectedDate: null,
      timeSlot: "",
      serviceAddress: "",
      city: "",
      state: "",
      postalCode: "",
      country: "US",
      estimatedCost: 100,
    });
    setQuoteSaved(false);
  };

  return (
    <LoadGoogleMaps>
      <main>
        <div className="w-full max-w-md min-h-[614px] p-8 bg-white text-black form-container">
          <h2 className="mb-6 text-2xl font-semibold text-center text-black">Get A Quote</h2>
          {step === 1 && <DistanceCheck onValidAddress={handleValidAddress} />}
          {step === 2 && <ServiceSelection handleServiceSelect={handleServiceSelect} />}
          {step === 3 && formData.service === "Automotive" && (
            <AutomotiveServiceDetails formData={formData} handleChange={handleChange} handleSubmit={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && formData.service === "Residential" && (
            <ResidentialServiceDetails formData={formData} handleChange={handleChange} handleSubmit={nextStep} prevStep={prevStep} />
          )}
          {step === 3 && formData.service === "Commercial" && (
            <CommercialServiceDetails formData={formData} handleChange={handleChange} handleSubmit={nextStep} prevStep={prevStep} />
          )}
          {step === 4 && <CustomerInfo formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
          {step === 5 && (
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
          {step === 6 && (
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
    </LoadGoogleMaps>
  );
};

export default Home;
