import React, { useState } from "react";
import TermsModal from "./TermsModal";

type ReviewAndSubmitProps = {
  formData: any;
  prevStep: () => void;
  handleSaveQuote: () => void;
  handleBookService: () => void;
  handleTimeSlot: () => void;
  businessName: string;
  resetForm: () => void;
};

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ formData, prevStep, handleSaveQuote, handleBookService, handleTimeSlot, businessName, resetForm }) => {
  const mockEstimate = formData.estimatedCost || 100; // Mock cost estimate for the service
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quoteSaved, setQuoteSaved] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSaveQuoteClick = async () => {
    await handleSaveQuote();
    setQuoteSaved(true);
  };

  if (quoteSaved) {
    return (
      <div className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Quote Saved!</h3>
        <p>Your quote has been saved and emailed to you at {formData.email}.</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBookService}
            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
          >
            Book Now
          </button>
          <button
            onClick={resetForm}
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Get Another Quote
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-center text-black">Review Your Quote</h2>
      <div className="mb-4">
        <p><strong>Service:</strong> {formData.service}</p>
        <p><strong>Details:</strong> {formData.serviceDetails}</p>
        <p><strong>Estimated Cost:</strong> ${mockEstimate}</p>
      </div>
      <div className="mb-4">
        <p><strong>First Name:</strong> {formData.firstName}</p>
        <p><strong>Last Name:</strong> {formData.lastName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">
          By saving this quote or booking this service, you acknowledge that you have read and understood, and agree to {businessName}’s
          <button type="button" onClick={handleModalOpen} className="text-blue-600 underline ml-1">
            Terms and Privacy Policy
          </button>.
        </p>
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
          onClick={handleSaveQuoteClick}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Save Quote
        </button>
        <button
          type="button"
          onClick={handleTimeSlot}
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
        >
          Book Service
        </button>
      </div>
      {isModalOpen && <TermsModal onClose={handleModalClose} businessName={businessName} />}
    </div>
  );
};

export default ReviewAndSubmit;
