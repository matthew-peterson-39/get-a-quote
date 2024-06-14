import React from "react";

type ReviewAndSubmitProps = {
  formData: any;
  prevStep: () => void;
  handleSaveQuote: () => void;
  handleBookService: () => void;
  handleTimeSlot: () => void;
};

const ReviewAndSubmit: React.FC<ReviewAndSubmitProps> = ({ formData, prevStep, handleSaveQuote, handleBookService, handleTimeSlot }) => {
  const mockEstimate = 100; // Mock cost estimate for the service

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-center text-black">Review Your Quote</h2>
      <div className="mb-4">
        <p><strong>Service:</strong> {formData.service}</p>
        <p><strong>Details:</strong> {formData.serviceDetails}</p>
        <p><strong>Estimated Cost:</strong> ${mockEstimate}</p>
      </div>
      <div className="mb-4">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
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
          onClick={handleSaveQuote}
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
    </div>
  );
};

export default ReviewAndSubmit;
