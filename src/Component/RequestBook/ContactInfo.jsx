import React, { useEffect, useId, useState } from "react";
import { FaPlus, FaPlusCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useDateContext } from "../../ContextProvider/BookingInfo";
import { useStateContext } from "../../ContextProvider/ContextProvider";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

import Axios from "../../Axios";
export default function Example() {
  const [showExistingCardModal, setShowExistingCardModal] = useState(false);
  const [showAddNewCardModal, setShowAddNewCardModal] = useState(false);
  const [existingCard, setExistingCard] = useState(null);
  const [showPayNowModal, setShowPayNowModal] = useState(false); // State for Pay Now modal
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [existingCards, setExistingCards] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [bookNowDisabled, setBookNowDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [checkingExistingCards, setCheckingExistingCards] = useState(false);

  const navigate = useNavigate();

  const {
    checkInDate,
    checkOutDate,
    adults,
    setAdults,
    pets,

    hostFees,
    serviceFee,
    tax,
    totalPrice,
    totalCost,
    housePrice,
    nights,
    cancellationPolicy,
    title,
    address,
    apartment,

    securityDepsoit,
  } = useDateContext();

  const storedUserId = localStorage.getItem("receiverid");
  console.log(storedUserId);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setCheckingExistingCards(true); // Set loading state
        const response = await Axios.get(`/getUserCards/${storedUserId}`);
        const transformedData = response.data.data.map((item) => ({
          name: item.cardtype,
          cardNumber: item.card_number.replace(/(\d{4})(?=\d)/g, "$1 "),
          expiryDate: item.expiry_data.replace(/(\d{2})(\d{2})/, "$1/$2"),
          cvv: item.CVV,
        }));
        setExistingCards(transformedData);
        console.log(transformedData); // Log the transformed data
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setCheckingExistingCards(false); // Reset loading state
      }
    };

    fetchUser();
  }, [storedUserId]);

  console.log(storedUserId);
  console.log(apartment);

  const [showModal, setShowModal] = useState(false);
  const [newCardDetails, setNewCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const openExistingCardModal = () => {
    setShowExistingCardModal(true);
  };

  const closeExistingCardModal = () => {
    setShowExistingCardModal(false);
  };

  const openAddNewCardModal = () => {
    setShowAddNewCardModal(true);
  };

  const closeAddNewCardModal = () => {
    setShowAddNewCardModal(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const { cardNumber } = newCardDetails;
    const existingCard = existingCards.find(
      (card) => card.cardNumber === cardNumber
    );
    if (existingCard) {
      setExistingCard(existingCard);
      openExistingCardModal();
    } else {
      openAddNewCardModal();
    }
  };

  const handleAddNewCard = () => {
    setExistingCard(null);
    closeExistingCardModal();
    openAddNewCardModal();
  };

  const handleCardDetailsChange = (e) => {
    const { name, value } = e.target;
    setNewCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCvvChange = (e) => {
    const { value } = e.target;
    setNewCardDetails((prev) => ({
      ...prev,
      cvv: value,
    }));
  };

  const addNewCard = (e) => {
    e.preventDefault();
    // Process the new card details here
    console.log(newCardDetails);
    // Close the modal
    setShowAddNewCardModal(false);
  };

  const handleBookNow = (event) => {
    event.preventDefault(); // Prevent the default behavior of the event
    if (!checkInDate || !checkOutDate) {
      // If checkInDate or checkOutDate is empty, disable the button and show a message
      setBookNowDisabled(true);
      setMessage("Please select both check-in and check-out dates.");
      return; // Exit the function early
    }
    if (existingCards.length === 0) {
      setShowAddNewCardModal(true);
      setBookNowDisabled(false); // Enable the button when there are no existing cards
    } else {
      setShowExistingCardModal(true);
      setBookNowDisabled(false); // Enable the button when there are existing cards
    }
  };

  const handleCardSelect = (card) => {
    setExistingCard(card);
    setShowPayNowModal(true); // Set showPayNowModal to true when a card is selected
  };

  const handleBooking = async (event) => {
    event.preventDefault(); // Prevent the default behavior of form submission
  
    setShowLoader(true);
  
    const formatDate = (date) => {
      // Ensure date is not null or undefined
      if (!date) return "";
  
      // Convert date string to Date object
      const dateObject = new Date(date);
  
      // Extract day, month, and year
      const day = String(dateObject.getDate()).padStart(2, "0");
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Month is zero-based
      const year = dateObject.getFullYear();
  
      // Construct the formatted date string
      return `${day}/${month}/${year}`;
    };
  
    const payload = {
      adults,
      children: "1",
      pets,
      infants: "1",
      check_in: formatDate(checkInDate),
      check_out: formatDate(checkOutDate),
    };
  
    console.log("Form data:", payload);
    setLoading(true);
  
    try {
      const response = await Axios.post(
        `/payment/initiate-multiple/${apartment}/${storedUserId}`,
        payload
      );
      console.log("Payment initiated:", response.data.payment_link.url);
  
      // Navigate to the payment link within the current window
      window.location.href = response.data.payment_link.url;
  
      setLoading(false);
      setShowLoader(false);
  
      // Show success message to the user
      console.log("Payment initiated successfully");
    } catch (error) {
      console.error("Error initiating payment:", error.response.data);
      message.error(error.response.data.message);
  
      // Handle error: show error message to user
      console.log("Error initiating payment:", error.response.data);
      setLoading(false);
      setShowLoader(false);
    }
  };

  {
    bookNowDisabled && <p className="text-red-500 text-sm">{message}</p>;
  }

  const isValidDate = (value) => {
    // Check if the value matches the MM/YY format (e.g., 12/24)
    return /^\d{2}\/\d{2}$/.test(value);
  };
  const handleDateChange = (e) => {
    let { name, value } = e.target;
    // Add slash after entering the first two numbers
    if (value.length === 2 && !value.includes("/")) {
      value += "/";
    }
    setNewCardDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className=" bg-white  lg:py-4 ">
      {/* <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 text-left sm:text-2xl">
          Contact details
        </h2>
        <p className="mt-2 text-lg text-left leading-8 text-gray-600">
          Aute magna irure deserunt veniam aliqua magna enim voluptate.
        </p>
      </div> */}

      {/* <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-20"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm 0 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone number
            </label>
            <div className="relative mt-2.5">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="h-full rounded-md border bg-transparent bg-none py-0 pl-4 pr-4 text-gray-400 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>EU</option>
                </select>
              </div>
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                autoComplete="tel"
                className="block w-full rounded-md  border px-3.5 py-2 pl-20 text-gray-900 shadow-sm  placeholder:text-gray-400 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border px-3.5 py-2 text-gray-900 shadow-sm focus:outline-gray-400  placeholder:text-gray-400 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
            </div>
          </div>
        </div>
      </form> */}
      <div className="mt-10">
        <button
          type="button"
       // Disable button when checking existing cards
                          onClick={handleBooking}


          className="block w-full rounded-md  px-3.5 bg-orange-500 py-2.5 text-center text-base font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        >
          Book Now
        </button>
      </div>
   

   

      {showLoader && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-25">
          <Spin
            indicator={
              <LoadingOutlined
                style={{ fontSize: 40, color: "#FB923C" }}
                spin
              />
            }
          />
        </div>
      )}
    </div>
  );
}
