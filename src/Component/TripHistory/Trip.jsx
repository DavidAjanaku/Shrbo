import React, { useState, useEffect } from "react";
import room from "../../assets/room.jpeg";
import room2 from "../../assets/room2.jpeg";
import close from "../../assets/svg/close-line-icon.svg";
import axios from "../../Axios";
import bedroom from "../../assets/svg/double-bed-icon.svg";
import bathroom from "../../assets/svg/bathtub-icon.svg";
import calender from "../../assets/svg/calendar-icon.svg";
import { Link } from "react-router-dom";
import PaginationExample from "../PaginationExample";
import BottomNavigation from "../Navigation/BottomNavigation";
import Header from "../Navigation/Header";


export default function Trip() {
  const [isCancellationModalOpen, setIsCancellationModalOpen] = useState(false); // Step 1: Manage modal visibility
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredTrips, setFilteredTrips] = useState([]);


  useEffect(() => {
    setLoading(true);
    axios.get("/userTrips").then(response => {
      const filteredTripsData = response.data.data.map(item => ({
        id: item.id,
        destination: item.hosthometitleandloacation,
        startDate: item.check_in,
        endDate: item.check_out,
        notes: item.hosthomedescription,
        image: item.hosthomephotos[0],
        amenities: item.hosthomeamenities,
        hostName: "John Doe",
        rating: 4.8,
        bathrooms: item.hosthomebathroom,
        bedrooms: item.hosthomebedroom,
        guests: 2,
        price: item.amountPaid,
        morePhotos: item.hosthomephotos,
        contactHost: "/chat",
        comments: [],
        checkedIn: item.status,
        checkingInDate: "",
        checkingInTime: "",



      }));

      setTrips(filteredTripsData);
      setFilteredTrips(filteredTripsData);
      console.log(response.data.data);


    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));



  },[]);


  const [selectedTab, setSelectedTab] = useState("All"); // Default to "All" trips

  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const addComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const openModal = (trip) => {
    setSelectedTrip(trip);
  };

  const closeModal = () => {
    setSelectedTrip(null);
  };

  const changeMainPhoto = (index) => {
    setSelectedPhotoIndex(index);
  };

  const openCancellationModal = () => {
    setIsCancellationModalOpen(true); // Step 2: Open the cancellation modal
  };

  const closeCancellationModal = () => {
    setIsCancellationModalOpen(false); // Step 2: Close the cancellation modal
  };


  // const tripHistory = [
  //   ...trips,
  // ];

 

  const SkeletonLoader = Array.from({ length: 8 }).map((group, index) => (
    <div
      key={index}
      className="max-w-[26rem] md:max-w-[18rem] rounded overflow-hidden   m-4 cursor-pointer  "
    >

      <div className=''>

        <div className=' h-[250px] w-[270px] rounded-xl object-cover skeleton-loader text-transparent' />
      </div>


      <div className=" py-4">
        <div className="font-medium text-base mb-2 skeleton-loader text-transparent">dddddddddd</div>
        {/* <Rating rating={group.rating} /> */}
        <br></br>
        <p className="text-gray-400 text-base skeleton-loader text-transparent">dddddddddddddddddddd</p>
        {/* <p className="text-gray-400 text-base skeleton-loader text-transparent">dddddddddd</p> */}
        <br></br>
        <p className="font-medium text-gray-700 text-base skeleton-loader text-transparent">dddddddd</p>
      </div>

    </div>

  ));






  const filterTripsByTab = (tab) => {
    if (tab === "All") {
      setFilteredTrips(trips);
    } else {
      const filtered = trips.filter((trip) => {
        return trip.checkedIn.toLowerCase() === tab.toLowerCase(); // Make it case-insensitive
      });
      setFilteredTrips(filtered);
    }
    setSelectedTab(tab);
  };

  return (
    <div className=" h-[100vh]  overflow-auto example">
      <Header />
      <div className="mx-auto md:w-[90%]">
        <header className="text-4xl pl-6 py-6 font-bold">Trips History</header>
        <div className="flex flex-wrap  p-4">
          <button
          disabled={loading}
            className={`${selectedTab === "All"
                ? "bg-orange-400  text-white"
                : "bg-gray-200 text-gray-600"
              } px-4 py-2 rounded-full m-2 `}
            onClick={() => filterTripsByTab("All")}
            title="Show all trips" // Add the title attribute

          >
            All
          </button>
          <button
            disabled={loading}
            className={`${selectedTab === "Reserved"
                ? "bg-orange-400 text-white"
                : "bg-gray-200 text-gray-600"
              } px-4 py-2 rounded-full m-2`}
            onClick={() => filterTripsByTab("Reserved")}
            title="The booking is confirmed, and the check-in date is in the future. The trip has not yet started.
            "
          >
            Reserved
          </button>
          <button
             disabled={loading}
            className={`${selectedTab === "Checked in"
                ? "bg-orange-400 text-white"
                : "bg-gray-200 text-gray-600"
              } px-4 py-2 rounded-full m-2`}
            onClick={() => filterTripsByTab("Checked in")}
            title="The booking is confirmed, and the check-in date is approaching. This status is typically used for upcoming trips."

          >
            Checked In
          </button>
          <button
             disabled={loading}
            className={`${selectedTab === "Checked Out"
                ? "bg-orange-400 text-white"
                : "bg-gray-200 text-gray-600"
              } px-4 py-2 rounded-full m-2`}
            onClick={() => filterTripsByTab("Checked Out")}
            title="The trip has ended, and both the check-in and check-out dates have passed. This status indicates that the reservation is no longer active.
            "
          >
            Checked Out
          </button>
          <button
             disabled={loading}
            className={`${selectedTab === "Cancelled"
                ? "bg-orange-400 text-white"
                : "bg-gray-200 text-gray-600"
              } px-4 py-2 rounded-full m-2`}
            onClick={() => filterTripsByTab("Cancelled")}
            title="The booking has been canceled by either the guest or the host. Cancellation can occur for various reasons, and the status indicates that the reservation is no longer active.
  "
          >
            Cancelled
          </button>

        </div>

       {!loading?
        <div className="flex flex-wrap">
            {filteredTrips.length > 0 ? (
              filteredTrips.map((trip, index) => (
                <div
                  key={index}
                  className="md:w-2/5 m-5 cursor-pointer w-full   rounded-lg"
                >
                  <div className="relative">
                    <div className="absolute p-4 uppercase text-white bg-orange-400">
                      {trip.checkedIn}
                    </div>
                    <img
                      src={trip.image}
                      alt=""
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="font-bold text-xl">{trip.destination}</h2>
                    <div className="flex flex-wrap  my-1">
                      <p className="flex items-center mr-2 text-sm">
                        <img src={calender} className="w-4 mr-3" alt="" />{" "}
                        {trip.startDate}
                      </p>
                      <p className="flex items-center text-sm">
                        <img src={calender} className="w-4 mr-3" alt="" />{" "}
                        {trip.endDate}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <p className="flex">
                        <img src={bathroom} className="w-4 mr-2" alt="" />{" "}
                        {trip.bathrooms}
                      </p>
                      <p className="flex">
                        <img src={bedroom} className="w-4 mr-2" alt="" />{" "}
                        {trip.bedrooms}
                      </p>
                    </div>
                    <div className="text-lg text-orange-400 font-bold mt-2">
                      ₦{trip.price}
                    </div>
                    <div>
                      <span>{trip.checkingInDate}</span>
                    </div>
                    <div>
                      <button
                        className="bg-orange-400 p-4 rounded-full mt-7 text-white text-lg"
                        onClick={() => openModal(trip)}
                      >
                        More Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-2xl p-6">
                <div>
                  <p className="text-lg">
                    No trips booked...yet! Time to dust off your bags and start
                    planning your next adventure.
                  </p>
                </div>

                <button className="bg-orange-400 p-4 rounded-full mt-7 text-white text-lg">
                  Start Searching
                </button>
              </div>
            )}
          </div>
            :
            <div className="flex flex-wrap">

              {SkeletonLoader}
            </div>
        }
      </div>

      {/* Modal */}
      {selectedTrip && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeModal}
          ></div>
          <div className="bg-white pb-32 p-3 rounded-lg z-10 overflow-auto h-[100vh] md:h-[90vh]  md:w-3/6 example">
            <div className="p-4 mt-10 ">
              {/* <div className="text-right"> */}
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <img src={close} className="w-4" alt="" />
              </button>
              {/* </div> */}
              <div className="">
                {/* <h3 className="text-xl font-semibold">Main Photo:</h3> */}
                <img
                  src={selectedTrip.morePhotos[selectedPhotoIndex]}
                  alt={`Main Photo`}
                  className="mt-2 w-full h-2/5 object-cover rounded-lg"
                />
              </div>
              <Link to="/ListingInfoMain">
                <h2 className="text-2xl font-semibold my-4">
                  {selectedTrip.destination}
                </h2>
              </Link>
              <div className="mt-4">
                <h3 className="text-xl font-semibold">More Photos:</h3>
                <div className="flex flex-wrap mt-2">
                  {selectedTrip.morePhotos.map((photo, index) => (
                    <div
                      key={index}
                      onClick={() => changeMainPhoto(index)}
                      className={`cursor-pointer ${selectedPhotoIndex === index
                          ? "border-2 border-orange-400"
                          : ""
                        }`}
                    >
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-20 md:w-32 m-2 md:h-32 object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <h2 className="font-bold text-2xl">
                  {selectedTrip.destination}
                </h2>
                <Link to="/UserDetails">
                  <div className="text-sm font-medium mt-2 flex space-x-2">
                    <span className="mr-2"> Hosted by:</span>
                    {selectedTrip.hostName}
                  </div>
                </Link>
                <div className="flex flex-wrap  my-1">
                  <p className="flex items-center mr-2">
                    <img src={calender} className="w-4 mr-3" alt="" />{" "}
                    {selectedTrip.startDate}
                  </p>
                  <p className="flex items-center">
                    <img src={calender} className="w-4 mr-3" alt="" />{" "}
                    {selectedTrip.endDate}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <p className="flex">
                    <img src={bathroom} className="w-4 mr-2" alt="" />{" "}
                    {selectedTrip.bathrooms}
                  </p>
                  <p className="flex">
                    <img src={bedroom} className="w-4 mr-2" alt="" />{" "}
                    {selectedTrip.bedrooms}
                  </p>
                </div>
                <div className="text-sm flex  font-medium mt-2">
                  <p className="mr-2">Guests</p>
                  {selectedTrip.guests}
                </div>
                <div className="text-lg text-orange-400 font-medium mt-2">
                  <span className="text-black"> Price: </span> ₦
                  {selectedTrip.price}
                </div>

                <div className="text-base break-words  text-black  mt-2">
                  {selectedTrip.notes}
                </div>

                <div className="my-4">
                  <h1 className="font-bold text-2xl">Amenities</h1>
                  {selectedTrip.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </div>
              </div>
            </div>
            <div className="mb-10 flex space-x-3">
              {(selectedTrip.checkedIn.toLowerCase() === "reserved") && <div>
                <button className="bg-orange-400 px-4 py-2 rounded-full   text-white text-sm"
                  onClick={openCancellationModal} // Step 3: Open the cancellation modal
                >
                  Cancel Reservation
                </button>
              </div>}

              {selectedTrip.contactHost && (
                <Link
                  to={selectedTrip.contactHost}
                  className="bg-orange-400 px-4 py-2 rounded-full text-center   text-white text-sm"
                >
                  Contact Host
                </Link>
              )}


            </div>
          </div>
        </div>
      )}

      {isCancellationModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={closeCancellationModal} // Step 3: Close the cancellation modal
          ></div>
          <div className="bg-white p-8 rounded-lg z-10 h-[100vh] md:h-[60vh] w-full md:w-2/5 overflow-auto">
            <div className="text-right">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeCancellationModal} // Step 3: Close the cancellation modal
              >
                <img src={close} className="w-4" alt="" />
              </button>
            </div>
            <h2 className="text-2xl font-semibold mt-4">Cancel Reservation</h2>
            <p className="mt-4">
              Are you sure you want to cancel your reservation for{" "}
              {selectedTrip.destination}? Please provide a reason for
              cancellation:
            </p>
            <textarea
              rows="3"
              className="w-full mt-2 p-2 border rounded"
              placeholder="Reason for cancellation"
            ></textarea>
            <button
              className="bg-orange-400 p-4 rounded-full text-white mt-4"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      )}
      <div className="my-10 pb-32">
        {(trips&&trips.length > 0 )&& <PaginationExample />}
      </div>
      <BottomNavigation />
    </div>
  );
}
