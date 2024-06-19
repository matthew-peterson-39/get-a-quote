import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchAvailableTimeSlots, fetchAvailableDates, fetchUnavailableDates } from "../utils/workizApi";

type TimeSlotSelectionProps = {
  selectedSlot: string;
  selectedDate: Date | null;
  handleSlotChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleDateChange: (date: Date | null) => void;
  handleSubmit: () => void;
  prevStep: () => void;
};

const TimeSlotSelection: React.FC<TimeSlotSelectionProps> = ({ selectedSlot, selectedDate, handleSlotChange, handleDateChange, handleSubmit, prevStep }) => {
  const [timeSlots, setTimeSlots] = useState<{ time: string, fee: number, available: boolean }[]>([]);
  const [dates, setDates] = useState<Date[]>([]);
  const [unavailableDates, setUnavailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const availableDates = await fetchAvailableDates();
        setDates(availableDates.map((date: string) => new Date(date)));

        const unavailableDates = await fetchUnavailableDates();
        setUnavailableDates(unavailableDates.map((date: string) => new Date(date)));
      } catch (error) {
        console.error("Failed to fetch dates", error);
      }
    };

    fetchDates();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      if (selectedDate) {
        const dateString = selectedDate.toISOString().split('T')[0];
        try {
          const slots = await fetchAvailableTimeSlots(dateString);
          setTimeSlots(slots);
        } catch (error) {
          console.error("Failed to fetch time slots", error);
        }
      } else {
        setTimeSlots([]);
      }
    };

    fetchSlots();
  }, [selectedDate]);

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-center text-black">Select a Date and Time Slot</h2>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Available Dates</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          includeDates={dates}
          excludeDates={unavailableDates}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Available Time Slots</label>
        <select
          name="timeSlot"
          value={selectedSlot}
          onChange={handleSlotChange}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-200 text-black"
          disabled={!selectedDate}
        >
          <option value="">Select a time slot</option>
          {timeSlots.map((slot, index) => (
            <option key={index} value={slot.time} disabled={!slot.available}>
              {slot.time} - ${slot.fee} {slot.available ? "" : "(Unavailable)"}
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
          onClick={handleSubmit}
          className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring focus:ring-green-200"
        >
          Book Service
        </button>
      </div>
    </div>
  );
};

export default TimeSlotSelection;
