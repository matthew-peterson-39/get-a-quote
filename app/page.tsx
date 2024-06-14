"use client";

import React, { useState } from "react";
import ServiceSelection from "./components/ServiceSelection";
import CustomerInfo from "./components/CustomerInfo";
import AutomotiveServiceDetails from "./components/AutomotiveServiceDetails";
import ResidentialServiceDetails from "./components/ResidentialServiceDetails";
import CommercialServiceDetails from "./components/CommercialServiceDetails";
import ZipCodeCheck from "./components/ZipCodeCheck";
import ReviewAndSubmit from "./components/ReviewAndSubmit";
import TimeSlotSelection from "./components/TimeSlotSelection";

const serviceableZipCodes = ["12345", "67890", "54321"]; // Example zip codes

export default function Home() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    zipCode: "",
    service: "",
    name: "",
    email: "",
    phone: "",
    serviceDetails: "",
    selectedDate: null as Date | null,
    timeSlot: ""
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, selectedDate: date });
  };

  const handleZipCodeCheck = () => {
    if (serviceableZipCodes.includes(formData.zipCode)) {
      nextStep();
    } else {
      alert("Sorry, we do not service your area.");
    }
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-md p-8 bg-white text-black rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-semibold text-center text-black">Get A Quote</h2>
        {step === 1 && <ZipCodeCheck formData={formData} handleChange={handleChange} handleZipCodeCheck={handleZipCodeCheck} />}
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
            handleSubmit={handleSubmitBooking}
            prevStep={prevStep}
          />
        )}
      </div>
    </main>
  );
}
