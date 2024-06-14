"use client";

import React, { useState } from 'react';
import ServiceSelection from './components/ServiceSelection';
import CustomerInfo from './components/CustomerInfo';
import AutomotiveServiceDetails from './components/AutomotiveServiceDetails';
import ResidentialServiceDetails from './components/ResidentialServiceDetails';
import CommercialServiceDetails from './components/CommercialServiceDetails';
import DistanceCheck from './components/DistanceCheck';
import ReviewAndSubmit from './components/ReviewAndSubmit';
import TimeSlotSelection from './components/TimeSlotSelection';
import PaymentFormWrapper from './components/PaymentFormWrapper';
import LoadGoogleMaps from './components/LoadGoogleMaps';

const Home: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    name: "",
    email: "",
    phone: "",
    serviceDetails: "",
    selectedDate: null as Date | null,
    timeSlot: "",
    serviceAddress: "",
    serviceFee: 0
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleValidAddress = (address: string, serviceFee: number) => {
    setFormData({ ...formData, serviceAddress: address, serviceFee });
    nextStep();
  };

  const handleServiceSelect = (selectedService: string) => {
    setFormData({ ...formData, service: selectedService });
    nextStep();
  };

  const handleSaveQuote = () => {
    alert("Quote saved!");
    // Add logic to save the quote
  };

  const handleBookService = () => {
    nextStep();
  };

  const handleSubmitBooking = () => {
    alert("Service booked!");
    // Add logic to book the service
  };

  return (
    <LoadGoogleMaps>
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="w-full max-w-md p-8 bg-white text-black rounded-lg shadow-md">
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
          {step === 5 && <ReviewAndSubmit formData={formData} prevStep={prevStep} handleSaveQuote={handleSaveQuote} handleBookService={handleBookService} handleTimeSlot={nextStep} />}
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
          {step === 7 && <PaymentFormWrapper formData={formData} handleSubmitBooking={handleSubmitBooking} prevStep={prevStep} />}
        </div>
      </main>
    </LoadGoogleMaps>
  );
};

export default Home;
