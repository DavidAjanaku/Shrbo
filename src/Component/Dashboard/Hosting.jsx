import React, { useState } from "react";
import exclammationMark from "../../assets/svg/exclamation-round-icon.svg";
import BottomNavigation from "../Navigation/BottomNavigation";
import GoBackButton from "../GoBackButton";
import SuperHostGuidanceCard from "../SuperHostGuidanceCard";
import { Link } from "react-router-dom";

export default function Hosting() {
  const [activeTab, setActiveTab] = useState("checkingOut");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const checkingOut = [
    {
      name: "Endo",
      date: " Oct 22",
      time: "12:00pm",

      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Endo",
      date: "Today",
      time: "12:00pm",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Endo",
      date: " Oct 22",
      time: "12:00pm",

      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Endo",
      date: " Expired",
      time: "12:00pm",

      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
  ];

  const currentlyHosting = [
    {
      name: "Sonia",
      date: "Sept 22 - Oct 22",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Abigail",
      date: "Sept 22 - Oct 22",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Joy",
      date: "Sept 22 - Oct 22",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Soma",
      date: "Sept 22 - Oct 22",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
  ];

  const arrivingSoonReservations = [
    {
      name: "John",
      date: "Oct 25",
      time: "3:00pm",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Alice",
      date: "Oct 26",
      time: "2:30pm",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
  ];

  const upcomingReservations = [
    {
      name: "Michael Jackson",
      checkInDate: "Nov 10 2023",
      amountPaid: "half payment made",
      time: "4:00pm",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "William",
      checkInDate: "Dec 10 2023",
      amountPaid: "full payment made",
      time: "4:00pm",
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
  ];

  const pendingReviews = [
    {
      name: "John",
      checkInDate: "Oct 25, 2023",
      reservationId: 123,
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    {
      name: "Alice",
      checkInDate: "Oct 26, 2023",
      reservationId: 124,
      image:
        "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    },
    // Add more pending review objects here
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "checkingOut":
        if (checkingOut.length === 0) {
          return (
            <div className="bg-orange-100 mt-4 h-36 flex justify-center items-center">
              No hosts are currently hosting.
            </div>
          );
        }
        return (
          <div className="bg-orange-100 mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {checkingOut.map((host, index) => (
                  <div
                    className=" w-[300px] p-4 mt-4 rounded-xl bg-white shadow-sm"
                    key={index}
                  >
                    <div className="current text-orange-300 text-sm">
                      Checking out
                    </div>
                    <div className="flex items-center  gap-2 justify-between mt-5 flex-wrap">
                      <div className="guest-name">
                        <h1>{host.name}</h1>
                        <p>{host.date}</p>
                        <p>{host.time}</p>
                      </div>
                      <div className="guest-image">
                      <Link to="/UserDetails">
                      <img
                          src={host.image}
                          className="w-10 h-10 object-cover rounded-full"
                          alt=""
                        />
                      </Link>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-orange-400 rounded-full py-2 px-4 w-full text-white ">
                        message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "currentlyHosting":
        if (currentlyHosting.length === 0) {
          return (
            <div className="bg-orange-100 mt-4 h-36 flex justify-center items-center">
              No hosts are currently hosting.
            </div>
          );
        }
        return (
          <div className="bg-orange-100 mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {currentlyHosting.map((host, index) => (
                  <div
                    className=" w-64  w-[300px] p-4 mt-4 rounded-xl bg-white shadow-sm"
                    key={index}
                  >
                    <div className="current text-orange-300 text-sm">
                      Currently hosting
                    </div>
                    <div className="flex items-center gap-2 justify-between mt-5 flex-wrap">
                      <div className="guest-name">
                        <h1>{host.name}</h1>
                        <p>{host.date}</p>
                      </div>
                      <div className="guest-image">
                      <Link to="/UserDetails">
                      <img
                          src={host.image}
                          className="w-10 h-10 object-cover rounded-full"
                          alt=""
                        />
                      </Link>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-orange-400 rounded-full py-2 px-4 w-full text-white ">
                        message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "arrivingSoon":
        if (arrivingSoonReservations.length === 0) {
          return (
            <div className="bg-orange-100 mt-4 h-36 flex justify-center items-center">
              No hosts are currently hosting.
            </div>
          );
        }
        return (
          <div className="bg-orange-100 mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {arrivingSoonReservations.map((reservation, index) => (
                  <div
                    className=" w-64  w-[300px] p-4 mt-4 rounded-xl bg-white shadow-sm"
                    key={index}
                  >
                    <div className="current text-orange-300 text-sm">
                      Arriving soon
                    </div>
                    <div className="flex items-center gap-2 justify-between mt-5 flex-wrap">
                      <div className="guest-name">
                        <h1>{reservation.name}</h1>
                        <p>{reservation.date}</p>
                        <div className="flex space-x-3">
                          <span>Time of arrival:</span>
                          <p>{reservation.time}</p>
                        </div>
                      </div>
                      <div className="guest-image">
                      <Link to="/UserDetails">
                      <img
                          src={reservation.image}
                          className="w-10 h-10 object-cover rounded-full"
                          alt=""
                        />
                      </Link>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-orange-400 rounded-full py-2 px-4 w-full text-white ">
                        message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "upcoming":
      case "upcoming":
        if (upcomingReservations.length === 0) {
          return (
            <div className="bg-orange-100 mt-4 h-36 flex justify-center items-center">
              No upcoming reservations.
            </div>
          );
        }
        return (
          <div className="bg-orange-100 mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {upcomingReservations.map((reservation, index) => (
                  <div
                    className="w-64 w-[300px] p-4 mt-4 rounded-xl bg-white shadow-sm"
                    key={index}
                  >
                    {/* Content for each upcoming reservation */}
                    {/* You can customize the content as needed */}
                    <div className="current text-orange-300 text-sm">
                      Upcoming Reservation
                    </div>
                    <div className="flex items-center gap-2 justify-between mt-5 flex-wrap">
                      <div className="guest-name">
                        <h1>{reservation.name}</h1>
                        <p>{reservation.checkInDate}</p>
                        <p>{reservation.amountPaid}</p>
                      </div>
                      <div className="guest-image">
                      <Link to="/UserDetails">
                      <img
                          src={reservation.image}
                          className="w-10 h-10 object-cover rounded-full"
                          alt=""
                        />
                      </Link>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-orange-400 rounded-full py-2 px-4 w-full text-white ">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "pendingReview":
        if (pendingReviews.length === 0) {
          return (
            <div className="bg-orange-100 mt-4 h-36 flex justify-center items-center">
              No pending reviews.
            </div>
          );
        }
        return (
          <div className="bg-orange-100 mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {pendingReviews.map((review, index) => (
                  <div
                    className="w-64 w-[300px] p-4 mt-4 rounded-xl bg-white shadow-sm"
                    key={index}
                  >
                    <div className="current text-orange-300 text-sm">
                      Pending Review for Reservation {review.reservationId}
                    </div>
                    <div className="flex items-center gap-2 justify-between mt-5 flex-wrap">
                      <div className="guest-name">
                        <h1>{review.name}</h1>
                        <p>Check-In Date: {review.checkInDate}</p>
                      </div>
                      <div className="guest-image">
                      <Link to="/UserDetails">
                      <img
                          src={review.image}
                          className="w-10 h-10 object-cover rounded-full"
                          alt=""
                        />
                      </Link>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-orange-400 rounded-full py-2 px-4 w-full text-white">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      // ...
    }
  };
 
  return (
    <div className="pb-20">
      <div className="flex flex-wrap md:flex-col md:w-[80vw] md:mx-auto md:my-10 p-4 md:p-10">
        <GoBackButton />
        <div className="w-full">
          <div className="">Bell</div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-medium my-7">Welcome back, Endo</h1>
            <Link to="/Reservations">All Reservations(3)</Link>
          </div>
          <div className="flex space-x-5">
            <div className="flex justify-between border rounded-lg p-4 md:w-fit items-center space-x-4 w-full w-80">
              <div className="">
                <div>
                  <h1 className="text-sm font-medium mb-2">
                    Verify your identity
                  </h1>
                </div>
                <div>
                  <span className="text-red-600 text-sm">
                    Required to publish
                  </span>
                </div>
                <div>
                  <span className="text-gray-600 text-sm">House Title</span>
                </div>
                <div>
                 <Link to="/AddGovvernmentId">
                 <span className="text-blue-500 cursor-pointer underline-offset-4 underline">
                    Get started
                  </span>
                 </Link>
                </div>
              </div>
              <div className="px-4">
                <img src={exclammationMark} className="w-7" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="reservation w-full md:w-[80vw] mt-14 pb-20">
          <div>
            <h1 className="text-2xl font-medium mb-4">Your reservations</h1>
          </div>
          <div className="tab-container space-x-4 flex  overflow-x-auto whitespace-nowrap example">
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${
                activeTab === "checkingOut"
                  ? "active bg-orange-300 text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("checkingOut")}
            >
              Checking out (4)
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${
                activeTab === "currentlyHosting"
                  ? "active bg-orange-300 text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("currentlyHosting")}
            >
              Currently hosting (0)
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${
                activeTab === "arrivingSoon"
                  ? "active bg-orange-300 text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("arrivingSoon")}
            >
              Arriving soon (0)
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${
                activeTab === "upcoming"
                  ? "active bg-orange-300 text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("upcoming")}
            >
              Upcoming (0)
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${
                activeTab === "pendingReview"
                  ? "active bg-orange-300 text-white"
                  : ""
              }`}
              onClick={() => handleTabClick("pendingReview")}
            >
              Pending review (0)
            </div>
          </div>
          <div className="tab-content">{renderTabContent()}</div>

          <div className="my-10 bg-orange-100 p-5">
            <h1 className="mb-5 text-2xl">Share more details</h1>
            <div className="w-64 border p-4 rounded-lg shadow-lg relative bg-white ">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Your Profile</h2>
                <p className="text-gray-600">
                  Personalizing your profile can improve your search ranking and
                  help guests get to know you better.
                </p>
               <Link to="/UsersShow">
               
               <button className="bg-orange-400 py-2 px-4 rounded-full mt-2 text-white">
                  <strong>Add profile details</strong>
                </button>
               </Link>
              </div>
              <button className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer">
                X
              </button>
            </div>
          </div>

          <div className="my-10 bg-orange-100 p-5">
            <h1 className="mb-5 text-2xl">We are here to help</h1>

            <div className="flex md:space-x-4 flex-wrap">
              <SuperHostGuidanceCard
                title="Guidance from a Superhost"
                description="We’ll match you with an experienced Host who can help you get started."
              />
              <SuperHostGuidanceCard
                title="Contact specialized support"
                description="As a new Host, you get one-tap access to a specially trained support team."
              />
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
