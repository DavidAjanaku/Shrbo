import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Rating from "./Ratings";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WishlistModal from "../../Views/WishListModal";
import axios from '../../Axios'
const Listings = ({ user, homes, loading }) => {
  const [isDeleted, setDeleted] = useState(true);
  const [listings, setListings] = useState([
    // {
    //   id: 8,
    //   pictures: [
    //     "https://a0.muscache.com/im/pictures/7ca6118f-68c7-4a32-8bbc-09ce1840a373.jpg?im_w=720",
    //     "https://a0.muscache.com/im/pictures/c99e5b00-a779-40e9-bd0e-5062dfdb7eb8.jpg?im_w=720",
    //     "https://a0.muscache.com/im/pictures/f8099680-c563-4491-9258-f679eef415e9.jpg?im_w=720",
    //   ],
    //   location: "2b, Admiralty Road",
    //   price: "$120 per night",
    //   date: "22/08/2023",
    //   title: "22miles away",
    //   rating: 4.8,
    //   link: "/ListingInfoMain",
    // },
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedListingId, setSelectedListingId] = useState(null);
  


  const toggleFavorite = async (id, fav) => {
    if (fav != true) {
      setModalOpen(true);

    } else {
      await axios.delete(`/removeFromWishlist/${id}`).then(response => {

        console.log(response);

        toast.success('Wishlist deleted Successfuly', {
          position: toast.POSITION.TOP_CENTER,
        });


      }).catch(err => {
        console.error(err);
        setDeleted(!isDeleted);

        toast.error(" Couldn't delete Wishlist", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    }
    setSelectedListingId(id);
    setListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing.id === id) {
          const isFavorite = !listing.isFavorite;
          return { ...listing, isFavorite };
        }
        return listing;
      })
    );

  };

  const closeModal = () => {

    setModalOpen(false)
    setListings((prevListings) =>
      prevListings.map((listing) => {
        if (listing.id === selectedListingId) {
          const isFavorite = listing.isFavorite && !listing.isFavorite;
          return { ...listing, isFavorite };
        }
        return listing;
      })
    );

  }

  useEffect(() => {
    if (homes) {

      setListings(homes);
    }

  }, [homes, isDeleted]);


  


  const SkeletonLoader = Array.from({ length: 8 }).map((group, index) => (
    <div
      key={index}
      className="max-w-[26rem] md:max-w-[18rem] rounded-xl overflow-hidden   m-4 cursor-pointer  "
    >

      <div className=''>

        <div className=' h-[250px] w-[330px]  md:w-[300px] rounded-2xl  skeleton-loader text-transparent' />
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


  const Listings = listings.map((listing) => (
    <div
      key={listing.id}
      className="max-w-[26rem] md:max-w-[18rem] mx-auto rounded overflow-hidden   m-4 cursor-pointer"
    >
      <Carousel>
        {listing.pictures.map((picture, index) => (
          <div key={index}>
            {user.name && (
              <button
                onClick={() => toggleFavorite(listing.id, listing.isFavorite)}
                className={`flex items-center absolute outline-none bg-${
                  listing.isFavorite ? "yellow-400" : ""
                } hover:bg-${
                  listing.isFavorite ? "yellow-500" : ""
                } text-white font-bold py-2 px-4 rounded`}
              >
                <div
                  className={`border border-gray-400 rounded-full p-1 ${
                    listing.isFavorite ? "bg-white" : ""
                  }`}
                >
                  <svg
                    className={`w-5 h-5 fill-current ${
                      listing.isFavorite ? "text-red-600" : "text-white"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 16.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C15.09 3.81 16.76 3 18.5 3 21.58 3 24 5.42 24 8.5c0 3.78-3.4 7.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </button>
            )}
            <img
              src={picture.images}
              className="h-[250px] object-cover "
              alt={`Apartment in ${listing.location}`}
            />
          </div>
        ))}
      </Carousel>
      <Link to={`/ListingInfoMain/${listing.id}`}>
        <div className=" py-4">
          <div className="font-medium text-base mb-2">{listing.title}</div>
          <Rating rating={listing.rating} />

          <p className="text-gray-400 text-base">{listing.location}</p>

          <p className="text-gray-400 text-base">{listing.date}</p>
          <p className="font-medium text-gray-700 text-base">{listing.price}</p>
        </div>
      </Link>
      <ToastContainer />
    </div>
  ));








  return (
    <>

      {!loading ? 
      <>

        {(homes && homes.length != 0) ? <div>
          <div className="justify-center mt-10 mb-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {isModalOpen && (
              <WishlistModal
                listingId={selectedListingId}
                added={() => setModalOpen(false)}
                onClose={closeModal}
                onToggleFavorite={(wishlist) => toggleFavorite(selectedListingId, wishlist)}
              />
            )}
            {Listings}
            <br />
          </div>
          <div className="flex justify-center mb-10">
            <button className="py-2 px-4 bg-gray-800 block text-white rounded-full">Show more listings</button>

          </div>
        </div>
          :
          <div className="flex justify-center mt-60 mb-60">
            <p className="text-gray-600 text-4xl">No Listings Available </p>
          </div>}

      </>

        :

        <div>
          <div className="flex flex-wrap justify-center mt-10 mb-32">
            {SkeletonLoader}
            <br />
          </div>
        </div>


      }

    </>
  );
};

export default Listings;
