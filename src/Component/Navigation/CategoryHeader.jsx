import React, { useState, useRef, useEffect } from "react";
import Homes from "../../assets/svg/house-window-icon.svg";
import Travel from "../../assets/svg/aeroplane-icon.svg";
import Food from "../../assets/svg/dish-spoon-knife-icon.svg";
import Office from "../../assets/svg/building-icon.svg";
import Art from "../../assets/svg/paint-palette-icon.svg";
import Beach from "../../assets/svg/holiday-vacation-icon.svg";
import LeftButton from "../../assets/svg/angle-circle-left-icon.svg";
import FilterModal from "../Filter/FilterModal";
import {
  FaHome,
  FaHotel,
  FaBed,
  FaBuilding,
  FaTrash,
  FaVideo,
  FaPalette,
  FaCity,
  FaDog,
  FaTree,
  FaUserFriends,
  FaShopify,
  FaWater,
  FaLandmark,
  FaChartBar,
  FaMountain,
  FaWifi,
  FaTv,
  FaUtensils,
  FaHandsWash,
  FaSnowflake,
  FaParking,
  FaSwimmingPool,
  FaHotTub,
  FaFire,
  FaBell,
  FaFirstAid,
  FaFireExtinguisher,
  FaSmoking,
  FaTemperatureHigh,
  FaSuitcase,
  FaShower,
  FaDumbbell,
  FaWheelchair,
  FaPaw,
  FaCoffee,
  FaBook,
  FaChessBoard,
  FaLaptop,
  FaAirFreshener,
  FaPaperclip,
  FaSnowboarding,
  FaArrowUp,
  FaObjectGroup,
  FaWaveSquare,
  FaHotdog,
  FaBox,
  FaUser,
  FaCamera,
  FaShieldAlt,
  FaExclamationTriangle,
  FaBan,
} from "react-icons/fa";

export default function CategoryHeader({filter}) {
  const categories = [
    { id: "house", label: "House", icon: <FaHome className=" text-gray-500  text-xl"  /> },
    { id: "hotel", label: "Hotel", icon: <FaHotel className=" text-gray-500  text-xl"  /> },
    { id: "guestHouse", label: "Guest House", icon: <FaBed className=" text-gray-500  text-xl"  /> },
    { id: "apartment", label: "Apartment", icon: <FaBuilding className=" text-gray-500  text-xl"  /> },
    { id: "office", label: "Office", icon: <FaBuilding className=" text-gray-500  text-xl"  /> },
    { id: "art", label: "Art", icon: <FaPalette className=" text-gray-500  text-xl"  /> },
    { id: "cityApartments", label: "City Apartments", icon: <FaCity className=" text-gray-500  text-xl"  /> },
    {
      id: "petFriendlyRetreats",
      label: "Pet-Friendly Retreats",
      icon: <FaDog className=" text-gray-500  text-xl"  />,
    },
    { id: "treehouseRetreats", label: "Treehouse Retreats", icon: <FaTree className=" text-gray-500  text-xl"  /> },
    {
      id: "familyFriendlyHomes",
      label: "Family-Friendly Homes",
      icon: <FaUserFriends  className=" text-gray-500  text-xl" />,
    },
    { id: "boutiqueVillas", label: "Boutique Villas", icon: <FaShopify  className=" text-gray-500  text-xl" /> },
    { id: "lakesideSerenity", label: "Lakeside Serenity", icon: <FaWater  className=" text-gray-500  text-xl" /> },
    { id: "desertOases", label: "Desert Oases", icon: <FaLandmark  className=" text-gray-500  text-xl" /> },
    { id: "urbanGetaways", label: "Urban Getaways", icon: <FaCity  className=" text-gray-500  text-xl" /> },
    { id: "countryside", label: "Countryside", icon: <FaHome  className=" text-gray-500  text-xl" /> },
    { id: "luxuryEstate", label: "Luxury Estate", icon: <FaCity  className=" text-gray-500  text-xl" /> },
    { id: "trending", label: "Trending", icon: <FaChartBar  className=" text-gray-500  text-xl" /> },
    { id: "beachfrontBliss", label: "Beachfront Bliss", icon: <FaLandmark  className=" text-gray-500  text-xl" /> },
    {
      id: "mountainRetreats",
      label: "Mountain Retreats",
      icon: <FaMountain  className=" text-gray-500  text-xl" />,
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [slideCategory,setSlideCategory]=useState(categories[0].id);
  const scrollerRef = useRef(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePreviousCategory = () => {
    const currentIndex = categories.findIndex(
      (category) => category.id === slideCategory
    );
    const previousIndex =
      (currentIndex - 1 + categories.length) % categories.length;
    setSlideCategory(categories[previousIndex].id);
  
    if (scrollerRef.current) {
      const scrollAmount = previousIndex * 120;
      scrollerRef.current.scroll({ left: scrollAmount, behavior: "smooth" });
    }
  };
  
  const handleNextCategory = () => {
    const currentIndex = categories.findIndex(
      (category) => category.id === slideCategory
    );
    const nextIndex = (currentIndex + 1) % categories.length;
    setSlideCategory(categories[nextIndex].id);
  
    if (scrollerRef.current) {
      const scrollAmount = nextIndex * 120;
      const maxScroll = scrollerRef.current.scrollWidth - scrollerRef.current.clientWidth;
      const clampedScrollAmount = Math.min(scrollAmount, maxScroll);
      scrollerRef.current.scroll({ left: clampedScrollAmount, behavior: "smooth" });
    }
  };
  

  const handleCategoryClicked=(id)=>{
    setSelectedCategory(id);
    filter(id);

  }
  


  const handleScroll = () => {
    if (scrollerRef.current) {
      const scrollAmount = scrollerRef.current.scrollLeft;
      const index = Math.floor(scrollAmount / 120);
      setSlideCategory(categories[index].id);
    }
  };

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollerRef.current) {
        scrollerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const currentIndex = categories.findIndex(
    (category) => category.id === slideCategory
  );
  const canScrollBackward = currentIndex > 0;
  const canScrollForward = currentIndex != categories.length;
  console.log(currentIndex);

  return (
    <div className="mt-16 md:mt-40 w-full ">
      <div className="flex space-x-1 items-center " >
        <button
          className={`border-1 p-1 md:w-8 md:h-8 rounded-full hidden md:block ${
            canScrollBackward ? "" : "opacity-50 cursor-not-allowed"
          } shadow-2xl`}
          onClick={handlePreviousCategory}
          disabled={!canScrollBackward}
          style={{ border: "1px solid black" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4" // You can adjust the width and height here
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        <div className="overflow-x-auto example flex " ref={scrollerRef}>
          {categories.map((category) => (
              <div
                key={category.id}
                className={`flex flex-col px- text-center items-center cursor-pointer  ${
                  selectedCategory === category.id ? "font-bold" : ""
                }`}
                aria-hidden="true"
                tabIndex="-1"
                onClick={()=>handleCategoryClicked(category.id)}
              >
                <input
                  type="radio"
                  name="categoryScroller"
                  className="hidden"
                  checked={selectedCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                />
                <div className="  rounded-full ">
                  {category.icon}
                </div>
                <span className="mt-1 text-sm text-gray-500 w-[150px]">
                  {category.label}
                </span>
              </div>
          ))}
        </div>
        <button
          className={`border-1 p-1 md:w-8 md:h-8 rounded-full hidden md:block ${
            canScrollForward ? "" : "opacity-50 cursor-not-allowed"
          } shadow-md`}
          onClick={handleNextCategory}
          disabled={!canScrollForward}
          style={{ border: "1px solid black" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4" // You can adjust the width and height here
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </div>
     
    </div>
  );
}
