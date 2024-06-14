import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const PaymentForm = ({ formData, handleSubmitBooking, prevStep }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [billingMatchesService, setBillingMatchesService] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  useEffect(() => {
    if (billingMatchesService && formData.serviceAddress) {
      const [address, city, state, zip] = formData.serviceAddress.split(', ');
      setCardDetails((prev) => ({
        ...prev,
        address,
        city,
        state,
        zip,
      }));
    }
  }, [billingMatchesService, formData.serviceAddress]);

  const handleInputChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setBillingMatchesService(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: formData.serviceFee * 100 }), // Amount in cents
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${cardDetails.firstName} ${cardDetails.lastName}`,
            address: {
              line1: cardDetails.address,
              city: cardDetails.city,
              state: cardDetails.state,
              postal_code: cardDetails.zip,
            },
          },
        },
      });

      if (error) {
        setError(error.message || 'An unexpected error occurred.');
        setLoading(false);
        return;
      }

      if (paymentIntent?.status === 'succeeded') {
        handleSubmitBooking();
      }
    } catch (error) {
      setError('An unexpected error occurred.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Booking Information</h3>
        <p><strong>Service:</strong> {formData.service} - {formData.serviceDetails}</p>
        <p><strong>Date:</strong> {formData.selectedDate?.toLocaleDateString()}</p>
        <p><strong>Time Slot:</strong> {formData.timeSlot}</p>
        <hr className="my-4" />
        <p className="text-gray-500"><del>Total Quote Estimate: $100</del></p>
        <p className="text-lg font-semibold">Service Call Fee: ${formData.serviceFee} (due today)</p>
        <p className="text-sm text-gray-700">This fee covers the technician driving to your service location. The remaining amount will be due upon service completion.</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
        <input
          type="text"
          name="firstName"
          value={cardDetails.firstName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
        <input
          type="text"
          name="lastName"
          value={cardDetails.lastName}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          value={cardDetails.address}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={cardDetails.city}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          name="state"
          value={cardDetails.state}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">ZIP Code</label>
        <input
          type="text"
          name="zip"
          value={cardDetails.zip}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={billingMatchesService}
            onChange={handleCheckboxChange}
            className="form-checkbox"
          />
          <span className="ml-2 text-gray-700">Billing matches Service Address</span>
        </label>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Card Information</label>
        <CardElement className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200" />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
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
          disabled={!stripe || loading}
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
        >
          {loading ? "Processing..." : "Pay and Book"}
        </button>
      </div>
    </form>
  );
};

const PaymentFormWrapper = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};

export default PaymentFormWrapper;
