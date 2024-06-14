import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const LoadGoogleMaps: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY || ""}
      libraries={['places']}
    >
      {children}
    </LoadScript>
  );
};

export default LoadGoogleMaps;
