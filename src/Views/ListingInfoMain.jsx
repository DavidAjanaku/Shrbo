import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListingPhotos from "../Component/ListingInfo/ListingPhotos";
import HostedBy from "../Component/ListingInfo/HostedBy";
import HostProfilePreview from "../Component/ListingInfo/HostProfilePreview";
import Amenities from "../Component/ListingInfo/Amenities";
import AboutProperty from "../Component/ListingInfo/AboutProperty";
import ListingMap from "../Component/ListingInfo/ListingMap";
import ListingReviews from "../Component/ListingInfo/ListingReviews";
import Testimonial from "../Component/ListingInfo/Testimonial";
import ListingForm from "../Component/ListingInfo/ListingForm";
import HouseRules from "../Component/ListingInfo/HouseRules";
import BottomNavigation from "../Component/Navigation/BottomNavigation";
import Header from "../Component/Navigation/Header";
import Axios from "../Axios";
const ListingInfoMain = () => {
  const { id } = useParams(); // Get the ID parameter from the route
  const [listingDetails, setListingDetails] = useState(null);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await Axios.get(`showGuestHome/${id}`);
        setListingDetails(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchListingDetails();
  }, [id]);

  if (!listingDetails) {
    // Loading state or return null
    return (
      <div>
        {/* You can add a loading spinner or message here */}
        Loading...
      </div>
    );
  }
  return (
    <div className="">
      <Header />
      <div className=" px-6 md:px-10 xl:px-20 max-w-7xl  m-auto justify-center items-center flex flex-wrap flex-col gap-6 lg:gap-10 ">
        <ListingPhotos
          hosthomephotos={listingDetails.hosthomephotos}
          hosthomevideo={listingDetails.hosthomevideo}
          title={listingDetails.title}
          address={listingDetails.address}
        />

        <div className="w-full flex">
          <div className=" w-full md:w-[58.3333%] relative">
            <HostedBy
              property_type={listingDetails?.property_type}
              bathrooms={listingDetails?.bathrooms}
              beds={listingDetails?.beds}
              bedroom={listingDetails?.bedroom}
              cancelPolicy={listingDetails?.cancelPolicy}
              guest_choice={listingDetails?.guest_choice}
              guest={listingDetails?.guest}
              hostHomeDescriptions={listingDetails?.hosthomedescriptions} // Pass the array as a prop
            />{" "}
            <div className="  md:hidden relative mr-0 ">
              <ListingForm />
            </div>
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <HostProfilePreview />
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <AboutProperty
              description={listingDetails?.description}
              address={listingDetails?.address}
            />
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <HouseRules
              checkin={listingDetails?.checkin}
              guest={listingDetails?.guest}
              cancelPolicy={listingDetails?.cancelPolicy}
              rules={listingDetails?.rules}
              // Add other relevant props here
            />
          </div>
          <div className=" md:ml-[8.33333%] md:w-[33.33333%] hidden md:block relative mr-0 ">
            <ListingForm
              price={listingDetails?.price}
              reservations={listingDetails?.reservations}
              reservation={listingDetails?.reservation}
              guest={listingDetails?.guest}
            />
          </div>
        </div>
        <Amenities />
        <Testimonial />
        <ListingMap />

        <BottomNavigation />
      </div>
    </div>
  );
};

export default ListingInfoMain;
