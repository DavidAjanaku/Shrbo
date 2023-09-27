import React, {useState} from 'react';
import { FaSearch, FaHeart, FaSuitcase, FaInbox, FaUser,FaBars } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import HostModal from '../Dashboard/HostModal';

export default function BottomNavigation() {
  const location = useLocation();
  const currentPage = location.pathname;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    console.log('Menu clicked'); // Add this line to check if the click event is triggered
    setIsModalOpen(!isModalOpen);
  };

  // Define the default color and active color for each navigation item
  const defaultColor = 'white';
  const activeColor = 'orange-400';

  // Define a function to determine the color based on the current page
  const getColor = (path) => (currentPage === path ? activeColor : defaultColor);

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-center z-50">
      <div className="flex justify-between w-3/4">
        <Link to="/" className="cursor-pointer flex flex-col items-center">
          <FaSearch className={`text-2xl text-${getColor('/')}`} />
          <span className={`text-[10px] text-${getColor('/')}`}>Explore</span>
        </Link>
        <Link to="/wishlist" className="cursor-pointer flex flex-col items-center">
          <FaHeart className={`text-2xl text-${getColor('/wishlist')}`} />
          <span className={`text-[10px] text-${getColor('/wishlist')}`}>Wishlist</span>
        </Link>
        <Link to="/trip" className="cursor-pointer flex flex-col items-center">
          <FaSuitcase className={`text-2xl text-${getColor('/trip')}`} />
          <span className={`text-[10px] text-${getColor('/trip')}`}>Trips</span>
        </Link>
        <Link to="/chat" className="cursor-pointer flex flex-col items-center">
          <FaInbox className={`text-2xl text-${getColor('/chat')}`} />
          <span className={`text-[10px] text-${getColor('/chat')}`}>Inbox</span>
        </Link>
        <Link to="/profile" className="cursor-pointer flex flex-col items-center">
          <FaUser className={`text-2xl text-${getColor('/profile')}`} />
          <span className={`text-[10px] text-${getColor('/profile')}`}>Profile</span>
        </Link>
        <Link to="/Settings" className="cursor-pointer flex flex-col items-center" >
          <FaBars className="text-2xl" />
          <span className="text-[10px]">Menu</span>
        </Link>
      </div>
      <HostModal isOpen={isModalOpen} onClose={toggleModal} />
      

    </div>
  );
}
