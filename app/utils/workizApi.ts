const WORKIZ_API_URL = "https://api.workiz.com/api/v1";
const AUTH_SECRET = process.env.WORKIZ_AUTH_SECRET;
const WORKIZ_API_TOKEN = process.env.WORKIZ_API_TOKEN;

export const fetchAvailableDates = async () => {
  const response = await fetch(`${WORKIZ_API_URL}/${WORKIZ_API_TOKEN}/schedules`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_SECRET}`,
    },
  });

  const data = await response.json();
  return data; // Adjust this based on the actual response structure
};

export const fetchAvailableTimeSlots = async (date: string) => {
  const response = await fetch(`${WORKIZ_API_URL}/${WORKIZ_API_TOKEN}/schedules/${date}/timeslots`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_SECRET}`,
    },
  });

  const data = await response.json();
  return data; // Adjust this based on the actual response structure
};

export const fetchUnavailableDates = async () => {
  const response = await fetch(`${WORKIZ_API_URL}/${WORKIZ_API_TOKEN}/schedules/unavailable`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${AUTH_SECRET}`,
    },
  });

  const data = await response.json();
  return data; // Adjust this based on the actual response structure
};
