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
import { Spin } from "antd";
import { useDateContext } from "../ContextProvider/BookingInfo";
const ListingInfoMain = () => {
  const { id } = useParams();
  const [listingDetails, setListingDetails] = useState(null);
  const [refreshed, setRefreshed] = useState(false);

  console.log(id);
  const {
    setTitle,
    setCancellationPolicy,
    setAddress,
    setPhoto,
    setApartment,
    setUser,
    setDiscounts,
  } = useDateContext();

  const [hostId, setHostId] = useState(null); // State for hostId

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/user");
        setUser(response.data.id);
        setHostId(response.data.id);

        console.log(response.data.id);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchListingDetails = async () => {
      try {
        const response = await Axios.get(`showGuestHome/${id}`);
        setListingDetails(response.data.data);
        setApartment(id); // Set the ID parameter to the apartment state
        setUser(response.data.data.user.id);
        setHostId(response.data.data.user.id);
        setTitle(response.data.data.title);
        setCancellationPolicy(response.data.data.cancelPolicy);
        setAddress(response.data.data.address);
        setPhoto(response.data.data.hosthomephotos);
        setDiscounts(response.data.data.discounts);
        console.log(response.data.data);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      }
    };

    fetchListingDetails();
  }, [id]);

  const recordHostHomeView = async (hostHomeId, hostId) => {
    try {
      const response = await Axios.get(`/hostHomeView/${hostHomeId}/${hostId}`);
      console.log("Host home view recorded successfully:", response.data);
    } catch (error) {
      console.error("Error recording host home view:", error);
    }
  };

  console.log(hostId);

  useEffect(() => {
    if (hostId) {
      recordHostHomeView(id, hostId);
    }
  }, [hostId]);

  if (!listingDetails) {
    // Loading state or return null
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Spin size="large" />
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
              <ListingForm
                id={id}
                price={listingDetails?.price}
                reservations={listingDetails?.reservations}
                reservation={listingDetails?.reservation}
                guest={listingDetails?.guest}
                max_nights={listingDetails?.max_nights}
                min_nights={listingDetails?.min_nights}
                preparation_time={listingDetails?.preparation_time}
                availability_window={listingDetails?.availability_window}
                advance_notice={listingDetails?.advance_notice}
                hosthomecustomdiscounts={listingDetails?.hosthomecustomdiscounts}
                reservedPricesForCertainDay={listingDetails?.reservedPricesForCertainDay}
                weekend={listingDetails?.weekend}
              />
            </div>
            <hr className="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
            <HostProfilePreview
              userId={listingDetails?.user?.id || ""}
              userProfilePicture={listingDetails?.user?.profilePicture || ""}
              userRating={listingDetails?.user?.rating || 0}
              userReviews={listingDetails?.user?.reviews || 0}
              successfulCheckOut={listingDetails?.user?.successfulCheckOut || 0}
              totalHomes={listingDetails?.user?.totalHomes || 0}
              yearsOfHosting={listingDetails?.user?.yearsOfHosting || "N/A"}
              userName={listingDetails?.user?.name || ""}
            />
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
              id={id}
              price={listingDetails?.price}
              reservations={listingDetails?.reservations}
              reservation={listingDetails?.reservation}
              guest={listingDetails?.guest}
              max_nights={listingDetails?.max_nights}
              min_nights={listingDetails?.min_nights}
              preparation_time={listingDetails?.preparation_time}
              availability_window={listingDetails?.availability_window}
              advance_notice={listingDetails?.advance_notice}
              hosthomecustomdiscounts={listingDetails?.hosthomecustomdiscounts}
              reservedPricesForCertainDay={listingDetails?.reservedPricesForCertainDay}
              weekend={listingDetails?.weekend}

            />
          </div>
        </div>
        <Amenities amenities={listingDetails?.amenities} />
        <Testimonial reviews={listingDetails?.reviews} />
        <ListingMap />

        <BottomNavigation />
      </div>
    </div>
  );
};

export default ListingInfoMain;
