import React from "react";

const HostedBy = (props) => {
  const {
    property_type,
    bathrooms,
    beds,
    bedroom,
    cancelPolicy,
    guest_choice,
    guest,
    hostHomeDescriptions, // Add this line to receive the new prop
  } = props;
  const ListingCategory = "Room in a townhouse";
  const Host = "Christi-Anna";

  const room_info = [
    { id: 1, text: property_type },
    { id: 2, text: guest_choice },
    // { id: 4,  text:"Keynotes & Trainings"},
    // { id: 5,  text:"Test, Quizzes & Exams"},

    // it should have a "url" object aswell for Svg images
  ];
  const descriptionItems = hostHomeDescriptions.map((description) => (
    <li key={description.id}>{description.description}</li>
  )); // Rooms Like 2 bedroom, living room, 3 bath room , 2 toilet
  const Rooms = room_info.map((amenity) => (
    <li
      className="flex flex-nowrap content-normal   flex-col p-4  gap-4 justify-between   
                lg:justify-normal  lg:items-center  lg:flex-row   min-h-[72px]
                rounded-3xl border lg:py-4 lg:px-6  "
      key={amenity.id}
    >
      <div className="   ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,
                    20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,
                    1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,
                    4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z"
          />
        </svg>
      </div>
      <div className="  overflow-hidden text-ellipsis box-border block  ">
        <div className=" text-xs lg:text-sm overflow-clip    font-semibold ">
          {amenity.text}
        </div>
      </div>
    </li>
  ));

  // Perks Like Khalifa view , Cinema etc

  const perks_info = [
    {
      id: 1,
      text: "  Home Descriptions      ",
      description: descriptionItems,
    },
    {
      id: 2,
      text: guest_choice,
      description: (() => {
        switch (guest_choice) {
          case "An entire place":
            return "Guests have the whole place to themselves.";
          case "A room":
            return "Guests have the whole place to themselves.";
          case "A shared room":
            return "Guests have the whole place to themselves.";
          default:
            return "Cancellation policy information not available.";
        }
      })(),
    },
    {
      id: 3,
      text: "Cancellation Policy",
      description: (() => {
        switch (cancelPolicy) {
          case "Strict Cancellation Policy":
            return "Cancellation after booking, guest will be refunded 50% of their total booking amount.";
          case "Moderate Cancellation Policy":
            return "Cancellation after booking, guest will be refunded 70% of their total booking amount.";
          case "Flexible Cancellation Policy":
            return "Cancelling within 48 hours of booking is free, and guest will have a full refund of their total booking amount. Cancellation after 48 hours, guest will be refunded 70% of their total booking amount.";
          default:
            return "Cancellation policy information not available.";
        }
      })(),
    },
  ];

  const perks = perks_info.map((perk) => (
    <div key={perk.id} className="flex box-border ">
      <div className=" shrink-0 min-w-[24px]  block ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24px"
          height="24px"
        >
          <path
            d="M21,14V15C21,16.91 19.93,18.57 18.35,19.41L19,22H17L16.5,20C16.33,20 16.17,
                    20 16,20H8C7.83,20 7.67,20 7.5,20L7,22H5L5.65,19.41C4.07,18.57 3,16.91 3,15V14H2V12H20V5A1,
                    1 0 0,0 19,4C18.5,4 18.12,4.34 18,4.79C18.63,5.33 19,6.13 19,7H13A3,3 0 0,1 16,4C16.06,4 16.11,
                    4 16.17,4C16.58,2.84 17.69,2 19,2A3,3 0 0,1 22,5V14H21V14M19,14H5V15A3,3 0 0,0 8,18H16A3,3 0 0,0 19,15V14Z"
          />
        </svg>
      </div>
      <div className=" ml-4 block ">
        <div className=" text-base font-[500] ">{perk.text}</div>
        <div className=" text-sm  ">{perk.description}</div>
      </div>
    </div>
  ));

  return (
    <div className="w-full">
      <div className=" border-b border-t lg:border-t-0 py-6 lg:pt-0 w-full">
        <div className="flex gap-4 items-start w-full break-words justify-between flex-row mb-4  lg:mb-6 ">
          {/* <div className=" text-2xl w-[90%]  font-semibold block box-border  bg-white "><h1>{ListingCategory} by {Host}</h1></div> */}
          <div className="  block box-border  bg-white ">
            <h1 className="text-2xl   font-semibold">Room & bedding</h1>
            <div className="flex gap-2 font-extralight flex-wrap text-lg text-gray-500">
              <p>{guest} Guest</p>
              <p>{bathrooms} bathrooms</p>
              <p>{beds} beds</p>
              <p className="">{bedroom} bedrooms</p>
            </div>
          </div>

          {/* <div>
                        <div className=" w-[48px] h-[48px]  overflow-hidden rounded-full "> 
                        <img src="https://a0.muscache.com/im/pictures/user/82130759-fbba-4012-ac60-51d5b0e4801e.jpg?im_w=240"   /> </div> 
                    </div> */}
        </div>
        <ul className=" example grid grid-cols-3  w-full gap-2 overflow-x-scroll list-disc box-border grid-rows-1   ">
          {Rooms}
        </ul>
      </div>

      <div className="Perks py-8 block box-border  mb-6  ">
        <div className=" flex flex-col gap-6 box-border ">{perks}</div>
      </div>
    </div>
  );
};

export default HostedBy;

// border-radius: 50px;
// overflow: hidden;
// padding: 0px;
// width: 65px;
//   height: 65px;
