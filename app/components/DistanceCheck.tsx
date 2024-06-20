import React, { useState } from "react";
import AddressAutocomplete from "./AddressAutocomplete";

const businessAddress = "4120 Indianola Ave, Columbus, OH 43214";

const DistanceCheck: React.FC<{ onValidAddress: (address: string, serviceFee: number) => void }> = ({ onValidAddress }) => {
  const [error, setError] = useState<string | null>(null);

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    const serviceRadius = 20; // Service radius in minutes
    const extendedServiceRadius = 30; // Extended service radius in minutes

    const serviceCenterLatLng = new google.maps.LatLng(40.047239, -83.000021); // Business address coordinates
    const userAddressLatLng = new google.maps.LatLng(lat, lng);

    const distanceService = new google.maps.DistanceMatrixService();
    distanceService.getDistanceMatrix(
      {
        origins: [serviceCenterLatLng],
        destinations: [userAddressLatLng],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DistanceMatrixStatus.OK) {
          // @ts-ignore: Object literal may only specify known properties, and 'googleMapsApiKey' does not exist in type 'HookArgs'.
          const durationInMinutes = response.rows[0].elements[0].duration.value / 60;

          let serviceFee;
          if (durationInMinutes <= serviceRadius) {
            serviceFee = 15; // Base service fee
          } else if (durationInMinutes <= extendedServiceRadius) {
            serviceFee = 30; // Higher service fee for extended radius
          } else {
            setError("Sorry, we do not service your area.");
            return;
          }

          onValidAddress(address, serviceFee);
        } else {
          setError("Error calculating distance.");
        }
      }
    );
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-700">Enter your service address</label>
          <AddressAutocomplete onAddressSelect={handleAddressSelect} />
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default DistanceCheck;
