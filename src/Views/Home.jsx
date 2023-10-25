import React, { useState, useEffect } from "react";
import SearchLocation from "../Component/SearchLocation";
import CategoryHeader from "../Component/Navigation/CategoryHeader";
import Listings from "../Component/ListingInfo/Listings";
import Header from "../Component/Navigation/Header";
import Hamburger from "../Component/Navigation/Hamburger";
import Modal from "../Component/SearchModal/Modal";
import searchIcon from "../assets/svg/search-icon.svg";
import BottomNavigation from "../Component/Navigation/BottomNavigation";
import Footer from "../Component/Navigation/Footer";
import RateHouseModal from "../Component/RateHouseModal";
import FilterModal from "../Component/Filter/FilterModal";
import ChatSupport from "../Component/ChatBot/ChatSupport";
export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchButtonFixed, setIsSearchButtonFixed] = useState(false);
  const [houseDetails, setHouseDetails] = useState(null); // Store house details here
  const [isRateHouseModalOpen, setIsRateHouseModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openRateHouseModal = () => {
    setIsRateHouseModalOpen(true);
  };

  const closeRateHouseModal = () => {
    setIsRateHouseModalOpen(false);
  };

  useEffect(() => {
    // Add an event listener to handle scrolling
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSearchButtonFixed(true);
      } else {
        setIsSearchButtonFixed(false);
      }
    };

    // Attach the event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Simulate fetching house details after 5 seconds
    const timer = setTimeout(() => {
      setHouseDetails({
        name: "4 bedroom neatly compound hehehe",
        location: "2b Jikwoyi Abuja",
        // Add more house details here
      });
      openRateHouseModal(); // Show the RateHouseModal after fetching details
    }, 500000000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, []);

  return (
    <div>
      <Header />
      {/* <Hamburger /> */}
      <BottomNavigation />
      <div
        className={` md:w-2/5 mx-auto flex justify-center fixed z-10 left-0 right-0 transition-all ${
          isSearchButtonFixed ? "top-0" : "mt-6"
        }`}
      >
        <div className="bg-orange-400 z-50 w-[90%] md:w-full flex items-center justify-between  py-3 px-5 rounded-full mt-6 text-white shadow-2xl">
          <button onClick={openModal} className="flex  items-center w-3/4">
            <div className="w-[20%]"> 
              <img src={searchIcon} className="w-6" alt="" />
            </div>
            <div className="w-[100%] text-start">
              <div className="">
                <div className="text-base font-medium">Anywhere</div>
                <div className=" text-[12px] flex">
                  <div className="">Any week</div>
                  <div className="mx-4">Add guests</div>
                </div>
              </div>
            </div>
          </button>
         <div>
         <FilterModal/>
         </div>
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
      <div className="pageHeader"></div>
      <div className="storeFrontHomeage">
        <div>
          <div className="hero-pattern relative bg-cover bg-center md:h-[70vh] h-[100vh] bg-[url('https://forever.travel-assets.com/flex/flexmanager/images/2022/12/09/Exterior-Cabin_Privacy_Wrigley_VRBO_APFT2__Vancouver__Therin_8256x3960.jpg?impolicy=fcrop&w=1040&h=580&q=mediumHigh')]">
            <h1 className="absolute inset-0 flex items-center justify-center -top-20 md:top-0 text-white md:text-6xl text-5xl lg:text-6xl p-4 text-center">
            Unlock Comfort, Discover Adventure with Shrbo.
            </h1>
          <div>
              <p className="absolute inset-5 flex items-center justify-center  text-white -bottom-60 md:-bottom-32 md:text-base text-center   text-sm">
            Welcome to Shrbo, where comfort meets adventure. Find your perfect home away from home and embark on memorable journeys, one stay at a time.
            </p>
          </div>
            <section className="flex  justify-center bottom-0 ">
              {/* <SearchLocation /> */}
            </section>
          </div>
        </div>
        <div>
          {/* <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A, iste
            porro beatae asperiores sapiente dolorum dolor quod voluptatibus
            odit, numquam quasi illo doloremque harum aut rem eaque nesciunt,
            reiciendis nihil?
          </p> */}
        </div>

        <section className=" mx-auto justify-center w-[95%] md:w-[80%]">
          <div className="justify-center flex">
            <CategoryHeader />
          </div>

          <Listings />
        </section>
        <RateHouseModal
          isOpen={isRateHouseModalOpen}
          onClose={closeRateHouseModal}
          houseDetails={houseDetails}
        />
       
      </div>
      <ChatSupport/>
      <Footer />
    </div>
  );
}
