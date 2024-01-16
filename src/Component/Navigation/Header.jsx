import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HostModal from "../Dashboard/HostModal";
import bellIcon from "../../assets/svg/bell-icon.svg";
import Logo from "../../assets/logo.png"
import axios from "../../Axios.js"
import { useStateContext } from "../../ContextProvider/ContextProvider.jsx";

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, token,adminStatus,host,setAdminStatus,setHost,setUser } = useStateContext();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
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

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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

  const deleteNotification=(notification)=>{
    const response=axios.delete(`/notification/${notification}`);
    console.log("Deleted Notification",response.data)


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

  useEffect(()=>{

        axios.get("/notification").then(response=>{
          setNotifications([...notifications ,response.data.data]);
            console.log("notification",response.data);
        }).catch(error=>{
            console.log("Error",error);
        });





  },[]);

  console.log("adminStatus",adminStatus);
  console.log("host",host);
  

 const logOut=async ()=>{

   try {
    await axios.get("/logout").then(response=>{
 
       console.log("logout",response);
       localStorage.removeItem("Shbro");
       localStorage.removeItem("A_Status");
       localStorage.removeItem("H_Status");
       setIsLoggedIn(false);
       window.location.reload();
     });
   } catch (error) {

     console.log("Error",error);
   }


 } 

 
//  useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       // Make a request to get the user data
//       const response = await axios.get('/user'); // Adjust the endpoint based on your API
     

//       // Set the user data in state
//       setUser(response.data);
//       setHost(response.data.host);
//       setAdminStatus(response.data.adminStatus);
    

//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     } 
//   };

//   fetchUserData();
// }, []); 
  




  return (
    <header className="bg-gray-800 text-white py-2 hidden md:block">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-semibold">
        <Link to="/">
       <img
            src={Logo}
            alt="Logo"
            className="h-16 w-16 mr-2"
          />
       </Link>
        </div>
        <nav className="flex items-center">
          <Link to="/" className="text-white hover:text-gray-300 ml-4">
            Home
          </Link>
          {token&&<Link to="/wishlist" className="text-white hover:text-gray-300 ml-4">
            Wishlist
          </Link>}
          {token&&<Link to="/trip" className="text-white hover:text-gray-300 ml-4">
            Trips
          </Link>}
          {token&& <Link to="/ChatAndNotifcationTab" className="text-white hover:text-gray-300 ml-4">
            Inbox
          </Link>}
         {(host==1&&token)&&  <Link to="/Hosting" className={` hover:text-gray-300 ml-4 ${(host!=0&&token)?"block text-white":"hidden"}`}>
            Switch to Host
          </Link>}
        {(host==0||!host) && <Link to="/HostHomes" className="text-white hover:text-gray-300 ml-4"  >Shrbo your place</Link>}
        { (adminStatus=="admin") && <Link to="/AdminAnalytical" className="text-white hover:text-gray-300 ml-4">
           Dashboard
          </Link>}
         { !token&&<Link  to="/Login" className="text-white hover:text-gray-300 ml-4"   >Login</Link>}

         { token&& <div
            id="profile-dropdown"
            className={`relative ${isProfileDropdownOpen ? "group" : ""}`}
            onClick={toggleProfileDropdown}
            tabIndex={0}
          >
            <Link to="" className="text-white hover:text-gray-300 ml-4">
              Profile
            </Link>
            {isProfileDropdownOpen && (
              <div className="absolute bg-white z-[60] right-0 mt-1 p-2 w-64 border rounded-lg shadow-lg">
                {/* Dropdown content goes here */}
                <Link
                  to="/Profile"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Edit Profile
                </Link>
                <Link
                  to="/Settings"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Settings
                </Link>
                <Link
                  to="/HostHomes"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Create a new Listings
                </Link>
               {(host==1)&& <Link
                  to="/Hosting"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Manage Listings
                </Link>
                }
               {(host==1)&& <Link
                  to="/Listings"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Listings
                </Link>}
                <button
                  // to="/logout"
                  className="block text-gray-800 hover:text-red-500 p-2 cursor-pointer"
                  onClick={logOut}
                >
                  Logout
                </button>
              </div>
            )}
          </div>}
          {/* Bell Icon and Notification Dropdown */}
       { token&&  <div
            id="bell-dropdown"
            className={`relative group ml-4 ${isBellDropdownOpen ? "group" : ""}`}
            onClick={toggleBellDropdown}
          >
            <button className="text-white relative">
              <img src={bellIcon} className="w-5 h-5" alt="" />
              { notifications.length > 0 && (
                <span className="bg-red-500 text-white  absolute h-[2px] w-[2px] p-[5px] top-0 right-0 rounded-full">
                  {/* {notifications.length} */}
                </span>
              )}
            </button>
            {isBellDropdownOpen && notifications.length > 0 && (
              <div className="absolute bg-white z-[999999] h-96 overflow-scroll example w-96 right-0 mt-1 p-2  border rounded-lg shadow-lg">
                {/* Render your notifications here */}
                {notifications.map((notification, index) => (
                  <div key={index} onClick={()=>{deleteNotification(notification.id)}}  className="text-gray-800 my-4 p-2 rounded-md cursor-pointer hover:bg-orange-400 hover:text-white">
                    {notification.message}
                   <div className="text-gray-500 text-xs">
                   {notification.date}
                   </div>
                  </div>
                ))}
              </div>
            )}
          </div>}
        </nav>
      </div>
    </header>
  );
}
