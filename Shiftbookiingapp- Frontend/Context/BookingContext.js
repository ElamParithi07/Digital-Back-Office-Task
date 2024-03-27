import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookedShifts, setBookedShifts] = useState([]);

  const refreshOtherPages = () => {
    setBookedShifts([1]);
  };

  return (
    <BookingContext.Provider value={{ bookedShifts, setBookedShifts, refreshOtherPages }}>
      {children}
    </BookingContext.Provider>
  );
};
