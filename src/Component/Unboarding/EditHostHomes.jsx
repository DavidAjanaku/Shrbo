import React, { useState, useRef, useEffect } from "react";
import { FaHome, FaHotel, FaBed, FaBuilding, FaTrash } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';

import { Spin } from "antd";
import { useParams } from "react-router-dom";

import AddressForm from "../AddressFrom";
import Axios from "../../Axios";
import { data } from "autoprefixer";
import { useStateContext } from "../../ContextProvider/ContextProvider";
import { Link } from "react-router-dom";
export default function HostHome({ match }) {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [step, setStep] = useState(0);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [houseTitle, setHouseTitle] = useState("");
  const [additionalRules, setAdditionalRules] = useState("");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00 PM");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedPrivacyType, setSelectedPrivacyType] = useState(null);
  const [selectedInstantBookType, setSelectedInstantBookType] = useState(null);
  const [initiallySelectedType, setInitiallySelectedType] = useState(null);

  const [selectedHouseType, setSelectedHouseType] = useState(null);
  const [selectedHostType, setSelectedHostType] = useState(null);
  const [selectedCautionTypes, setSelectedCautionTypes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [visiblities, setVisiblities] = useState([]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const [selectedCautionType, setSelectedCautionType] = useState([]);
  const [selectedWelcomeVisibility, setSelectedWelcomeVisibility] = useState(
    []
  );

  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [houseDescriptionDetails, setHouseDescriptionDetails] = useState("");
  const [enteredAddress, setEnteredAddress] = useState("");
  const [selectedHouseDescriptions, setSelectedHouseDescriptions] = useState(
    []
  );
  const [selectedCancellationPolicy, setSelectedCancellationPolicy] =
    useState("");

  const [isLoading, setIsLoading] = useState(true);

  const { token } = useStateContext();

  const goLogin = useRef(null);

  const [formData, setFormData] = useState({
    welcomeTypes: [],
    housePrice: 0,
    houseDiscount: [],
    houseRules: [],
    additionalRules: [], // Add additionalRules field here

    hostType: "",
    propertyFeatures: [],
    checkInTime: "",
    cancellationPolicy: "",
    securityDeposit: 0,
  });
  const navigate = useNavigate();


  const [apartment, setApartment] = useState(null);

  const { id } = useParams();
  // Rest of your code

  useEffect(() => {
    const apartmentId = id;

    setIsLoading(true); // Set loading to true when starting to fetch data

    Axios.get(`/hosthomes/${apartmentId}`)
      .then((response) => {
        setApartment(response.data.data);
        console.log(response.data.data);
        setHouseDescriptionDetails(response.data.data.description || ""); // Corrected this line
        setHousePrice(response.data.data.price || ""); // Corrected this line
        setSelectedHostType(response.data.data.host_type || null);
        setSelectedCautionTypes(response.data.data.caution_types || []);
        setSelectedCancellationPolicy(response.data.data.cancelPolicy || "");
        setSecurityDeposit(response.data.data.securityDeposit || "");
      })
      .catch((error) => {
        console.log("Error fetching hosthome details:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set loading to false regardless of success or error
      });
  }, [id]);

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const handleSave = () => {
    // You can send the selected time to your backend or perform any other action here
    console.log("Selected check-in time: ", selectedTime);
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      // No file selected
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      alert("Video size exceeds 20MB limit.");
      return;
    }

    const video = document.createElement("video");

    video.onloadedmetadata = () => {
      if (video.duration > 60) {
        alert("Video duration exceeds 1 minute limit.");
      } else {
        setApartment((prev) => ({
          ...prev,
          hosthomevideo: URL.createObjectURL(file),
        }));
        setSelectedVideo(file);

        // Remove existing video if there is one
        if (prev.hosthomevideo) {
          // Assuming hosthomevideo is a URL, you may need to adjust accordingly
          URL.revokeObjectURL(prev.hosthomevideo);
        }
      }
    };

    video.src = URL.createObjectURL(file);
  };

  const handleAddressChange = (address) => {
    setEnteredAddress(address);
  };

  const [housePrice, setHousePrice] = useState(""); // Add this line for the house price
  const [securityDeposit, setSecurityDeposit] = useState("");

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true); // Set the loader state to true

      const photoBase64Array = apartment.hosthomephotos
  ? await Promise.all(apartment.hosthomephotos.map(async (photo) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        const photoBlob = new Blob([photo], { type: "image/jpeg" }); // Adjust the type based on your image format
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(photoBlob); // Read the Blob as Data URL
      });
    }))
  : [];
      const videoBase64 = apartment.hosthomevideo
      ? await new Promise((resolve) => {
          const reader = new FileReader();
          const videoBlob = new Blob([apartment.hosthomevideo], { type: "video/mp4" }); // Create a Blob from the video data
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(videoBlob); // Read the Blob as Data URL
        })
      : null;

      const selectedDescriptions = apartment.hosthomedescriptions.map(
        (item) => item.description
      );

      const selectedRules = apartment.rules.map((item) => item.rule);

      const selectedReservations = apartment.reservations.map(
        (item) => item.reservation
      );

      const selectedDiscounts = apartment.discounts.map(
        (item) => item.discount
      );
  

      const formDetails = {
        property_type: apartment.property_type,
        guest_choice: apartment.guest_choice,
        address: apartment.address,
        guest: apartment.guest,
        bedrooms: apartment.bedroom,
        beds: apartment.beds,
        bathrooms: apartment.bathrooms,
        amenities: apartment.amenities.map((amenity) => amenity.offer),
        hosthomephotos: photoBase64Array,
        hosthomevideo: videoBase64, // Use the Object URL
        title: apartment.title,
        hosthomedescriptions: selectedDescriptions,
        description: apartment.description,
        reservations: selectedReservations,
        reservation: apartment.reservation,
        price: apartment.price,
        discounts: selectedDiscounts,
        rules: selectedRules,
        additionalRules: apartment.additionalRules,
        host_type: apartment.host_type,
        notice: selectedCautionTypes,
        checkin: selectedTime,
        cancelPolicy: apartment.cancelPolicy,
        securityDeposit: securityDeposit,
    };
      console.log("Form submitted successfully", formDetails);

      // Example Axios post request
      await Axios.post("/hosthomes", formDetails);

      console.log("Form submitted successfully", formDetails);
      navigate('/hosting');

    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false); // Set the loader state back to false, whether the submission was successful or not
    }
  };

  const handleNext = () => {
    if (token) {
      setStep(step + 1);
    } else {
      goLogin.current.click();
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleDecrement = (property) => {
    setApartment((prev) => ({
      ...prev,
      [property]: Math.max(prev[property] - 1, 0),
    }));
  };

  const handleIncrement = (property) => {
    setApartment((prev) => ({
      ...prev,
      [property]: prev[property] + 1,
    }));
  };

  const [hostingType, setHostingType] = useState("private");
  const [propertyFeatures, setPropertyFeatures] = useState({
    securityCamera: false,
    weapons: false,
    dangerousAnimals: false,
  });

  const handleHostingTypeChange = (type) => {
    setHostingType(type);
  };

  const handlePropertyFeatureChange = (feature) => {
    setPropertyFeatures({
      ...propertyFeatures,
      [feature]: !propertyFeatures[feature],
    });
  };

  const [guestDetails, setGuestDetails] = useState({
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  });

  const [discounts, setDiscounts] = useState({
    newListingPromotion: false,
    weeklyDiscount: false,
    monthlyDiscount: false,
  });

  const propertyTypes = [
    { id: "house", label: "House", icon: <FaHome /> },
    { id: "hotel", label: "Hotel", icon: <FaHotel /> },
    { id: "guestHouse", label: "Guest House", icon: <FaBed /> },
    { id: "apartment", label: "Apartment", icon: <FaBuilding /> },
  ];

  const privacyTypes = [
    {
      id: "house",
      label: "An entire place",
      icon: <FaHome />,
      description: "Guests have the whole place to themselves.",
    },
    {
      id: "hotel",
      label: "A room",
      icon: <FaHotel />,
      description: "Guests have the whole place to themselves.",
    },

    {
      id: "guestHouse",
      label: "A shared room",
      icon: <FaBed />,
      description: "Guests have the whole place to themselves.",
    },
  ];

  const houseDescription = [
    {
      id: "peaceful",
      label: "An entire place",
      icon: <FaHome />,
      description: "Guests have the whole place to themselves.",
    },
    {
      id: "unique",
      label: "A room",
      icon: <FaHotel />,
      description: "Guests have the whole place to themselves.",
    },

    {
      id: "family-friendly",
      label: "A shared room",
      icon: <FaBed />,
      description: "Guests have the whole place to themselves.",
    },
    {
      id: "stylish",
      label: "A shared room",
      icon: <FaBed />,
      description: "Guests have the whole place to themselves.",
    },

    {
      id: "central",
      label: "A shared room",
      icon: <FaBed />,
      description: "Guests have the whole place to themselves.",
    },

    {
      id: "spacious",
      label: "A shared room",
      icon: <FaBed />,
      description: "Guests have the whole place to themselves.",
    },
  ];

  const instantBook = [
    {
      id: "Use Instant Book",
      label: "An entire place",
      icon: <FaHome />,
      description: "Guests can book automatically.",
    },
    {
      id: "Approve or decline requests",
      label: "A room",
      icon: <FaHotel />,
      description: "Guests must ask if they can book.",
    },
  ];

  const caution = [
    {
      id: "              Security camera(s) ",
      label: "An entire place",
      icon: <FaHome />,
      description: "Guests can book automatically.",
    },
    {
      id: "              Weapons      ",
      label: "A room",
      icon: <FaHotel />,
      description: "Guests must ask if they can book.",
    },

    {
      id: "              Dangerous Animal      ",
      label: "A room",
      icon: <FaHotel />,
      description: "Guests must ask if they can book.",
    },
  ];

  const amenities = [
    {
      id: "Wifi",
      label: "An entire place",
      icon: <FaHome />,
      description:
        "Get reservations faster when you welcome anyone from the Shbro community.",
    },
    {
      id: "TV",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "Kitchen",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "Washer",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },

    {
      id: "Air conditioning",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "Free parking on premises",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },

    {
      id: "Pool",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "Hot tub",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },

    {
      id: "Fire pit",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "Indoor fireplace",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },

    {
      id: "Smoke Alarm",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "first aid kit",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },

    {
      id: "fire extinguisher",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
    {
      id: "smoke alarm",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
  ];

  const visiblity = [
    {
      id: "Any Shbro guest",
      label: "An entire place",
      icon: <FaHome />,
      description:
        "Get reservations faster when you welcome anyone from the Shbro community.",
    },
    {
      id: "An experienced guest",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
  ];

  const HostType = [
    {
      id: "I'm hosting as a private individual",
      label: "An entire place",
      icon: <FaHome />,
      description:
        "Get reservations faster when you welcome anyone from the Shbro community.",
    },
    {
      id: "I'm hosting as a business",
      label: "A room",
      icon: <FaHotel />,
      description:
        "For your first guest, welcome someone with a good track record on Shbro who can offer tips for how to be a great Host.",
    },
  ];

  const HouseRules = {
    guests: "2 guests maximum",
    pets: "No pets",
    events: "No parties or events",
    smoking: "No smoking",
    partying: "No parties or events",
  };

  const houseDiscount = [
    {
      id: "     20% New listing promotion",
      label: "An entire place",
      icon: <FaHome />,
      description: "Offer 20% off your first 3 bookings",
    },
    {
      id: "    5% Weekly discount",
      label: "A room",
      icon: <FaHotel />,
      description: "For stays of 7 nights or more",
    },
    {
      id: "   10% Monthly discount",
      label: "A room",
      icon: <FaHotel />,
      description: "For stays of 28 nights or more",
    },
  ];

  const cancellationPolicies = [
    {
      id: 1,
      label: "Moderate Cancellation Policy",
      description:
        "Cancellation  after booking, guest will refunded 70% of their total booking amount",
    },
    {
      id: 2,
      label: "Strict Cancellation Policy",
      description:
        "Cancellation after booking, guest will refunded 50% of their total booking amount",
    },
    {
      id: 3,
      label: "Flexible Cancellation Policy",
      description:
        "Cancelling within 48 hours of booking is free and guest will have a full refund of their total booking amount. Hence, cancellation after 48hours, guest will be refunded 70% of their total booking amount. ",
    },
  ];

  const handleTypeSelection = (selectedType) => {
    setApartment((prev) => ({
      ...prev,
      property_type: selectedType,
    }));
  };

  const handlePrivacyTypeSelection = (selectedType) => {
    setApartment((prev) => ({
      ...prev,
      guest_choice: selectedType,
    }));
  };

  const handleAmenitySelection = (amenityId) => {
    setApartment((prev) => {
      const isAmenitySelected = prev.amenities.some(
        (amenity) => amenity.offer === amenityId
      );

      if (isAmenitySelected) {
        // If amenity is already selected, remove it
        return {
          ...prev,
          amenities: prev.amenities.filter(
            (amenity) => amenity.offer !== amenityId
          ),
        };
      } else {
        // If amenity is not selected, add it
        return {
          ...prev,
          amenities: [...prev.amenities, { offer: amenityId }],
        };
      }
    });
  };

  const updateSelection = (array = [], itemId) => {
    // Logic to toggle the selection status of the item in the array
    if (array.includes(itemId)) {
      return array.filter((selectedId) => selectedId !== itemId);
    } else {
      return [...array, itemId];
    }
  };

  const handleRemoveVideo = () => {
    // Implement the logic to remove the selected video
    setSelectedVideo(null); // Set the selectedVideo state to null or an appropriate initial value
  };

  const toggleSelection = (array, itemId) => {
    // Logic to toggle the selection status of the item in the array
    if (array.includes(itemId)) {
      return array.filter((selectedId) => selectedId !== itemId);
    } else {
      return [...array, itemId];
    }
  };
  const handleHouseDescriptionSelection = (selectedId) => {
    // Check if the selectedId is already in the array
    if (selectedHouseDescriptions.includes(selectedId)) {
      // If yes, remove it
      setSelectedHouseDescriptions((prevSelected) =>
        prevSelected.filter((id) => id !== selectedId)
      );
    } else {
      // If no, add it
      setSelectedHouseDescriptions((prevSelected) => [
        ...prevSelected,
        selectedId,
      ]);
    }
  };

  useEffect(() => {
    // Set initially selected visibility from API
    // Assuming `apartment` is your API data structure
    if (apartment && apartment.reservations) {
      const initiallySelected = apartment.reservations.map(
        (reservation) => reservation.reservation
      );
      setSelectedWelcomeVisibility(initiallySelected);
    }
  }, [apartment]);

  const handleWelcomeVisibilitySelection = (selectedId) => {
    // Toggle selection
    setSelectedWelcomeVisibility((prev) => {
      if (prev.includes(selectedId)) {
        // Unselect if already selected
        return prev.filter((id) => id !== selectedId);
      } else {
        // Select if not selected
        return [...prev, selectedId];
      }
    });
  };

  useEffect(() => {
    // Set initially selected type from API
    // Assuming `apartment` is your API data structure
    if (apartment && apartment.reservation) {
      setInitiallySelectedType(apartment.reservation);
      setSelectedInstantBookType(apartment.reservation);
    }
  }, [apartment]);

  const handleInstantBookSelection = (selectedId) => {
    setSelectedInstantBookType(selectedId);
  };

  const handleCancellationPolicySelection = (selectedPolicy) => {
    setSelectedCancellationPolicy(selectedPolicy);
  };

  const handleDiscountSelection = (selectedId, isSelected, matchingDiscount) => {
    if (isSelected) {
      // Deselect the discount if it was selected
      setApartment((prev) => ({
        ...prev,
        discounts: prev.discounts.filter(
          (discount) => discount.discount.trim() !== selectedId.trim()
        ),
      }));
    } else {
      // Select the discount if it was not selected
      setApartment((prev) => ({
        ...prev,
        discounts: [
          ...prev.discounts.filter(
            (discount) => discount.discount.trim() !== selectedId.trim()
          ),
          { discount: selectedId.trim(), value: matchingDiscount?.value || 0 },
        ],
      }));
    }
  };
  

  const handleRuleSelection = (rule) => {
    setSelectedRules((prevSelectedRules) => {
      const updatedRules = prevSelectedRules.includes(rule)
        ? prevSelectedRules.filter((selectedRule) => selectedRule !== rule)
        : [...prevSelectedRules, rule];
  
      // Update additionalRules state
      setAdditionalRules(updatedRules);
  
      return updatedRules;
    });
  };
  

  const handleHouseTypeSelection = (typeId) => {
    setSelectedHouseType(typeId);
  };

  const handleHostTypeSelection = (typeId) => {
    setSelectedHostType(typeId);
  };
  const handleCautionTypeSelection = (id) => {
    setSelectedCautionTypes((prevSelectedTypes) => {
      const newSelectedTypes = prevSelectedTypes.includes(id)
        ? prevSelectedTypes.filter((type) => type !== id)
        : [...prevSelectedTypes, id];
  
      console.log('Selected Caution Types:', newSelectedTypes);
      return newSelectedTypes;
    });
  };

  const addressFields = [
    { id: "street", label: "Street Address" },
    { id: "city", label: "City" },
    { id: "state", label: "State" },
    { id: "zipcode", label: "Zip Code" },
  ];

  // Create state to store address information
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    const newImages = [];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      reader.onload = async (event) => {
        const base64Image = event.target.result;
        newImages.push({ id: Date.now(), src: base64Image });
  
        if (newImages.length === files.length) {
          // Directly update the hosthomephotos array in the state
          setUploadedImages((prevImages) => [...prevImages, ...newImages]);
  
          // If you need to submit the form immediately after all images are converted,
          // you can call handleSubmit here.
          // await handleSubmit();
        }
      };
  
      reader.readAsDataURL(file);
    }
  
    // Reset the file input field
    setFileInputKey(fileInputKey + 1);
  };
  

  const handleImageDelete = (id) => {
    // Filter out the deleted image from uploadedImages state
    setUploadedImages((prevImages) =>
      prevImages.filter((image) => image.id !== id)
    );

    // If apartment.hosthomephotos is an array, filter out the deleted image from it
    setApartment((prevApartment) => {
      if (Array.isArray(prevApartment.hosthomephotos)) {
        const updatedPhotos = prevApartment.hosthomephotos.filter(
          (photo) => photo.id !== id
        );
        return { ...prevApartment, hosthomephotos: updatedPhotos };
      }
      return prevApartment;
    });
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div className="mx-auto flex justify-center p-4">
            {isLoading ? (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bottom-0  z-50">
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{
                        fontSize: 50,
                      }}
                      spin
                    />
                  }
                />
              </div>
            ) : (
              // Render your component once data is loaded
              <div className="overflow-auto">
                <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                  <h1 className="text-6xl">
                    Which of these best describes your place?
                  </h1>
                </div>
                <div className="pb-32">
                  <div className="space-y-4">
                    <h3 className="text-xl">Property Types</h3>
                    <div className="flex flex-wrap w-full">
                      {propertyTypes.map((type) => (
                        <div
                          key={type.id}
                          className={`property-type h-24 w-32 m-3 flex ${
                            apartment?.property_type === type.id
                              ? "bg-orange-300 border-2 border-black text-white"
                              : "bg-gray-200 text-black"
                          } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                          onClick={() =>
                            handleTypeSelection(
                              type.id === apartment?.property_type
                                ? null
                                : type.id
                            )
                          }
                        >
                          <span className="mr-2 text-2xl">{type.icon}</span>
                          {type.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className=" mx-auto  flex justify-center p-4">
            <div className="  overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">
                  What type of place will guests have?
                </h1>
              </div>
              <div className="pb-32">
                <div className=" space-y-4">
                  <div className="  w-full">
                    {privacyTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type m-3 flex ${
                          apartment?.guest_choice === type.id
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() =>
                          handlePrivacyTypeSelection(
                            type.id === apartment?.guest_choice ? null : type.id
                          )
                        }
                      >
                        <span className="mr-2 text-2xl mb-3">{type.icon}</span>
                        {type.label}
                        <p>{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <AddressForm
            onAddressChange={handleAddressChange}
            defaultAddress={apartment?.address}
          />
        );

      case 3:
        return (
          <div className=" mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">Share some basics about your place</h1>
                <p className="text-gray-400 text-lg mt-10">
                  You'll add more details later, like bed types.
                </p>
              </div>
              <div className="pb-32">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-col">
                      <span className="text-lg">Guests:</span> <br />
                      <p className="text-gray-400">Max number of guests</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement("guest")}
                        type="button"
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        -
                      </button>
                      <input
                        type="button"
                        x
                        className="w-8 text-center"
                        value={apartment.guest}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement("guest")}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-col">
                      <span className="text-lg">Bedrooms:</span> <br />
                      <p className="text-gray-400">Number of bedrooms</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleDecrement("bedroom")}
                        type="button"
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        -
                      </button>
                      <input
                        type="button"
                        className="w-8 text-center"
                        value={apartment.bedroom}
                        readOnly
                      />
                      <button
                        onClick={() => handleIncrement("bedroom")}
                        type="button"
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-col">
                      <span className="text-lg">Beds:</span> <br />
                      <p className="text-gray-400">Number of beds</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleDecrement("beds")}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-8 text-center"
                        value={apartment.beds}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement("beds")}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-col">
                      <span className="text-lg">Bathrooms:</span> <br />
                      <p className="text-gray-400">Number of bathrooms</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() => handleDecrement("bathrooms")}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        -
                      </button>
                      <input
                        type="button"
                        className="w-8 text-center"
                        value={apartment.bathrooms}
                        readOnly
                      />
                      <button
                        type="button"
                        onClick={() => handleIncrement("bathrooms")}
                        className="bg-gray-200 text-gray-700 rounded-full px-2"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">
                  Tell guests what your place has to offer
                </h1>
                <p className="text-gray-400 mt-10 text-lg">
                  You can add more amenities after you publish your listing.
                </p>
              </div>
              <div className="pb-32">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Amenities</h3>
                  <div className="flex flex-wrap w-full">
                    {amenities.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type h-24 w-32 m-3 flex ${
                          apartment?.amenities.some(
                            (amenity) => amenity.offer === type.id
                          )
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() => handleAmenitySelection(type.id)}
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">Add some photos of your house</h1>
                <p className="text-gray-400 mt-10">
                  You can add more or make changes later.
                </p>
              </div>
              <div className="pb-32">
                <div className="text-center">
                  <div className="border-2 border-dashed border-gray-300 p-8 my-6">
                    <p className="text-gray-400 mb-4">Drag your photos here</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      key={fileInputKey}
                    />
                  </div>
                  <p className="text-gray-400">Choose at least 5 photos</p>
                </div>
                <div className="flex flex-wrap mt-6">
                  {uploadedImages.map((image) => (
                    <div key={image.id} className="relative p-2">
                      <img
                        src={image.src}
                        alt="Houses"
                        className="w-64 object-cover h-64"
                      />
                      <button
                        onClick={() => handleImageDelete(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}

                  {/* Display existing photos from fetched data */}
                  {Array.isArray(apartment?.hosthomephotos) &&
                    apartment.hosthomephotos.map((photo) => (
                      <div key={photo.id} className="relative p-2">
                        <img
                          src={photo}
                          alt="Houses"
                          className="w-64 object-cover h-64"
                        />
                        <button
                          onClick={() => handleImageDelete(photo.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-300"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Step for hosting type and property features
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">Upload Video Apartment on Shbro</h1>
                <p className="text-gray-400 mt-10">
                  Gives you a better chance of getting guests
                </p>
              </div>
              <div className="bg-white border p-4 rounded-lg shadow-md max-w-md mx-auto mt-8">
                <h1 className="text-2xl font-semibold mb-4">Upload Video</h1>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="mb-4"
                />
                <p className="text-slate-500">Maximum file size: 20MB</p>
                <p className="text-slate-500">Maximum duration: 1 minute</p>

                {selectedVideo && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold mb-2">
                      Selected Video: {selectedVideo.name}
                    </p>
                    <p className="text-slate-500">
                      Size: {(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                    <video controls className="mt-2">
                      <source src={apartment.hosthomevideo} type="video/mp4" />
                    </video>
                  </div>
                )}

                {/* Display existing video from fetched data */}
                {apartment.hosthomevideo && (
                  <div className="mt-4">
                    <p className="text-lg font-semibold mb-2">
                      Existing Video: <br />
                      <p className="break-words"> {apartment.hosthomevideo}</p>
                    </p>
                    <video controls className="mt-2">
                      <source src={apartment.hosthomevideo} type="video/mp4" />
                    </video>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 7: // Step for adding a house title
        const maxCharacterCount = 32;
        const currentCharacterCount = apartment.title.length;
        const remainingCharacterCount =
          maxCharacterCount - currentCharacterCount;

        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">Now, let's give your house a title</h1>
                <p className="text-gray-400 mt-10">
                  Short titles work best. Have fun with it—you can always change
                  it later.
                </p>
              </div>
              <div className=" text-center">
                <label htmlFor="houseTitle" className="sr-only">
                  Enter a title for your house
                </label>
                <input
                  type="text"
                  id="houseTitle"
                  className="border rounded-lg px-4 py-2 w-2/3 text-lg w-full"
                  placeholder="Enter a title for your house"
                  value={apartment.title}
                  onChange={(e) => {
                    const inputText = e.target.value;
                    if (inputText.length <= maxCharacterCount) {
                      setApartment((prev) => ({
                        ...prev,
                        title: inputText,
                      }));
                    }
                  }}
                />

                <p className="text-gray-400 mt-4">
                  {currentCharacterCount}/{maxCharacterCount} characters left
                </p>
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className=" mx-auto  flex justify-center p-4">
            <div className="  overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">Next, let's describe your house</h1>
                <p className="text-gray-400 mt-10">
                  Choose up to 2 highlights. We'll use these to get your
                  description started.
                </p>
              </div>
              <div className="pb-32">
                <div className=" ">
                  <div className="flex flex-wrap   w-full">
                    {houseDescription.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type h-24 w-32 m-3 flex ${
                          apartment?.hosthomedescriptions.some(
                            (description) => description.description === type.id
                          )
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() => handleHouseDescriptionSelection(type.id)}
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        const maxCharCount = 500;
        const currentCharCount = houseDescriptionDetails.length;
        const remainingCharCount = maxCharCount - currentCharCount;

        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">Create your description</h1>
                <p className="text-gray-400 mt-10">
                  Share what makes your place special.
                </p>
              </div>
              <div className="pb-32 text-center">
                <textarea
                  type="text"
                  className="border rounded-lg px-4 py-2 h-[400px] text-lg w-full"
                  placeholder="Enter a description for your house"
                  value={houseDescriptionDetails}
                  onChange={(e) => {
                    const inputText = e.target.value;
                    if (inputText.length <= maxCharCount) {
                      setHouseDescriptionDetails(inputText);
                    }
                  }}
                />
                <p className="text-gray-400 mt-4">
                  {currentCharCount}/{maxCharCount} characters left
                </p>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">
                  Decide how you’ll confirm reservations
                </h1>
              </div>
              <div className="pb-32">
                <div className="space-y-4">
                  <div className="flex flex-wrap w-full">
                    {instantBook.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type m-3 flex ${
                          selectedInstantBookType === type.id
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() => handleInstantBookSelection(type.id)}
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className=" mx-auto  flex justify-center p-4">
            <div className="  overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">
                  Choose who to welcome for your first reservation
                </h1>
                <p className="text-gray-400 mt-10">
                  After your first guest, anyone can book your place.
                </p>
              </div>
              <div className="pb-32">
                <div className=" space-y-4">
                  <div className="flex flex-wrap   w-full">
                    {visiblity.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type m-3 flex ${
                          selectedWelcomeVisibility.includes(type.id)
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() =>
                          handleWelcomeVisibilitySelection(type.id)
                        }
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 12:
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">Now, set your price</h1>
                <p className="text-gray-400 mt-10">
                  You can change it anytime.
                </p>
              </div>
              <div className="pb-32">
                <div className="text-center">
                  <input
                    type="number"
                    className="border rounded-lg px-4 py-2 w-full text-lg"
                    placeholder="Price per night"
                    value={housePrice} // Update this line to use housePrice instead of apartment.price
                    onChange={(e) => setHousePrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 13: // Step for adding discounts
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-10">
                <h1 className="text-6xl">Add discounts</h1>
                <p>
                  Help your place stand out to get booked faster and earn your
                  first reviews.
                </p>
              </div>
              <div className="pb-32">
                <div className="flex flex-wrap w-full">
                  {houseDiscount.map((type) => {
                    const cleanedTypeId = type.id.trim(); // Remove extra spaces

                    const isSelected = apartment?.discounts.some(
                      (discount) => discount.discount.trim() === cleanedTypeId
                    );

                    const matchingDiscount = apartment?.discounts.find(
                      (discount) => discount.discount.trim() === cleanedTypeId
                    );

                    return (
                      <div
                        key={type.id}
                        className={`property-type m-3 flex ${
                          isSelected
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() => {
                          handleDiscountSelection(
                            type.id,
                            isSelected,
                            matchingDiscount
                          );
                        }}
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.id}
                        <div>{type.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 14: // Step for hosting type and property features
        const additionalRulesFromApartment =
          apartment?.rules.map((r) => r.rule) || [];

        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">Rules</h1>
                <p className="text-gray-400 mt-10">
                  You can change it anytime.
                </p>
              </div>
              <div className="flex">
                {Object.keys(HouseRules).map((rule) => (
                  <div
                    key={rule}
                    className={`property-type m-3 flex ${
                      apartment?.rules.some((r) => r.rule === rule)
                        ? "bg-orange-300 border-2 border-black text-white"
                        : "bg-gray-200 text-black"
                    } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                    onClick={() => handleRuleSelection(rule)}
                  >
                    <span className="mr-2 text-2xl">{rule}</span>
                    {HouseRules[rule]}
                  </div>
                ))}
              </div>

              <div className="md:flex md:justify-center md:flex-col">
                <h1 className="text-2xl">Additional Rules</h1>
              </div>
              <div className="pb-32">
                <div className="space-y-4">
                  <div className="flex flex-wrap w-full"></div>
                </div>
                {additionalRulesFromApartment.length >
                  additionalRules.length && (
                  <div className="px-4">
                    <ul className="list-disc">
                      {/* Display additional rules only if there are more in the apartment object */}
                      {additionalRulesFromApartment
                        .slice(additionalRules.length)
                        .map((rule, index) => (
                          <li key={index}>{rule}</li>
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 15: // Step for hosting type and property features
        return (
          <div className="mx-auto flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">How are you hosting on Shbro?</h1>
              </div>
              <div className="pb-32">
                <div className="space-y-4">
                  <div className="flex flex-wrap w-full">
                    {HostType.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type m-3 flex ${
                          selectedHostType === type.id
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() => handleHostTypeSelection(type.id)}
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="md:flex md:justify-center md:flex-col">
                <h1 className="text-2xl">Does your place have any of these?</h1>
              </div>
              <div className="pb-32">
                <div className="space-y-4">
                  <div className="flex flex-wrap w-full">
                    {caution.map((type) => (
                      <div
                        key={type.id}
                        className={`property-type m-3 flex ${
                          selectedCautionTypes.includes(type.id)
                            ? "bg-orange-300 border-2 border-black text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() => handleCautionTypeSelection(type.id)}
                      >
                        <span className="mr-2 text-2xl">{type.icon}</span>
                        {type.id}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 16: // Step for hosting type and property features
        return (
          <div className=" mx-auto   flex justify-center p-4">
            <div className="  overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">
                  When do you want Guests checking in on Shbro?
                </h1>
              </div>
              <div className="max-w-md mx-auto p-4">
                <h2 className="text-2xl font-semibold mb-4">
                  Set Check-In Time
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="checkInTime"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Check-In Time:
                  </label>
                  <select
                    id="checkInTime"
                    name="checkInTime"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="mt-1 p-2 border rounded-md w-full"
                  >
                    <option value={apartment.checkInTime}>2:00 PM</option>
                    {/* Add more time options as needed */}
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      case 17:
        return (
          <div className="mx-auto md:w-3/4 flex justify-center p-4">
            <div className="overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">Choose Your Cancellation Policy</h1>
                <p className="text-gray-400 mt-10">
                  When you host your home, select the cancellation policy that
                  suits your needs.
                </p>
              </div>
              <div className="pb-32">
                <div className=" space-y-4">
                  <div className="w-full">
                    {cancellationPolicies.map((policy) => (
                      <div
                        key={policy.id}
                        className={`property-type   m-3   flex ${
                          selectedCancellationPolicy === policy.label
                            ? "bg-orange-500 text-white"
                            : "bg-gray-200 text-black"
                        } px-4 py-2 rounded-md cursor-pointer flex-col justify-between`}
                        onClick={() =>
                          handleCancellationPolicySelection(policy.label)
                        }
                      >
                        <span className="mr-2 text-2xl mb-3">
                          {policy.icon}
                        </span>
                        <h1 className="font-bold text-lg my-3">
                          {policy.label}
                        </h1>
                        <p>{policy.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 18:
        return (
          <div className=" mx-auto  flex justify-center p-4">
            {isSubmitting && (
              <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-80 z-50">
                <p className="text-xl text-gray-800">Loading...</p>
              </div>
            )}

            <div className="  overflow-auto">
              <div className="md:flex md:justify-center md:flex-col md:mt-28 mb-20">
                <h1 className="text-6xl">Now, set your Security Deposit</h1>
                <p className="text-gray-400 mt-10">
                  You can change it anytime.
                </p>
                <p className="text-gray-400 mt-10">
                  Adding security depsoit is optional you can choose to leave it
                  blank
                </p>
              </div>
              <div className="pb-32">
                <div className="text-center">
                  <input
                    type="number"
                    className="border rounded-lg px-4 py-2 w-full text-lg"
                    placeholder="Security Deposit"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {renderContent()}
      <div className="bg-orange-400 flex fixed bottom-0 w-full text-center">
        {step > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="text-white  bg-orange-200 w-full p-4"
          >
            Previous
          </button>
        )}
        {step < 18 && (
          <button
            type="button" // Add this line to prevent form submission
            onClick={handleNext}
            className="text-white text-center  bg-orange-400 w-full p-4"
          >
            Next
          </button>
        )}
        {step === 18 && (
          <button
            type="button" // Add this line to prevent form submission
            onClick={handleSubmit}
            className="text-white text-center bg-orange-400 w-full p-4"
          >
            Submit
          </button>
        )}
      </div>
      <Link ref={goLogin} to={"/Login"} />
    </form>
  );
}