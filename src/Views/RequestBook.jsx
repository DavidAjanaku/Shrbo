import React from "react";
import { Link } from "react-router-dom";

import BookInfoCard from "../Component/RequestBook/BookInfoCard";
import BookingInfo from "../Component/RequestBook/BookingInfo";
import Header from "../Component/Navigation/Header";
import BottomNavigation from "../Component/Navigation/BottomNavigation";
import { useNavigate } from "react-router-dom";
import Rating from "../Component/ListingInfo/Ratings";
import ContactInfo from "../Component/RequestBook/ContactInfo";
import { useDateContext } from "../ContextProvider/BookingInfo";

const RequestBook = () => {
  const navigate = useNavigate();

  const {
    checkInDate,
    checkOutDate,
    adults,
    setAdults,
    pets,
    priceDetails,
    setPriceDetails,
    hostFees,
    serviceFee,
    tax,
    totalPrice,
    totalCost,
    housePrice,
    cancellationPolicy,
    title,
    address,
    photo,
    securityDeposit,
    discounts,
  } = useDateContext();

  console.log("checkInDate:", checkInDate);
  console.log("checkOutDate:", checkOutDate);
  console.log("adults:", adults);
  console.log("pets:", pets);
  console.log("priceDetails:", priceDetails);

  // Log host fees, service fee, tax, total price, and total cost
  console.log("hostFees:", hostFees);
  console.log("serviceFee:", serviceFee);
  console.log("tax:", tax);
  console.log("totalPrice:", totalPrice);
  console.log("totalCost:", totalCost);
  console.log("house price:", housePrice);

  // Takes you back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <Header />
      <div className=" h-full px-6 md:px-10 xl:px-20 max-w-7xl  m-auto justify-center items-center flex flex-wrap flex-col gap-6 lg:gap-10  pb-32">
        <div
          className="  py-[18px]  sticky  w-full top-0 block md:hidden bg-white
                                         box-border z-[50]   md:px-10 lg:px-6    "
        >
          <div className=" flex items-center gap-16  ">
            <div className=" items-center flex w-11 ">
              <button
                onClick={handleGoBack}
                className=" cursor-pointer p-0 m-0 transition-transform transparent 
                                     border-none rounded-[50%] relative outline-none touch-manipulation inline-block   "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <title>keyboard-backspace</title>
                  <path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
                </svg>
              </button>
            </div>
            <div className=" text-lg font-semibold">
              <h1 className=" "> Make a request</h1>
            </div>
          </div>
        </div>

        <div className=" mx-auto w-full box-border  text-base hidden md:block  ">
          <div className=" pb-8 box-border text-base ">
            <section>
              <div className=" pt-4 md:pt-16  pb-4 flex flex-row items-center box-border">
                <div className=" pr-[18px] -ml-8 mt-[10px] hidden md:block cursor-pointer ">
                  <button onClick={handleGoBack}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                    >
                      <title>keyboard-backspace</title>
                      <path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
                    </svg>
                  </button>
                </div>
                <div className=" text-3xl font-semibold">
                  <h1 className=" "> Make a request</h1>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="listing-preview w-full mb-4 gap-4 flex flex-col md:hidden  ">
          <div className="flex justify-center gap-2">
            {photo.slice(0, 3).map((item, index) => (
              <div className="image-preview relative" key={index}>
                <div className="flex box-border">
                  <div
                    className=" bg-cover bg-no-repeat overflow-hidden  bg-center rounded-lg  md:rounded-tl-lg md:grow h-[80px] 
                          "
                  >
                    <img
                      className=" w-full h-full"
                      src={item.images}
                      alt={`Image ${index}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" w-full flex flex-col justify-between relative">
            <div className="booking-details w-full block box-border ">
              <div className=" block relative">
                <h3 className="    text-sm font-medium ">{title}</h3>
              </div>
            </div>
            <div className=" text-xs">
              <span className="location box-border block  overflow-hidden text-ellipsis  ">
                {address}
              </span>
            </div>
          </div>
        </div>

        <div className="trips-info    w-full items-stretch justify-start flex-wrap mx-auto  flex">
          <div className=" w-full md:w-[50%] relative ">
            <div className=" mb-16">
              <div className=" box-border">
                <div className=" pb-6">
                  <section>
                    <div className=" font-semibold text-2xl">
                      <h2>Trip info</h2>
                    </div>
                  </section>
                </div>
              </div>

              <div className=" h-full ">
                <BookingInfo />
                <ContactInfo />
              </div>
            </div>
          </div>

          <div className="  w-full md:ml-[8.33333%] md:w-[41.6667%] relative mr-0 h-full ">
            <BookInfoCard />
          </div>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
};

export default RequestBook;
