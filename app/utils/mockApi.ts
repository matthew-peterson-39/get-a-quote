// utils/mockApi.ts
export const fetchAvailableDates = () => {
    const available_dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i++) {  // Next 30 days
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      available_dates.push(date.toISOString().split('T')[0]);  // Format as YYYY-MM-DD
    }
    return available_dates;
  };
  
  export const fetchUnavailableDates = () => {
    const unavailable_dates = [];
    const today = new Date();
    for (let i = 0; i < 30; i += 5) {  // Block every 5th day
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      unavailable_dates.push(date.toISOString().split('T')[0]);  // Format as YYYY-MM-DD
    }
    return unavailable_dates;
  };
  
  export const fetchAvailableTimeSlots = () => {
    const businessHoursStart = 6; // 6:00 AM
    const businessHoursEnd = 23; // 11:00 PM
    const normalFee = 15;
    const outOfHoursFee = 25;
  
    // Mock time slots based on business hours
    const timeSlots = [];
    const startTime = new Date();
    startTime.setHours(6, 0, 0); // 6:00 AM
  
    const endTime = new Date();
    endTime.setHours(23, 0, 0); // 11:00 PM
  
    const currentTime = new Date(startTime);
    while (currentTime <= endTime) {
      timeSlots.push({
        time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fee: businessHoursStart <= currentTime.getHours() && currentTime.getHours() < businessHoursEnd ? normalFee : outOfHoursFee,
        available: true
      });
      currentTime.setMinutes(currentTime.getMinutes() + 30); // 30-minute intervals
    }
  
    // Mock some slots as booked or closed
    const bookedSlots = ["08:00 AM", "12:00 PM", "03:00 PM"];
    const closedSlots = ["07:30 PM", "08:00 PM"];
    
    timeSlots.forEach(slot => {
      if (bookedSlots.includes(slot.time) || closedSlots.includes(slot.time)) {
        slot.available = false;
      }
    });
  
    return timeSlots;
  };
  