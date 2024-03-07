import React, { useEffect, useState } from "react";
import exclammationMark from "../../assets/svg/exclamation-round-icon.svg";
import GoBackButton from "../GoBackButton";
import SuperHostGuidanceCard from "../SuperHostGuidanceCard";
import { Link } from "react-router-dom";
import HostHeader from "../Navigation/HostHeader";
import HostBottomNavigation from "./HostBottomNavigation";
import Notificationbell from "../../assets/bell-icon.png";
import InfoCard from "../InfoCard";
import AlertCard from "../AlertCard";
import { useStateContext } from "../../ContextProvider/ContextProvider";
import axios from "../../Axios";

export default function Hosting() {
  const [activeTab, setActiveTab] = useState("checkingOut");
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { setUser, setToken, token, setHost, setAdminStatus, user } = useStateContext();
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false);
  const [tips, setTips] = useState([]);
  const [upcoming,setUpcoming]=useState([]);
  const [checking,setChecking]=useState([]);
  const [pending,setPending]=useState([]);
  const [arriving,setArriving]=useState([]);
  const [hosting,setHosting]=useState([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(true);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message:
        "New booking request for Property XYZ. Check details and confirm the reservation.",
      date: "Oct 15, 2023",
    },
    {
      id: 2,
      message:
        "Guests for Property ABC will be arriving soon. Ensure everything is ready for their check-in on [date].",
      date: "Oct 18, 2023",
    },
    {
      id: 3,
      message:
        "Don't forget to encourage guests from Property DEF to leave a review. It boosts your property's profile!",
      date: "Oct 20, 2023",
    },
    {
      id: 4,
      message:
        "Maintenance required at Property GHI. Schedule a visit to address issues reported by guests.",
      date: "Oct 22, 2023",
    },
    {
      id: 5,
      message:
        "Payment received for booking at Property JKL. Check your account for transaction details.",
      date: "Oct 25, 2023",
    },
    {
      id: 6,
      message:
        "Guests have checked out from Property MNO. Confirm the condition of the property and report any issues.",
      date: "Oct 28, 2023",
    },
    {
      id: 7,
      message:
        "Provide emergency contact information to guests staying at Property PQR. Ensure their safety and comfort.",
      date: "Nov 1, 2023",
    },
    {
      id: 8,
      message:
        "Create a special offer for Property STU to attract more bookings. Limited-time discounts available!",
      date: "Nov 5, 2023",
    },
    {
      id: 9,
      message:
        "Weather advisory for guests at Property VWX. Inform them about any potential weather-related impacts.",
      date: "Nov 8, 2023",
    },
    {
      id: 10,
      message:
        "Share information about upcoming local events near Property YZ. Enhance your guests' experience.",
      date: "Nov 12, 2023",
    },
  ]);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleBellDropdown = () => {
    setIsBellDropdownOpen(!isBellDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setIsProfileDropdownOpen(false);
  };

  const closeBellDropdown = () => {
    setIsBellDropdownOpen(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to get the user data
        const response = await axios.get("/user"); // Adjust the endpoint based on your API

        // Set the user data in state
        setUser(response.data);
        setHost(response.data.host);
        setAdminStatus(response.data.adminStatus);

      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // Set loading to false regardless of success or error

      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserTips = async () => {
      try {
        // Make a request to get the user data
        const response = await axios.get("/userTips"); // Adjust the endpoint based on your API

        setTips(response.data);

        console.log("hello")



      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        // Set loading to false regardless of success or error

      }
    };

    fetchUserTips();
  }, []);

useEffect(() => {
 
  setLoading(true);

  switch (activeTab) {
    case "upcoming":
      fetchUpcomingData();
      break;
    case "checkingOut":
      fetchCheckingOut()
      break;
    case "currentlyHosting":
      fetchCurrentlyHosting();
      break;
    case "arrivingSoon":
      fetchArrivingSoon();
      break;
    case "pendingReview":
      fetchPendingReview();
      break;
    default:
      setLoading(false);
      break;
  }
}, [activeTab]);

const fetchInitialData =async () => {
  setTabLoading(true);
  await fetchUpcomingData();
  fetchCheckingOut();
  fetchCurrentlyHosting();
  fetchArrivingSoon();
  fetchPendingReview();
  setTabLoading(false);
};

useEffect(() => {
  fetchInitialData();
}, []); 

  const fetchUpcomingData= async()=>{
   await axios.get("/upcomingReservation").then(response=>{
            const filteredUpcoming=response.data.bookings.map(item=>({
              id:item.aboutGuest.id,
                name: item.name,
                checkInDate: item.check_in_date,
                checkOutDate: item.check_out_date,
                // amountPaid: "half payment made",
                time: item.check_out_time,
                image: item.profilepic?item.profilepic:"https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
            }));
          setUpcoming(filteredUpcoming);
          console.log(response.data);
      }).catch(err=>{
        console.log("Upcoming",err);
      }).finally(()=>setLoading(false));

  }

  const fetchPendingReview=async()=>{
     try {
      const response = await axios.get("/getHostPendingReviews");
      const filteredData = response.data.data.map(item => ({
        name: item.username,
        checkInDate: item.check_in,
        id:item.aboutGuest?.id,
        reservationId:item.id,
        image:item.guestProfilePic?item.guestProfilePic:"https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
      }));
      setPending(filteredData)
      console.log("pending", filteredData);
    } catch (error) {
      console.log("pending", error);
    }finally{
      setLoading(false);
    }


  }

  const fetchArrivingSoon=async()=>{
    try {
      const response = await axios.get("/arrivingSoon");
      const filteredData = response.data.bookings.map(item => ({
        name: item.name,
        id:item.aboutGuest.id,
        date: item.check_in_date,
        time:item.check_in_time,
        image:item.profilepic?item.profilepic:"https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
      }));
      setArriving(filteredData)
      console.log("Arriving", filteredData);
    } catch (error) {
      console.log("Arriving", error);
    } finally{
    setLoading(false);
    }


  }

  const fetchCurrentlyHosting=async()=>{
    try {
      const response = await axios.get("/currentlyHosting");
      const filteredData = response.data.bookings.map(item => ({
        name: item.name,
        id:item.aboutGuest.id,
        date: item.check_in_date+"-"+item.check_out_date,
        image:item.profilepic?item.profilepic:"https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
      }));
      setHosting(filteredData)
      console.log("CurrentlyHosting", filteredData);
    } catch (error) {
      console.log("CurrentlyHosting", error);
    }finally{
      setLoading(false);
      }
  
  }

  const fetchCheckingOut=async()=>{
    try {
      const response = await axios.get("/checkingOut");
      const filteredData = response.data.bookings.map(item => ({
        name: item.name,
        id:item.aboutGuest.id,
        date: item.check_out_date,
        time: item.check_in_time,
        image:item.profilepic?item.profilepic:"https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
      }));
      setChecking(filteredData)
      console.log("CheckingOut", filteredData);
    } catch (error) {
      console.log("CheckingOut", error);
    }finally{
      setLoading(false);
    }
  
  }


  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (isProfileDropdownOpen) {
        const profileDropdown = document.getElementById("profile-dropdown");
        if (profileDropdown && !profileDropdown.contains(event.target)) {
          closeProfileDropdown();
        }
      }

      if (isBellDropdownOpen) {
        const bellDropdown = document.getElementById("bell-dropdown");
        if (bellDropdown && !bellDropdown.contains(event.target)) {
          closeBellDropdown();
        }
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [isProfileDropdownOpen, isBellDropdownOpen]);

  const checkingOut = [
    ...checking,
    // {
    //   name: "Endo",
    //   date: " Oct 22",
    //   time: "12:00pm",

    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Endo",
    //   date: "Today",
    //   time: "12:00pm",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Endo",
    //   date: " Oct 22",
    //   time: "12:00pm",

    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Endo",
    //   date: " Expired",
    //   time: "12:00pm",

    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
  ];

  const currentlyHosting = [
    ...hosting,
    // {
    //   name: "Sonia",
    //   date: "Sept 22 - Oct 22",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Abigail",
    //   date: "Sept 22 - Oct 22",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Joy",
    //   date: "Sept 22 - Oct 22",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Soma",
    //   date: "Sept 22 - Oct 22",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
  ];

  const arrivingSoonReservations = [
    
    // {
    //   name: "John",
    //   date: "Oct 25",
    //   time: "3:00pm",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Alice",
    //   date: "Oct 26",
    //   time: "2:30pm",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    ...arriving,
  ];

  const upcomingReservations = [
    // {
    //   name: "Michael Jackson",
    //   checkInDate: "Nov 10 2023",
    //   checkOutDate: "Nov 10 2023",
    //   // amountPaid: "half payment made",
    //   time: "4:00pm",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "William",
    //   checkInDate: "Dec 10 2023",
    //   checkOutDate: "Nov 10 2023",
    //   // amountPaid: "full payment made",
    //   time: "4:00pm",
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    ...upcoming,
  ];

  const pendingReviews = [
    // {
    //   name: "John",
    //   checkInDate: "Oct 25, 2023",
    //   reservationId: 123,
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    // {
    //   name: "Alice",
    //   checkInDate: "Oct 26, 2023",
    //   reservationId: 124,
    //   image:
    //     "https://img.freepik.com/free-photo/handsome-cheerful-man-with-happy-smile_176420-18028.jpg",
    // },
    ...pending,
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "checkingOut":
        if (checkingOut.length === 0) {
          return (
            <div className=" mt-4 h-36 flex justify-center items-center">
              No guest needs to be checked out.
            </div>
          );
        }
        return (
          <div className="  mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {checkingOut.map((host, index) => (
                  <div
                    className="shadow-xl border-2 w-[300px] p-4 mt-4 rounded-xl bg-white "
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
                        <Link to={`/UserDetails/${host.id}`}>
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
            <div className=" mt-4 h-36 flex justify-center items-center">
              You're not currently hosting any guest.
            </div>
          );
        }
        return (
          <div className=" mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {currentlyHosting.map((host, index) => (
                  <div
                    className="shadow-xl border-2 w-64  w-[300px] p-4 mt-4 rounded-xl bg-white "
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
                        <Link to={`/UserDetails/${host.id}`}>
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
            <div className=" mt-4 h-36 flex justify-center items-center">
              No guest is arriving soon.
            </div>
          );
        }
        return (
          <div className=" mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {arrivingSoonReservations.map((reservation, index) => (
                  <div
                    className="shadow-xl border-2 w-64  w-[300px] p-4 mt-4 rounded-xl bg-white"
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
                        <Link to={`/UserDetails/${reservation.id}`}>
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
        if (upcomingReservations.length === 0) {
          return (
            <div className=" mt-4 h-36 flex justify-center items-center">
              No upcoming reservations.
            </div>
          );
        }
        return (
          <div className=" mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {upcomingReservations.map((reservation, index) => (
                  <div
                    className=" shadow-xl border-2 w-64 w-[300px] p-4 mt-4 rounded-xl bg-white "
                    key={index}
                  >
                    {/* Content for each upcoming reservation */}
                    {/* You can customize the content as needed */}
                    <div className="current text-orange-300 text-sm">
                      Upcoming Reservation
                    </div>
                    <div className="flex items-center gap-2 justify-between mt-5 flex-wrap">
                      <div className="guest-name">
                        <h1 className="pb-[2px]">{reservation.name}</h1>
                        <p className="pb-[2px]">CheckIn: {reservation.checkInDate}</p>
                        <p>ChecKOut: {reservation.checkOutDate}</p>
                        <p>{reservation.amountPaid}</p>
                      </div>
                      <div className="guest-image">
                        <Link to={`/UserDetails/${reservation.id}`}>
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
            <div className=" mt-4 h-36 flex justify-center items-center">
              No pending reviews.
            </div>
          );
        }
        return (
          <div className=" mt-4">
            <div className="whitespace-nowrap overflow-x-auto example">
              <div className="flex space-x-3 w-fit p-6 ">
                {pendingReviews.map((review, index) => (
                  <div
                    className="shadow-xl border-2 w-64 w-[300px] p-4 mt-4 rounded-xl bg-white "
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
                        <Link to={`/UserDetails/${review.id}`}>
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


  const SkeletonLoader = Array.from({ length: 5 }).map((group, index) => (
    <div
      key={index}
      className="rounded  m-4 cursor-pointer  "
    >

      <div className=''>

        <div className=' h-[170px] w-[260px] rounded-xl object-cover skeleton-loader text-transparent' />
      </div>
    </div>

  ));

  const SkeletonLoaderTabs= Array.from({ length: 5 }).map((group, index) =>(
    <div
    key={index}
    className={`  py-2 px-4 w-28  h-10 rounded-full   skeleton-loader `}
  >
        
  </div>

  ));





  return (
    <div className="pb-20">
      <HostHeader />
      <div className="flex flex-wrap md:flex-col md:w-[80vw] md:mx-auto md:my-10 p-4 md:p-10">
        <GoBackButton />
        <div className="w-full">
          <p className="text-gray-400 font-normal text-base my-4 italic">
            Efficiently manage your home rental listings with our comprehensive
            management tool.
          </p>

          <div
            id="bell-dropdown"
            className={`relative group  ${isBellDropdownOpen ? "group" : ""}`}
            onClick={toggleBellDropdown}
          >
            <button className="text-white relative">
              <img src={Notificationbell} className="w-5 h-5" alt="" />
              {notifications.length > 0 && (
                <span className="bg-red-500 text-white  absolute h-[2px] w-[2px] p-[5px] top-0 right-0 rounded-full">
                  {/* {notifications.length} */}
                </span>
              )}
            </button>
            {isBellDropdownOpen && notifications.length > 0 && (
              <div className="absolute bg-white z-[60] h-96 overflow-scroll example left-0 mt-1 p-2 w-64 border rounded-lg shadow-lg">
                {/* Render your notifications here */}
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className="text-gray-800 p-2 cursor-pointer my-4 rounded-md hover:bg-orange-300 hover:text-white"
                  >
                    <div>{notification.message}</div>
                    <div className="text-gray-500 text-xs">
                      {notification.date}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap my-4 items-center justify-between">
            <h1 className="text-3xl font-medium my-7">Welcome back, {user.name}</h1>
            <Link to="/Reservations" className="">All Reservations <svg xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} viewBox="0 0 24 24"><title>arrow-right-thin</title><path d="M14 16.94V12.94H5.08L5.05 10.93H14V6.94L19 11.94Z" /></svg></Link>
          </div>

          <div>
            <div className="block text-2xl my-4 font-semibold">
              Recommended for you
            </div>
            <div className="flex space-x-5  w-full overflow-scroll example">
              {tips.map(tip => (

                <AlertCard
                  title={"Verify your identity"||tip.title}
                  description={tip.message}
                  link={tip.url}
                
                  // houseTitle={"Fully Furnished Apartment at Carrington 32 road"}
                />

              ))}

              <AlertCard
                title="Verify your identity"
                description="Required to publish"
                link="/AddGovvernmentId"
                image={exclammationMark}
                houseTitle={"Fully Furnished Apartment at Carrington 32 road"}
              />

              <AlertCard
                title="Resubmit your government ID photo"
                description="It looks like the photo of your id is in black and white. Please make sure your camera is set to take color photos and try again."
                link="/AddGovvernmentId"

              // image={exclammationMark}
              />
              <InfoCard
                title="QUICK LINK"
                description="Finding reservation details Your Trips tab has full details, receipts, and Host contact info for each of your reservations. Go to Trips"
                link="/Trip"
              />
              <InfoCard
                title="Host Tip: Enhance Your Profile"
                description=" Enhance your guests' experience by uploading
                your photo. Let them know who owns the apartment!"
                link="/UsersShow"
              />
            </div>
          </div>
        </div>
        <div className="reservation w-full md:w-[80vw] mt-14 pb-20">
          <div>
           {!tabLoading? <h1 className="text-2xl font-medium mb-4">Your reservations</h1>
            :
            <h1 className="skeleton-loader mb-4 w-52 rounded-[2px] h-7" />}
          </div>
          <div className="tab-container space-x-4 flex  overflow-x-auto whitespace-nowrap example">
         {(!tabLoading)? <>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${activeTab === "checkingOut"
                  ? "active bg-orange-300 text-white"
                  : ""
                }`}
              onClick={() => handleTabClick("checkingOut")}
            >
              Checking out ({checkingOut.length})
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${activeTab === "currentlyHosting"
                  ? "active bg-orange-300 text-white"
                  : ""
                }`}
              onClick={() => handleTabClick("currentlyHosting")}
            >
              Currently hosting ({currentlyHosting.length})
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${activeTab === "arrivingSoon"
                  ? "active bg-orange-300 text-white"
                  : ""
                }`}
              onClick={() => handleTabClick("arrivingSoon")}
            >
              Arriving soon ({arrivingSoonReservations.length})
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${activeTab === "upcoming"
                  ? "active bg-orange-300 text-white"
                  : ""
                }`}
              onClick={() => handleTabClick("upcoming")}
            >
              Upcoming ({upcomingReservations.length})
            </div>
            <div
              className={`tab border py-2 px-4 rounded-full cursor-pointer  ${activeTab === "pendingReview"
                  ? "active bg-orange-300 text-white"
                  : ""
                }`}
              onClick={() => handleTabClick("pendingReview")}
            >
              Pending review ({pendingReviews.length})
            </div>
            </>
            :
          
            (SkeletonLoaderTabs)
          
            }
          </div>

        {!loading?<div className="tab-content">{renderTabContent()}</div>:<div className=" flex items-center w-full  whitespace-nowrap overflow-x-auto example ">{SkeletonLoader}</div>}

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

            <div className="flex  flex-wrap">
              <SuperHostGuidanceCard
                title="Guidance from a Superhost"
                description="We’ll match you with an experienced Host who can help you get started."
              />
              <SuperHostGuidanceCard
                title="Contact specialized support"
                description="As a new Host, you get one-tap access to a specially trained support team."
              />
              <Link to="/DamageReportForm">
                <SuperHostGuidanceCard
                  title="Report Property Damage"
                  description="If a guest has caused any damage to your apartment, please reach out to our specialized support team immediately. Use the 'Contact Support' option to report the incident and provide details about the damage. Our team is here to assist you in resolving the issue and ensuring a smooth resolution process."
                />
              </Link>

            </div>
          </div>
        </div>
      </div>

      <HostBottomNavigation />
    </div>
  );
}
