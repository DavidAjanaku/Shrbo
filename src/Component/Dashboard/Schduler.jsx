import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Tabs } from "antd";

import multiMonthPlugin from "@fullcalendar/multimonth";
import { IoIosArrowForward } from "react-icons/io";
import HostHeader from "../Navigation/HostHeader";
import HostBottomNavigation from "./HostBottomNavigation";
import { Modal, Select, Input } from "antd";
import CalenderAvailability from "./CalenderAvailability";
import PricingModal from "./PricingModal";
import axios from "../../Axios";
import Pricing from "./SchedulerPricing";

export default class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockingMode: false,
      blockedDates: [],
      selectedHouse: null,
      houseOptions: [],
      selectedDate: null,
      selectedDatePrice: "",
      selectedEditDate: null,
      isEditingPrice: false,
      editedPrice: "",
      pricingModalVisible: false,
      selectedDates: [],
      discountModalVisible: false,
      isApartmentSelected: false,

      showWeeklyDiscountDetails: false,
      apartmentPrices: {
        "Lekki Admiralty": {
          basePrice: "₦400002",
          weekendDiscount: "10%",
          weeklyDiscount: "15%",
          // Add other details for Lekki Admiralty
        },
        "Lekki Phase 1": {
          basePrice: "₦500000",
          weekendDiscount: "15%",
          weeklyDiscount: "20%",
          // Add other details for Lekki Phase 1
        },
        "Lekki Units square": {
          basePrice: "₦400005",
          weekendDiscount: "12%",
          weeklyDiscount: "18%",
          // Add other details for Lekki Units square
        },
        // Add other apartments and their details here
      },
    };
  }

  handleToggleWeeklyDetails = () => {
    this.setState((prevState) => ({
      showWeeklyDiscountDetails: !prevState.showWeeklyDiscountDetails,
    }));
  };



  handleDateClick = (date) => {
    // const { blockedDates, blockingMode, selectedDates } = this.state;
    const clickedDate = date.dateStr;


    // / Check if the clicked date is in the past
    const isPastDate = date.date < new Date();

    // If it's a past date, prevent the default behavior and apply styles
    // if (isPastDate) {
    //   console.log(new Date())
    //   return ;
    // } else {
      // Handle the click for future dates
      this.openPopup(clickedDate,"");
      console.log('Clicked on a future date:', date);
    // }





    // if (blockingMode) {
    //   const updatedBlockedDates = blockedDates.includes(clickedDate)
    //     ? blockedDates.filter((date) => date !== clickedDate)
    //     : [...blockedDates, clickedDate];

    //   this.setState({ blockedDates: updatedBlockedDates });
    // } else {
    //   if (blockedDates.includes(clickedDate)) {
    //     const updatedBlockedDates = blockedDates.filter(
    //       (date) => date !== clickedDate
    //     );
    //     this.setState({ blockedDates: updatedBlockedDates });
    //   }
    // }

    // if (!blockingMode) {
    //   const { selectedDates } = this.state;

    //   // Check if the clicked date is in the selectedDates array
    //   if (selectedDates.includes(clickedDate)) {
    //     // If the date is already selected, remove it
    //     const updatedSelectedDates = selectedDates.filter(
    //       (date) => date !== clickedDate
    //     );
    //     this.setState({ selectedDates: updatedSelectedDates });
    //   } else {
    //     // If the date is not selected, add it
    //     this.setState({
    //       selectedDates: [...selectedDates, clickedDate],
    //       selectedEditDate: dateInfo.dateStr,
    //       selectedDatePrice: "",
    //       showWeeklyDiscountDetails: true, // Show discount details when a date is clicked
    //     });
    //   }
    // }
  
  };

  handleDateSelect = (info) => {
    const selectedStartDate = info.start.toISOString().split('T')[0];
    const selectedEndDate = info.end.toISOString().split('T')[0];

    console.log(info)
    

    // You can handle date range selection if needed
    console.log('Selected start date:', selectedStartDate);
    console.log('Selected end date:', selectedEndDate);

    // Open your popup or do any other actions with the selected date range
    this.openPopup(selectedStartDate, selectedEndDate);
  };

  openPopup = (startDate, endDate) => {
    // Your logic to open a popup with the selected date or date range
    console.log('Opening popup with date:', startDate);

    this.setState({ pricingModalVisible: true }) // Set the custom modal to be visible

    // Example: You can use a modal library or create your own popup component
    // showModal({ startDate, endDate });
  };

  handlePriceChange = (event) => {
    const newPrice = event.target.value;
    this.setState({ selectedDatePrice: newPrice });
  };

  handleEditPrice = () => {
    this.setState({ isEditingPrice: true });
  };

  // handleSavePrice = (event) => {
  //   event.preventDefault();

  //   const { selectedEditDate, selectedDatePrice } = this.state;

  //   if (selectedEditDate) {
  //     Modal.confirm({
  //       title: "Save Changes",
  //       content: "Are you sure you want to save the changes?",
  //       onOk: () => {
  //         // User confirmed, proceed with saving the changes
  //         console.log("Date:", selectedEditDate);
  //         console.log("Price:", selectedDatePrice);
  //       },
  //       onCancel: () => {
  //         // User canceled, do nothing or handle it as needed
  //       },
  //     });
  //   } else {
  //     // If a date is not selected, show the "Please select a date" modal
  //     Modal.confirm({
  //       title: "Error",
  //       content: "Please select a date before saving the price.",
  //       onOk: () => {
  //         // User confirmed, you can choose to handle it as needed
  //       },
  //       okButtonProps: { className: "orange-button" },
  //     });
  //   }
  // };

  handleBlockMode = () => {
    this.setState({ blockingMode: true });
  };

  handleUnblockMode = () => {
    this.setState({ blockingMode: false });
  };

  formatAmountWithCommas = (amount) => {
    // Convert the amount to a string and split it into integer and decimal parts
    if(amount===""||amount===null){
      return ""
    }
    const [integerPart, decimalPart] = amount.toString().split('.');

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts with a dot if there is a decimal part
    const formattedAmount = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedAmount;
  }


  handleHouseSelect = async (houseId) => {


    // const selectedHouse = this.state.houseOptions.find(house => house.id === parseInt(houseId, 10));
    // this.setState({ selectedHouse: selectedHouse ? selectedHouse.name : '' });
    console.log("selected", houseId);

    if (houseId === "") {
      this.setState({ selectedHouse: null });
      return;
    }

    await this.fetchData(houseId);



  };

  fetchData = async (houseId) => {

    await axios.get(`/hosthomes/${houseId}`).then(response => {

      const formattedAPartment = {
        id: houseId,
        name: response.data.data.title,
        basePrice: this.formatAmountWithCommas(response.data.data.price),
        customWeekendPrice: this.formatAmountWithCommas(response.data.data.weekend),
        weeklyDiscount: response.data.data.discounts.find(discount => discount.discount.toLowerCase().includes('weekly')),
        weeklyAverage: "₦2000065",
        monthlyDiscount: response.data.data.discounts.find(discount => discount.discount.toLowerCase().includes('monthly')),
        monthlyAverage: "₦2000065",
        moreDiscounts: "Early bird, last-minute, trip length",
        minNight: response.data.data.min_nights,
        maxNight: response.data.data.max_nights,
        advanceNotice: response.data.data.advance_notice,
        prepTime: response.data.data.preparation_time,
        availabilityWindow: response.data.data.availability_window,
      };

      this.setState({ selectedHouse: formattedAPartment });
      this.setState({ editedPrice: this.formatAmountWithCommas(response.data.data.price) });
      console.table(response.data.data);



    }).catch(error => {
      console.log(error);
    }

    );



  }

  dateHasBackground = (date) => {
    return this.state.selectedDates.includes(date);
  };

  toggleBlockMode = () => {
    this.setState((prevState) => ({
      blockingMode: !prevState.blockingMode,
    }));
  };

  markPassedDatesAsBlocked(blockedDates) {
    const currentDate = new Date();
    return blockedDates.map((date) => ({
      title: new Date(date) < currentDate ? 'Blocked' : 'Unblocked',
      start: date,
      allDay: true,
    }));
  }

  getUnblockedDates() {
    const { blockedDates } = this.state;
    const today = new Date();
    const unblockedDates = [];

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      const currentDateString = currentDate.toISOString().split("T")[0];

      if (!blockedDates.includes(currentDateString)) {
        unblockedDates.push({
          title: "Available",
          start: currentDateString,
          allDay: true,
        });
      }
    }

    return unblockedDates;
  }

  componentDidMount() {
    axios.get('/schdulerGetHostHomeAndId').then(response => {
      const formattedOptions = response.data.data.map(item => ({
        id: item.id,
        property_name: item.property_name,
      }));
      this.setState({ houseOptions: formattedOptions })
    }).catch();

    this.updateBlockedDates();



  }


  setEditedPrice(price) {
    // gets the changed price from the Pricing component and stores it
    this.setState({ editedPrice: this.formatAmountWithCommas(price) });
  }

  savePrice = async (price, date) => {



    const id = this.state.selectedHouse.id;
    this.setState({ editedPrice: this.formatAmountWithCommas(price) });
    /// for The calender price to change
    await axios.post(`/schduler/host-homes/${id}/edit-price`, { price, date: (date ? date : "") }).then(response => {
      this.fetchData(id)

    }).catch(err => {
      console.log(err)
      this.setState({ editedPrice: this.state.selectedHouse.basePrice }); /// for The calender price to change
    });








  }



  hidePricingModal = () => {
    this.setState({ pricingModalVisible: false }) // Set the custom modal to be visible
  };


  updateBlockedDates = () => {
    const currentDate = new Date();
    const pastYear = new Date();
    pastYear.setFullYear(currentDate.getFullYear() - 1);

    const validRange = {
      start: pastYear.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
      end: currentDate.toISOString().split('T')[0],
    };

    const pastDates = this.getPastDates(validRange.start, validRange.end);

    // Update the blockedDates state with individual past dates
    this.setState({ blockedDates: pastDates });
  };

  getPastDates = (startDate, endDate) => {
    const pastDates = [];
    let currentDate = new Date(startDate);

    // Loop through each day from the start date to the end date
    while (currentDate < new Date(endDate)) {
      pastDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return pastDates;
  };






  render() {
    const {
      blockingMode,
      blockedDates,
      selectedHouse,
      selectedDate,
      selectedDatePrice,
      isEditingPrice,
      editedPrice,
      pricingModalVisible,
      discountModalVisible, // Include this state variable

      showWeeklyDiscountDetails,
    } = this.state;
    const items = [
      {
        key: "1",
        label: (
          <div className="text-neutral-600 text-xl rounded-t-lg">Pricing</div>
        ),
        children: (
          <Pricing
            selectedHouse={selectedHouse}
            isEditingPrice={isEditingPrice}
            setEditedPrice={(price) => { this.setEditedPrice(price) }}
            selectedDate={selectedDate}
            selectedDatePrice={selectedDatePrice}
            onEditPrice={this.handleEditPrice}
            onSavePrice={this.handleSavePrice}
            onPriceChange={this.handlePriceChange}
            blockingMode={blockingMode}
            handleToggleWeeklyDetails={this.handleToggleWeeklyDetails}
            showWeeklyDiscountDetails={showWeeklyDiscountDetails}
            fetch={this.fetchData}
          // Pass the function as a prop
          />
        ),
      },
      {
        key: "2",
        label: (
          <div className="text-neutral-600 text-xl rounded-t-lg">
            Availability
          </div>
        ),
        children: (
          <div className="text-neutral-600 rounded-t-lg">
            {selectedHouse ? (
              <CalenderAvailability
                minNight={selectedHouse.minNight}
                maxNight={selectedHouse.maxNight}
                advanceNotice={selectedHouse.advanceNotice}
                prepTime={selectedHouse.prepTime}
                availabilityWindow={selectedHouse.availabilityWindow}
                selectedHouse={selectedHouse}
                houseId={selectedHouse.id}
              />
            ) : (
              <div>Select an apartment/house to view details</div>
            )}
          </div>
        ),
      },
    ];



    const houseOptions = this.state.houseOptions.map((options) => ({ name: options.property_name, id: options.id }));

    const currentDate = new Date();
    const pastYear = new Date();
    pastYear.setFullYear(currentDate.getFullYear() - 1);

    const validRange = {
      start: pastYear.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
      // end: currentDate.toISOString().split('T')[0],
    };

    const backgroundEvents = blockedDates.map((date) => ({
      start: date,
      end: date,
      rendering: 'background',
      color: '#ff9f89', // Set the background color as needed
      display: 'inverse-background',
      extendedProps: {
        cost: 50,
      },
    }));

    const markedBlockedDates = this.markPassedDatesAsBlocked(blockedDates);

    return (
      <div>
        <HostHeader />
        <HostBottomNavigation />
        <div className="flex flex-wrap  box-border w-full">
          <div className="block flex-grow relative overflow-y-scroll example">
            <div className="flex flex-col relative py-8 px-6">
              <select
                name="houseSelect"
                id="houseSelect"
                onChange={(e) => this.handleHouseSelect(e.target.value)}
                className="py-5 border pr-4 border-orange-400 mb-4 pl-4"
              >
                <option value="">Select an Apartment</option>
                {houseOptions.map((house, index) => (
                  <option key={index} value={house.id}>
                    {house.name}
                  </option>
                ))}
              </select>
              {selectedHouse && (
                <div className="mb-4">
                  <button
                    className={`${blockingMode ? "bg-orange-400" : "bg-black"
                      } text-white py-2 px-4 rounded`}
                    onClick={this.toggleBlockMode}
                  >
                    {blockingMode ? "Unblock date" : "Block date"}
                  </button>
                </div>
              )}
              {selectedHouse && (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
                  initialView="dayGridMonth"
                  // multiMonthMaxColumns={1}

                  // editable
                  validRange={validRange}
                  select={this.handleDateSelect}
                  selectable
                  // eventClick={this.handleDateClick}
                  selectConstraint={{ start: new Date().setHours(0, 0, 0, 0) }} 
                  dateClick={this.handleDateClick}
                  events={[
                    ...blockedDates.map((date) => ({
                      title: '<div><div></div><div class="w-full flex justify-center" > <svg xmlns="http://www.w3.org/2000/svg"  class="md:w-8 w-6"  viewBox="0 0 24 24"><title>cancel</title><path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" /></svg></div></div>',
                      start: date,
                      allDay: true,
                      display: 'background',
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    })),
                    // ...markedBlockedDates,
                    ...this.getUnblockedDates(),
                  ]}
                  eventContent={(arg) => {
                    const dateStr = arg.event.start.toISOString().split("T")[0];
                    const price = editedPrice;

                    return {
                      html: `
                      <div>
                        <div>${arg.event.title}</div>
                        <div> ₦${price}</div>
                      </div>
                    `,
                      backgroundColor: this.dateHasBackground(arg.event.start)
                        ? "orange"
                        : "white",
                    };
                  }}
                />
              )}
              {/* {selectedDate && blockingMode && (
                <div className="mt-4 border">
                  <label className="font-semibold text-lg">
                    Price for {selectedDate}
                  </label>
                  {isEditingPrice ? ( // Check the editing mode
                    <div>
                      <input
                        type="number"
                        value={editedPrice}
                        onChange={this.handlePriceChange}
                        placeholder="Enter price per night"
                      />
                      <button onClick={this.handleSavePrice}>Save</button>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium">{selectedDatePrice}</div>
                      <button onClick={this.handleEditPrice}>Edit</button>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </div>
          <div className="bg-slate-100 h-2 p-2 w-full md:hidden"></div>
          <section className=" md:w-[370px] w-full border-l z-[1] min-[1128px]:block">
            <div className=" block box-border overflow-auto h-screen relative bg-white">
              <div className="block box-border py-8 px-6">
                <Tabs defaultActiveKey="1" items={items} />
              </div>
            </div>
            <PricingModal
              visible={pricingModalVisible}
              onClose={this.hidePricingModal}
              showBlocker={true}
              title={"Per night"}
              onSave={this.savePrice}
              price={editedPrice}
            />
          </section>
        </div>
      </div>
    );
  }



}

// ...


