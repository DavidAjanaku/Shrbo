import React, { createContext, useContext, useState } from "react";

const DateContext = createContext();

export const useDateContext = () => useContext(DateContext);

export const BookingInfoData = ({ children }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [pets, setPets] = useState(0);
  const [hostFees, setHostFees] = useState(0); // New state variable for host fees
  const [serviceFee, setServiceFee] = useState(0); // New state variable for service fee
  const [tax, setTax] = useState(0); // New state variable for tax
  const [totalPrice, setTotalPrice] = useState(0); // New state variable for total price
  const [totalCost, setTotalCost] = useState(0); 
  const [housePrice,setHousePrice] = useState(0);
  const [nights,setNights] = useState(0);
  const [title, setTitle] = useState(""); // New state variable for title
  const [cancellationPolicy, setCancellationPolicy] = useState(""); 
  const [address, setAddress] = useState(""); // New state variable for address
  const [photo, setPhoto] = useState([]); // New state variable for photo
  const [apartment, setApartment] = useState(null); // New state variable for apartment
  const [user, setUser] = useState(null); // Add user state variable and its setter
  const [securityDeposit, setSecurityDeposits] = useState(0); // New state variable for security deposit

  return (
    <DateContext.Provider
      value={{
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        adults,
        setAdults,
        pets,
        setPets,
        hostFees, 
        setHostFees, // Provide setter for host fees
        serviceFee, // Provide service fee to consuming components
        setServiceFee, // Provide setter for service fee
        tax, // Provide tax to consuming components
        setTax, // Provide setter for tax
        totalPrice, // Provide total price to consuming components
        setTotalPrice, // Provide setter for total price
        totalCost, // Provide total cost to consuming components
        setTotalCost, 
        housePrice,
        setHousePrice,
        nights,
        setNights,
        title, // Provide title to consuming components
        setTitle, // Provide setter for title
        cancellationPolicy, // Provide cancellation policy to consuming components
        setCancellationPolicy, 
        address, // Provide address to consuming components
        setAddress, 
        photo, // Provide photo to consuming components
        setPhoto, // Provide se
        apartment, // Provide apartment to consuming components
        setApartment,
        user,
        setUser,
        securityDeposit,
        setSecurityDeposits, 
      }}
    >
      {children}
    </DateContext.Provider>
  );
};
