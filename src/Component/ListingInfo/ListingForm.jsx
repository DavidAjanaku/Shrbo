import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import DateIcon from "../../assets/svg/date-icon.svg";
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button, Dropdown, Space, message, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../../hoc/Popup";
import ReportListing from "./ReportListing";
import CustomModal from "../CustomModal";
import { FlagOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import { useDateContext } from "../../ContextProvider/BookingInfo";
import PriceSkeleton from "../../SkeletonLoader/PriceSkeleton";
export default function ListingForm({ reservations, reservation, guest }) {
  function showModal(e) {
    e.preventDefault();
    setIsModalVisible(true);
  }
  const [verified, setVerified] = useState(false);

  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [showMessageHostButton, setShowMessageHostButton] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [discount, setDiscount] = useState([]); // State to store the discount value
  const [appliedDiscount, setAppliedDiscount] = useState("");

  const messageRef = useRef(null);
  // const [checkInDate, setCheckInDate] = useState(null);
  // const [checkOutDate, setCheckOutDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [adults, setAdults] = useState(1);
  // const [children, setChildren] = useState(0);
  // const [pets, setPets] = useState(0);
  // const [infants, setInfants] = useState(0);
  const [price, setPrice] = useState(null); // Initialize with a default value if needed
  const [bookedDates, setBookedDates] = useState([]); // Add this line
  const [totalPrice] = useState(null);
  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);
  const [hostFee, setHostFee] = useState(0);
  const [serviceFees, setServiceFees] = useState(0);
  const [taxFees, setTaxFees] = useState(0);
  const [totalCosts, setTotalCosts] = useState(0);
  const [securityDeposit, setSecurityDeposit] = useState(0);
  const [guestFee, setGuestFee] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/user");

        // console.log(response.data.verified);
        setVerified(response.data.verified); // Set the verified status
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchUsers();
  }, []);
  // console.log(verified);
  const {
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    adults,
    setAdults,

    pets,
    setPets,
    hostFees,
    setHostFees,
    serviceFee,
    setServiceFee,
    setTax,
    setTotalPrice,
    totalCost,
    setTotalCost,
    setHousePrice,
    nights,
    setNights,
    setSecurityDeposits,
  } = useDateContext();

  const [form] = Form.useForm(); // Define the form variable
  const [listingDetails, setListingDetails] = useState(null);

  const showMessageModal = () => {
    setMessageModalVisible(true);
  };
  const sendMessage = () => {
    // Get the message from the form field using Ant Design's Form
    const message = form.getFieldValue("message");

    // Log the message to the console
    // console.log("Message:", message);

    // Perform the logic to send the message here

    // Assuming the message has been sent successfully
    setMessageSent(true);

    // Display a success notification
    message.success("Inquiry sent successfully");

    // Close the message modal
    setMessageModalVisible(false);
  };
  useEffect(() => {
    if (reservations && reservations.length > 0) {
      const experiencedGuest = reservations.some(
        (reservation) => reservation.reservation === "An experienced guest"
      );
      setShowMessageHostButton(!experiencedGuest);
    }
  }, [reservations]);

  const { id } = useParams(); // Get the ID parameter from the route

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await Axios.get(`showGuestHome/${id}`);
        setListingDetails(response.data.data);
        // console.log(response.data.data);
        setPrice(response.data.data.price); // Adjust this line based on your API response structure
        setHousePrice(price);
        const checkoutTimeDate = response.data.data.checkout;
        setSecurityDeposit(parseInt(response.data.data.securityDeposit));
        setGuestFee(response.data.data.guest_fee);
        setSecurityDeposits(parseInt(response.data.data.securityDeposit));
        const discounts = response.data.data.discounts;
        let discountValue = null;
        setBookingCount(response.data.data.bookingCount);
        const discountValues = discounts.map((discount) => discount.discount); // Get an array of all discount values

        console.log("Discount values:", discountValues);
        setDiscount(discountValues);

        // Extract booked dates and convert them to Date objects
        const bookedDates = response.data.data.bookedDates.map((date) => {
          const checkInDate = new Date(date.check_in);
          const checkOutDate = new Date(date.check_out);
          return { checkInDate, checkOutDate };
        });

        // console.log(bookedDates);

        // Set the booked dates to exclude them in the DatePicker
        setBookedDates(bookedDates);
      } catch (error) {
        console.error("Error fetching listing details:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchListingDetails();
  }, [id]);

  function handleCancel() {
    setIsModalVisible(false);
  }

  const handleCheckIn = (date) => {
    setCheckInDate(date);
    calculateTotalPrice(date, checkOutDate);
  };

  const handleCheckOut = (date) => {
    setCheckOutDate(date);
    calculateTotalPrice(checkInDate, date);
  };

  const predefinedDiscounts = [
    "20% New listing promotion",
    "5% Weekly discount",
    "10% Monthly discount",
  ];

  const matchingDiscounts = discount.filter((discount) =>
    predefinedDiscounts.includes(discount)
  );

  console.log(
    matchingDiscounts.length > 0 ? matchingDiscounts : "No matches found"
  );

  console.log(bookingCount);

  const calculateTotalPrice = (checkIn, checkOut) => {
    // Ensure that checkIn and checkOut are valid dates
    if (checkIn instanceof Date && checkOut instanceof Date) {
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      const nightlyPrice = Number(price) || 0; // Convert price to a number, default to 0 if NaN
      const basePrice = nights * nightlyPrice;

      // Assuming host fees is 20%, service fee is 5%, and tax is 4%
      const hostFees = 0.07 * basePrice;
      // const serviceFees = 0.01 * basePrice;
      // const tax = 0.05 * basePrice;

      const guest_fee = guestFee * nights;
      // console.log(guest_fee);
      const securityDeposits = securityDeposit;
      const totalPrice = nights * nightlyPrice;
      const TotalPrice = basePrice + securityDeposits;

      setHousePrice(price);
      // console.log(nights);
      setNights(nights);
      setTotalPrice(totalPrice);
      setHostFee(hostFees);
      setHostFees(hostFees);

      setTotalCosts(totalCosts);
      // console.log(totalCosts);
      setServiceFee(serviceFees);
      setServiceFees(serviceFees);
      // setTaxFees(tax);
      // setTax(tax);

      // Check if the booking count is less than 15 days and the discount contains the "20% New listing promotion"
      if (bookingCount < 3 && discount.includes("20% New listing promotion")) {
        setAppliedDiscount("20% New listing promotion (20% off)");

        console.log(basePrice);
        const totalPrice = basePrice + securityDeposits;

        // Apply a 5% discount for stays of 7 nights or more
        const discountedPrice = totalPrice * 0.2; // 5% off
        setTotalCost(totalPrice - discountedPrice);
        console.log(securityDeposits);
      } else if (nights >= 28) {
        // Calculate total price
        setAppliedDiscount("10% Monthly discount (10% off)");

        const totalPrice = basePrice + securityDeposits;

        // Apply a 10% discount for stays of 28 nights or more
        const discountedPrice = totalPrice * 0.1; // 10% off
        setTotalCost(totalPrice - discountedPrice);
      } else if (nights >= 7) {
        // Calculate total price
        setAppliedDiscount("5% Weekly discount (5% off)");

        const totalPrice = basePrice + securityDeposits;

        // Apply a 5% discount for stays of 7 nights or more
        const discountedPrice = totalPrice * 0.05; // 5% off
        setTotalCost(totalPrice - discountedPrice);
      } else {
        setAppliedDiscount("");

        setTotalCost(TotalPrice);
      }
    } else {
      // Set a default value when dates are not selected
      setTotalPrice(null);
    }
  };

  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const calculateNumberOfNights = () => {
    if (checkInDate instanceof Date && checkOutDate instanceof Date) {
      return Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    }
    return 1; // Default to 1 night if dates are not selected
  };
  let pricePerNight = Number(price).toLocaleString();

  const navigate = useNavigate();

  return (
    <div className=" block w-full h-full">
      <div
        className="block mt-12 mb-12 md:sticky z-[100]  top-[80px] box-border  
         w-full max-w-sm rounded-xl bg-white md:p-6 
        md:shadow-xl md:ring-1 md:ring-slate-200"
      >
        <div className=" p-3 rounded relative box-border">
          <div className=" justify-between items-center flex text-sm">
            <div className=" gap-2 items-end flex box-border">
              <div className=" flex-col flex box-border">
                <div className=" gap-2 justify-start flex-wrap flex-row items-center flex">
                  <div>
                    <span aria-hidden="true">
                      <div className="font-medium text-xl box-border">
                        {price === null || totalPrice === 0 ? (
                          <PriceSkeleton />
                        ) : (
                          `₦${Number(price).toLocaleString()}`
                        )}
                      </div>
                    </span>
                  </div>

                  <div className="font-normal text-start text-xs">
                    {checkInDate && checkOutDate
                      ? `for ${calculateNumberOfNights()} ${
                          calculateNumberOfNights() > 1 ? "nights" : "night"
                        }`
                      : "per night"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>

        <div>
          <form>
            <div className="grid grid-cols-2 gap-4 p-2">
              <div className="border border-gray-300 p-2 rounded-lg shadow-sm relative">
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => handleCheckIn(date)}
                  placeholderText="Check in"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  excludeDates={bookedDates.flatMap(
                    ({ checkInDate, checkOutDate }) =>
                      Array.from(
                        {
                          length:
                            (checkOutDate - checkInDate) /
                              (1000 * 60 * 60 * 24) +
                            1,
                        },
                        (_, i) => addDays(checkInDate, i)
                      )
                  )}
                />

                <img
                  src={DateIcon}
                  className="w-4 absolute transform-[translateY(-50%)]"
                  alt="Check In"
                />
              </div>

              <div className="border border-gray-300 p-2 rounded-lg shadow-sm">
                <DatePicker
                  selected={checkOutDate}
                  onChange={(date) => handleCheckOut(date)}
                  placeholderText="Check out"
                  dateFormat="dd/MM/yyyy"
                  minDate={checkInDate ? addDays(checkInDate, 1) : new Date()} // Use checkInDate as the minimum date
                  excludeDates={bookedDates.flatMap(
                    ({ checkInDate, checkOutDate }) =>
                      Array.from(
                        {
                          length:
                            (checkOutDate - checkInDate) /
                              (1000 * 60 * 60 * 24) +
                            1,
                        },
                        (_, i) => addDays(checkInDate, i)
                      )
                  )}
                />

                <img src={DateIcon} className="w-4" alt="Check out" />
              </div>
            </div>

            {/* <!--Traveler input--> */}

            <div className=" relative box-border p-2  ">
              <div className=" overflow-hidden relative border rounded-lg min-h-[50px] block box-border ">
                {/* <label className=" text-xs font-normal px-4  overflow-hidden absolute text-ellipsis whitespace-nowrap  ">
                  Travelers
                </label> */}
                {/* <input className=' border rounded text-base font-normal '/> */}
                <MyDropdown
                  adults={adults}
                  pets={pets}
                  messageModalVisible={messageModalVisible}
                  setAdults={setAdults}
                  setPets={setPets}
                  maxValue={guest} // Pass the guest value from the props as maxValue
                />

                {/* <ListingFormModal isModalVisible={isModalVisible} handleCancel={handleCancel} />
                 */}
              </div>
            </div>

            {/* <!--total before and after tax--> */}
            <div className=" min-h-[1.5rem] w-full   p-3">
              <div className=" border-t py-4 flex flex-col gap-1">
              {appliedDiscount && (
                  <div className=" text-sm text-gray-500 italic">
                    <div className="mb-2 box-border block">
                      <div className="flex justify-between items-end break-words">
                        <span>Discount Applied:</span>
                        <span>{appliedDiscount}</span>
                      </div>
                    </div>
                  </div>
                )}
                {checkInDate && checkOutDate && (
                  <div className=" font-medium text-base box-border flex items-end justify-between break-words    ">
                    <span> Total before </span>
                    <div className=" whitespace-nowrap break-normal ">
                      ₦ {Number(totalCost).toLocaleString()}
                    </div>
                  </div>
                )}

                {checkInDate && checkOutDate && (
                  <div className=" font-normal text-sm box-border flex items-end justify-between break-words    ">
                    <span> see full price</span>
                    <button
                      type="button"
                      className=" whitespace-nowrap break-normal underline text-blue-500 cursor-pointer "
                      onClick={showModal}
                    >
                      price details
                    </button>
                  </div>
                )}

            
                {/* handles the modal  when price details is clicked  */}
                <Popup
                  isModalVisible={isModalVisible}
                  handleCancel={handleCancel}
                  title={"Price details"}
                >
                  <div className="p-3 pt-6 border-y   ">
                    <div>
                      <div className=" pb-4 md:pb-0 ">
                        <div className=" ">
                          <div className="relative">
                            {/* 1 */}
                            <div className=" pb-4 border-b">
                              <div className=" mb-2 box-border block">
                                <div className=" flex items-end justify-between break-words    ">
                                  <div className=" block box-border">
                                    <span>
                                      {pricePerNight} x{" "}
                                      {checkInDate && checkOutDate
                                        ? `for ${calculateNumberOfNights()} ${
                                            calculateNumberOfNights() > 1
                                              ? "nights"
                                              : "night"
                                          }`
                                        : "per night"}
                                    </span>{" "}
                                  </div>

                                  <div className=" ml-4 whitespace-nowrap block box-border">
                                    {totalPrice !== null
                                      ? `₦${Number(
                                          totalPrice
                                        ).toLocaleString()}`
                                      : `₦${pricePerNight}`}
                                  </div>
                                </div>
                              </div>

                              <div className=" mb-2 box-border block">
                                <div className=" relative box-border ">
                                  <div className=" overflow-hidden max-h-24 relative   ">
                                    <div className=" ">
                                      <div className=" mb-2 flex justify-between items-end break-words  ">
                                        <span className=" capitalize">
                                          Security Deposit (Refundable)
                                        </span>

                                        <div className=" ml-4 ">
                                          ₦{" "}
                                          {Number(
                                            securityDeposit
                                          ).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {appliedDiscount && (
                                <div className="">
                                  <div className="mb-2 box-border block">
                                    <div className="flex justify-between items-end break-words">
                                      <span>Discount Applied:</span>
                                      <span>{appliedDiscount}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* <div className=" mb-2t box-border block">
                                <div className=" flex items-end justify-between break-words    ">
                                  <div className=" block box-border">
                                    <span>Service Fee</span>
                                  </div>
                                  <div className=" ml-4 whitespace-nowrap block box-border   ">
                                    ₦ {Number(serviceFees).toLocaleString()}
                                  </div>
                                </div>
                              </div> */}
                              {/* <div className=" mb-2 box-border block">
                                <div className=" flex items-end justify-between break-words    ">
                                  <div className=" block box-border">
                                    <span>Tax</span>
                                  </div>
                                  <div className=" ml-4 whitespace-nowrap block box-border   ">
                                    ₦ {Number(taxFees).toLocaleString()}
                                  </div>
                                </div>
                              </div> */}
                            </div>
                            {/* Total */}
                            <div className="  py-4">
                              <div className=" font-bold text-lg flex items-end justify-between break-words    ">
                                <span> Total </span>
                                <div className=" whitespace-nowrap break-normal ">
                                  ₦ {Number(totalCost).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link to={verified !== null ? "/RequestBook" : undefined}>
                      <button
                        type="button"
                        className="block w-full h-11 rounded bg-orange-500 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal 
                            text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                            focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                            focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2)
                            ,0_4px_18px_0_rgba(59,113,202,0.1)]]"
                        onClick={(event) => {
                          event.preventDefault();
                          if (verified == null) {
                            setShowVerifyModal(true);
                          } else {
                            navigate("/RequestBook");
                          }
                        }}
                      >
                        Book
                      </button>
                    </Link>
                  </div>
                </Popup>
              </div>
            </div>

            {/* <!--Submit button--> */}
            <div className="p-2">
              {showMessageHostButton && (
                <Link to={verified !== null ? "/RequestBook" : undefined}>
                  <button
                    type="button"
                    className="block w-full h-11 mt-3 rounded bg-orange-500 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal 
      text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
      focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
      focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
      dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
      dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2)
      ,0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={(event) => {
                      event.preventDefault();
                      if (verified == null) {
                        setShowVerifyModal(true);
                      } else {
                        navigate("/RequestBook");
                      }
                    }}
                    disabled={!checkInDate || !checkOutDate}
                  >
                    Book
                  </button>
                </Link>
              )}
              <button
                type="button"
                onClick={showMessageModal}
                className="block w-full h-11 mt-3 rounded bg-orange-500 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal 
                            text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]
                            focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                            focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] 
                            dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] 
                            dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2)
                            ,0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                Message Host
              </button>
            </div>
          </form>
        </div>

        {showVerifyModal && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded">
              <h2 className="text-lg font-bold mb-2">Verification Required</h2>
              <p className="text-sm mb-4">
                Please verify your account before booking.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="bg-orange-400 text-white px-4 py-2 rounded mr-2"
                >
                  OK
                </button>
                <Link to="/profile">
                  <button
                    onClick={() => {
                      // Add logic to navigate to settings page
                    }}
                    className="bg-orange-400 text-white px-4 py-2 rounded"
                  >
                    Go to Settings
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className=" font-normal text-sm box-border flex items-end justify-center break-words pt-3  pl-3    ">
          {/* <span> see full price</span> */}
          <button
            type="button"
            className=" whitespace-nowrap break-normal underline flex gap-1  items-center  cursor-pointer "
            onClick={() => setIsReportModalVisible(true)}
          >
            <FlagOutlined className="" />
            <span> report a problem with this listing</span>
          </button>
        </div>
        <Popup
          isModalVisible={isReportModalVisible}
          handleCancel={() => setIsReportModalVisible(false)}
          centered={true}
          // width={"600px"}
        >
          <ReportListing id={id} />
        </Popup>

        {/* <CustomModal isOpen={isReportModalVisible} onClose={()=>setIsReportModalVisible(false)}   >
          <ReportListing/>
          </CustomModal> */}
      </div>

      <Modal
        title="Message Host"
        open={messageModalVisible}
        onCancel={() => setMessageModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setMessageModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="send" type="primary" onClick={sendMessage}>
            Send
          </Button>,
        ]}
      >
        <Form
          onFinish={sendMessage}
          form={form}
          initialValues={{ message: "" }}
        >
          {messageSent ? (
            <p>Message sent successfully</p>
          ) : (
            <>
              <Form.Item
                name="message"
                rules={[
                  {
                    required: true,
                    message: "Please enter your message",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Type your message here..."
                  style={{ width: "100%", minHeight: "100px" }}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="bg-orange-400 hover:bg-orange-600"
                  htmlType="submit"
                >
                  Send
                </Button>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
}

function MyDropdown({ adults, pets, setAdults, setPets, maxValue }) {
  const [adultCount, setAdultCount] = useState(adults);
  const [petCount, setPetCount] = useState(pets);
  const [visible, setVisible] = useState(false);

  const handleDecrease = (setter, value) => {
    if (value > 0) {
      setter(value - 1);
    }
  };
  const handleIncrease = (setter, value) => {
    if (value < maxValue) {
      // Check against the maxValue
      setter(value + 1);
    }
  };

  const handleSubmit = () => {
    setVisible(!visible);
    // Update the adults and pets counts in the parent component
    setAdults(adultCount);
    setPets(petCount);
  };

  const items = [
    <div
      key={1}
      className="flex md:p-8 p-4 gap-2  lg:w-[420px] flex-col space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex-col">
          <span className="text-lg">Guests:</span> <br />
          <p className="text-gray-400">Ages 13 or above</p>
        </div>
        <div className="space-x-2">
          <Button
            shape="circle"
            onClick={() => handleDecrease(setAdultCount, adultCount)}
          >
            -
          </Button>
          <span>{adultCount}</span>
          <Button
            shape="circle"
            onClick={() => handleIncrease(setAdultCount, adultCount)}
          >
            +
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-col">
          <span className="text-lg">Pets:</span>
          <p>
            <Link className="text-gray-400 underline">
              Bringing a service animal?
            </Link>
          </p>
        </div>
        <div className="space-x-2">
          <Button
            shape="circle"
            onClick={() => handleDecrease(setPetCount, petCount)}
          >
            -
          </Button>
          <span>{petCount}</span>
          <Button
            shape="circle"
            onClick={() => handleIncrease(setPetCount, petCount)}
          >
            +
          </Button>
        </div>
      </div>
    </div>,
  ];

  return (
    <Dropdown
      trigger={["click"]}
      onOpenChange={handleSubmit}
      open={visible}
      dropdownRender={(menu) => (
        <div className=" bg-white">
          <Space className="p-2 flex-col w-full shadow-md">
            {items}
            <Button
              className="bg-orange-700"
              type="primary"
              onClick={handleSubmit}
            >
              {" "}
              Done
            </Button>
          </Space>
        </div>
      )}
    >
      <Space className="w-full">
        <button
          type="button"
          className="block m-2 ml-3 cursor-pointer overflow-hidden text-ellipsis text-start whitespace-nowrap text-base font-normal w-full min-w-full"
        >
          <span className="block">Guests</span>
          <span className="text-gray-500">
            {adultCount > 1 ? `${adultCount} guests` : `${adultCount} guest`}{" "}
            {petCount !== 0 &&
              (petCount > 1 ? `, ${petCount} pets` : `, ${petCount} pet`)}
          </span>
        </button>
      </Space>
    </Dropdown>
  );
}
