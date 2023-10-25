import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HostModal from "../Dashboard/HostModal";
import bellIcon from "../../assets/svg/bell-icon.svg";
import Logo from "../../assets/logo.png"

export default function Header() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
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

  return (
    <header className="bg-gray-800 text-white py-4 hidden md:block">
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
          <Link to="/wishlist" className="text-white hover:text-gray-300 ml-4">
            Wishlist
          </Link>
          <Link to="/trip" className="text-white hover:text-gray-300 ml-4">
            Trips
          </Link>
          <Link to="/ChatAndNotifcationTab" className="text-white hover:text-gray-300 ml-4">
            Inbox
          </Link>
          <Link to="/Hosting" className="text-white hover:text-gray-300 ml-4">
            Switch to Host
          </Link>
          <Link to="/AdminAnalytical" className="text-white hover:text-gray-300 ml-4">
           Dashboard
          </Link>
          <div
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
                <Link
                  to="/Hosting"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Manage Listings
                </Link>
                <Link
                  to="/Listings"
                  className="block text-gray-800 hover:text-orange-400 p-2 cursor-pointer"
                >
                  Listings
                </Link>
                <Link
                  to="/logout"
                  className="block text-gray-800 hover:text-red-500 p-2 cursor-pointer"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          {/* Bell Icon and Notification Dropdown */}
          <div
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
              <div className="absolute bg-white z-[60] right-0 mt-1 p-2 w-64 border rounded-lg shadow-lg">
                {/* Render your notifications here */}
                {notifications.map((notification, index) => (
                  <div key={index} className="text-gray-800 p-2 cursor-pointer hover:bg-orange-400 hover:text-white">
                    {notification.message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
