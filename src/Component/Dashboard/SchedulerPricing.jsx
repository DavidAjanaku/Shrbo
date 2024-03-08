import React, { useState, useEffect } from "react";
import PricingModal from "./PricingModal";
import DiscountCustomModal from "./DiscountCustomModal";
import axios from "../../Axios";


const Pricing = ({
  selectedHouse,
  isEditingPrice,
  editedPrice,
  setEditedPrice,
  onEditPrice,
  onSavePrice,
  onPriceChange,
  selectedDate,
  blockingMode,
  selectedDatePrice,
  showWeeklyDiscountDetails,
  handleToggleWeeklyDetails,
  fetch,
}) => {
  // Define the apartment data
  const apartments = {
    "Lekki Admiralty": {
      basePrice: "₦42",
      customWeekendPrice: "Add",
      weeklyDiscount: "10%",
      weeklyAverage: "₦265000",
      monthlyDiscount: "20%",
      monthlyAverage: "₦265000",
      moreDiscounts: "Early bird, last-minute, trip length",
    },
    "Lekki Phase 1": {
      basePrice: "₦50000",
      customWeekendPrice: "Add",
      weeklyDiscount: "15%",
      weeklyAverage: "₦300000",
      monthlyDiscount: "25%",
      monthlyAverage: "₦300000",
      moreDiscounts: "Early bird, last-minute, trip length",
    },
    "Lekki Units square": {
      basePrice: "₦40005",
      customWeekendPrice: "Add",
      weeklyDiscount: "12%",
      weeklyAverage: "₦200080",
      monthlyDiscount: "22%",
      monthlyAverage: "₦200080",
      moreDiscounts: "Early bird, last-minute, trip length",
    },
  };

  const [discountModalVisible, setDiscountModalVisible] = useState(false);
  const [pricingModalVisible, setPricingModalVisible] = useState(false);
  const [discountDuration, setDiscountDuration] = useState(""); // Store the selected discount duration
  const [discountPercentage, setDiscountPercentage] = useState(""); // Store the discount percentage
  const [weeklyDiscount, setWeeklyDiscount] = useState(""); // Store the weekly discount
  const [monthlyDiscount, setMonthlyDiscount] = useState("");
  const [type, setType] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [weekendPrice, setWeekendPrice] = useState("");
  const [price,setPrice]=useState(""); // price sent to the price modal

  const selectedApartment = selectedHouse;

  const clearInputValue = () => {
    onPriceChange({ target: { value: "" } });
  };

  const showDiscountModal = (type) => {
    setDiscountType(type);
    setCustomModalVisible(true); // Set the custom modal to be visible
  };

  const showPricingModal = (type) => {
    setPricingModalVisible(true); // Set the custom modal to be visible
    setType(type);

    
    if (type === "Custom Weekend Price") {
      setPrice(selectedApartment.customWeekendPrice)
      
      
    } else if (type === "Per night") {
      setPrice(selectedApartment.basePrice)
    
    }



  };

  const hidePricingModal = () => {
    setPricingModalVisible(false); // Set the custom modal to be visible
  };

  const hideDiscountModal = () => {
    setDiscountModalVisible(false);
  };

  const isWeeklyDiscountApplicable = () => {
    // Calculate the number of selected nights
    const numberOfNights = 7;
    return numberOfNights >= 7; // Display the discount if the duration is 7 nights or more
  };

  const [isCustomModalVisible, setCustomModalVisible] = useState(false);

  // ... other code

  const showCustomModal = () => {
    setCustomModalVisible(true);
  };

  const hideCustomModal = () => {
    setCustomModalVisible(false);
  };

  const saveDiscountSettings = (discount) => {
    // Handle saving the discount (e.g., updating state or making API requests)
    // Here, `discount` contains the calculated discount (e.g., "10%")
  };




  const extractPercentage = (discountString) => {
    const lowercasedDiscount = discountString.toLowerCase();


    const percentageMatch = lowercasedDiscount.match(/(\d+)%/);
    return percentageMatch ? percentageMatch[0] : null;


  };

  const savePrice = async (price, date) => {

   

    const id =selectedApartment.id;


    if (type === "Custom Weekend Price") {
      setWeekendPrice(price);
      await axios.put(`/schduler/host-homes/${id}/edit-weekend-price`, { price }).then(

      ).catch(err => {
        console.log(err)
        setWeekendPrice(selectedApartment.customWeekendPrice != null ? selectedApartment.customWeekendPrice : selectedApartment.basePrice)
      });

    } else if (type === "Per night") {
      setBasePrice(price);
      setEditedPrice(price) /// for The calender price to change
      await axios.post(`/schduler/host-homes/${id}/edit-price`, { price, date:(date?date : "") }).then(response=>{

        fetch(id);

      }).catch(err => {
        console.log(err)
        setBasePrice(selectedApartment.basePrice)
        setEditedPrice(selectedApartment.basePrice)  /// for The calender price to change
      });


    }


  }

  useEffect(()=>{

    if(selectedHouse){

      setBasePrice(selectedHouse.basePrice);
      
       setWeekendPrice(selectedHouse.customWeekendPrice != null ? selectedHouse.customWeekendPrice : selectedHouse.basePrice);
      
    }
    
  },[selectedHouse]);

 const formatAmountWithCommas = (amount) => {
    // Convert the amount to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = amount.toString().split('.');

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts with a dot if there is a decimal part
    const formattedAmount = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedAmount;
  }



  return (
    <div className="block box-border  overflow-y-scroll example pb-32">
      {selectedApartment ? (
        <div className="block box-border my-5 min-[1128px]:mb-4">
          <div className="box-border flex justify-between items-baseline mb-6">
            <span>
              <h2 className="m-0 p-0 text-2xl block box-border">
                <div className="min-[1128px]:text-lg font-semibold capitalize">
                  {selectedApartment.name}
                </div>
              </h2>
            </span>

            <div className="block box-border uppercase font-semibold text-xs pr-[10px]">
              <button className="bg-transparent cursor-pointer m-0 p-0 rounded-md underline">
                NGR
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4 relative">
            <h1 className="my-2 font-bold text-2xl">Base Price</h1>

            <div className="cursor-pointer w-full h-full outline-none">
              <div className="space-y-4">
                <button className="w-full text-left " onClick={() => { showPricingModal("Per night") }}>
                  <div className="pointer p-4 rounded-2xl border">

                    <div>
                      <div className="font-medium mb-2 mr-1 text-sm">Per night</div>
                      <div className="h-auto visible w-full">
                        <div className="text-3xl break-keep inline-block font-extrabold">
                          <div className="block">₦{formatAmountWithCommas(basePrice)}</div>
                          {/* {editedPrice} */}
                        </div>
                        {/* ... other code ... */}
                      </div>
                    </div>

                  </div>
                </button>

                <button className="w-full text-left " onClick={() => { showPricingModal("Custom Weekend Price") }}>
                  <div className="pointer p-4 rounded-2xl border">

                    <div>
                      <div className="font-medium mb-2 mr-1 text-sm">Custom Weekend Price</div>
                      <div className="h-auto visible w-full">
                        <div className="text-3xl break-keep inline-block font-extrabold">
                          <div className="block">₦{weekendPrice?formatAmountWithCommas(weekendPrice):formatAmountWithCommas(basePrice)}</div>
                          {/* {editedPrice} */}
                        </div>
                        {/* ... other code ... */}
                      </div>
                    </div>

                  </div>
                </button>
              </div>

              <br />
              <h1 className="mt-2 font-bold text-2xl">Discount</h1>
              <p className="mb-2 font-light">Add a discount based on the duration of stay </p>
              <div className="space-y-3">
                <div
                  className="pointer p-4 rounded-2xl border"
                  onClick={()=>{ showDiscountModal("Weekly")}}
                >
                  <div>
                    <div className="font-medium mb-2 mr-1 text-sm">Weekly</div>
                    <p className="text-gray-400">For 7 nights or more</p>
                    <div className="h-auto visible w-full">
                      <div className="text-3xl break-keep inline-block font-extrabold">
                        {selectedApartment.weeklyDiscount ? extractPercentage(selectedApartment.weeklyDiscount.discount) : '0%'}
                      </div>
                      {isEditingPrice ? (
                        <div>{/* ... other code ... */}</div>
                      ) : (
                        <div>
                          <div className="text-gray-400">
                            Weekend Average:{" "}
                            <span className="font-medium">₦900000</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className="pointer p-6 rounded-2xl border"
                  onClick={()=>{ showDiscountModal("Monthly")}}
                >
                  <div>
                    <div className="font-medium mb-2 mr-1 text-sm">Monthly</div>
                    <p className="text-gray-400">For 28 nights or more</p>
                    <div className="h-auto visible w-full">
                      <div className="text-3xl break-keep inline-block font-extrabold">
                        {selectedApartment.monthlyDiscount ? extractPercentage(selectedApartment.monthlyDiscount.discount) : '0%'}
                      </div>
                      {isEditingPrice ? (
                        <div>{/* ... other code ... */}</div>
                      ) : (
                        <div>
                          <div className="text-gray-400">
                            Monthly Average:{" "}
                            <span className="font-medium">₦9000000</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <DiscountCustomModal
              visible={isCustomModalVisible}
              onClose={hideCustomModal}
              onSubmit={saveDiscountSettings}
              discountType={discountType}
            />
            <PricingModal
              visible={pricingModalVisible}
              onClose={hidePricingModal}
              showBlocker={false}
              title={type}
              onSave={savePrice}
              price={price}
            />
          </div>
        </div>
      ) : (
        <div>Select an apartment/house to view details</div>
      )}
    </div>
  );
};

export default Pricing;
