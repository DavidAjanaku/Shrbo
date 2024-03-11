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
      bookedDates: [],
      unblockedDates: [],
      customBlockedDates: [],
      customPriceforCertainDates: [],
      isBlocked: "",
      selectedHouse: null,
      houseOptions: [],
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
    if (amount === "" || amount === null) {
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
        customWeeklyDiscount: response.data.data.hosthomecustomdiscounts.find(discount => discount.duration.toLowerCase().includes('1 week')),
        customMonthlyDiscount: response.data.data.hosthomecustomdiscounts.find(discount => discount.duration.toLowerCase().includes('4 weeks')),
      };

      this.setState({ selectedHouse: formattedAPartment });
      this.setState({ editedPrice: this.formatAmountWithCommas(response.data.data.price) });

      //Logic for Adding Booked Dates to blocked daes
      const newBlockedDates = response.data.data.bookedDates.reduce((acc, booking) => {
        const datesBetween = this.generateDatesBetween(
          booking.check_in,
          booking.check_out
        );
        const isDateAlreadyBlocked = datesBetween.some(date => this.state.blockedDates.includes(date));

        // // If not, add them to CustomBlockedDates
        if (!isDateAlreadyBlocked) {
          return [...acc, ...datesBetween];
        }


        return acc;
      }, []);
      const removedDuplicateDates = new Set(newBlockedDates);
      // removedDuplicateDates.add("2024-03-12")

      console.log("bookedDates", ...removedDuplicateDates);

      //////////////////////////////////////////////////////////////////
      const newCustomBlockedDates = response.data.data.hosthomeblockeddates.reduce((acc, dateRangeArray) => {
        // Extracting the first object from each inner array
        const firstDateObject = dateRangeArray[0];
        // Extracting the last object from each inner array
        const lastDateObject = dateRangeArray[dateRangeArray.length - 1];

        if (firstDateObject && lastDateObject) {
          const startDate = firstDateObject.start_date;
          const endDate = lastDateObject.end_date ?? lastDateObject.start_date;

          const datesBetween = this.generateDatesBetween(startDate, endDate);

          // Check if any date between start_date and end_date is already in blockedDates
          const isDateAlreadyBlocked = datesBetween.some(date => this.state.blockedDates.includes(date));

          // If not, add them to CustomBlockedDates
          if (!isDateAlreadyBlocked) {
            acc.push(...datesBetween);
          }
        }

        return acc;
      }, []);

      const removedDuplicateCustomDates = new Set(newCustomBlockedDates);

      console.log("Customblocked", ...newCustomBlockedDates);



      this.setState({
        bookedDates: [...removedDuplicateDates],
        customBlockedDates: [...removedDuplicateCustomDates],
      });


      ///// getting certain Prices for certain days 
      const reservedPricesForCertainDay = response.data.data.reservedPricesForCertainDay;

      // Process the API response and update the state
      const formattedPrices = reservedPricesForCertainDay
        .flatMap((dayArray) => {
          const startDate = dayArray[0].date; // Get the start date of the first object
          const endDate = dayArray[dayArray.length - 1].date; // Get the end date of the last object
      
          // Generate dates between startDate and endDate
          const datesBetween = this.generateDatesBetween(startDate, endDate);
      
          // Map each date to an object with the price of the start date
          return datesBetween.map((date) => ({
            price: dayArray[0].price, // Set the price to the price of the start date
            date,
          }));
        })
        .filter((entry, index, self) =>
          index ===
          self.findIndex(
            (e) => e.price === entry.price && e.date === entry.date
          )
        );

        console.log("reservedPrice",formattedPrices);
      
      
      this.setState({
        customPriceforCertainDates: formattedPrices,
        
      });
      


      console.log(response.data.data);



    }).catch(error => {
      console.log(error);
    }

    );



  }
  // generates the dates between The check in and Check Out dates of booked dates
  generateDatesBetween = (startDate, endDate) => {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
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

  getUnblockedDatesEvent() {
    const { blockedDates, bookedDates, customBlockedDates } = this.state;
    const today = new Date();
    const unblockedDates = [];
    const dates = [];

    for (let i = 0; i < 365; i++) {
      const currentDate = new Date();
      currentDate.setDate(today.getDate() + i);
      const currentDateString = currentDate.toISOString().split("T")[0];

      if (!blockedDates.includes(currentDateString) &&
        !bookedDates.includes(currentDateString) &&
        !customBlockedDates.includes(currentDateString)) {
        unblockedDates.push({
          title: "Available",
          start: currentDateString,
          allDay: true,
          backgroundColor: "orange"

        });
        dates.push(currentDateString);
      }
    }


    // this.setState({unblockedDates:[...dates]});
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
    // this.getUnblockedDates();



  }


  setEditedPrice(price) {
    // gets the changed price from the Pricing component and stores it
    this.setState({ editedPrice: this.formatAmountWithCommas(price) });
  }

  savePrice = async (price, date) => {
    const id = this.state.selectedHouse.id;
    let startDate = date[0];
    let endDate = date[0];
    let datesBetween = [date[0]];

    if (date.length > 1) {
      datesBetween = this.generateDatesBetween(date[0], date[1]);
      startDate = date[0];
      endDate = date[1];
    }

    console.log("start", startDate)
    console.log("end", endDate)
    console.log("datesbetween", ...datesBetween)

    // I'm only checking if one date is in the customPriceforCertainDates because i made sure when selecting dates the user can select dates in customPriceforCertainDates
    // if all the dates are in customPriceforCertainDates
    const singleDate = date[0];
    const isSingleDateInCustomPrices = this.state.customPriceforCertainDates.some(entry => entry.date === singleDate)

    if (isSingleDateInCustomPrices) {

      axios.put(`/schdulerUpdatePricesForDateRange/${id}`, {
        new_price: price,
        start_date: startDate,
        end_date: endDate,
      }).then(response => {
        this.fetchData(id)

      }).catch(err => {
        console.log(err)
        this.setState({ editedPrice: this.state.selectedHouse.basePrice }); /// for The calender price to change
      });


    } else {
      this.setState({ editedPrice: this.formatAmountWithCommas(price) });
      /// for The calender price to change
      await axios.post(`/schduler/host-homes/${id}/edit-price`, { price, dates: (date ? [...datesBetween] : "") }).then(response => {
        this.fetchData(id)

      }).catch(err => {
        console.log(err)
        this.setState({ editedPrice: this.state.selectedHouse.basePrice }); /// for The calender price to change
      });




    }


  }


  handleBlockchange = async (date, blockID) => {

    const id = this.state.selectedHouse.id;
    let startDate = date[0];
    let endDate = date[0];
    let datesBetween = [date[0]];

    if (date.length > 1) {
      datesBetween = this.generateDatesBetween(date[0], date[1]);
      startDate = date[0];
      endDate = date[1];
    }

    console.log("start", startDate)
    console.log("end", endDate)
    console.log("datesbetween", ...datesBetween)

    if (blockID === 1) {// if block is clicked

      await axios.post(`/schduler/host-homes/${id}/edit-blocked-date`, { dates: [...datesBetween] }).then(response => {
        this.setState((prevState) => ({
          customBlockedDates: [...prevState.customBlockedDates, ...datesBetween],
        }));
        this.hidePricingModal();

      }).catch(error => { console.log("could not Block", error) });
    } else {
      await axios.post(`/schduler/host-homes/${id}/edit-unblock-date`, {
        start_date: startDate,
        end_date: endDate
      }).then(response => {
        this.setState((prevState) => ({
          customBlockedDates: prevState.customBlockedDates.filter(d => !datesBetween.includes(d)),
        }));
        this.hidePricingModal();
      }).catch(error => {
        console.log("could not unblock", error);
      });
    }

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

    // Loop through each day from the start date to the end date (inclusive)
    while (currentDate <= new Date(endDate)) {
      pastDates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return pastDates;
  };


  handleDateClick = (date) => {
    const { blockedDates, customBlockedDates, bookedDates } = this.state;
    const clickedDate = date.dateStr;

    console.log(this.state.customPriceforCertainDates);


    // / Check if the clicked date is in the past
    const isPastDate = date.date < new Date();

    // If it's a past date, prevent the default behavior and apply styles
    if (isPastDate) {
      // console.log(new Date())
      return;
    } else {
      if (blockedDates.includes(clickedDate) || bookedDates.includes(clickedDate)) {
        return;

      }
      if (customBlockedDates.includes(clickedDate)) {
        this.setState({ isBlocked: 1 })// 1 means blocked 

      } else {

        this.setState({ isBlocked: 2 })// 2 means Unblocked 
      }

      //Logic to know if the selected dates is in THe custom Price
      const singleDate = clickedDate;
      const customPriceEntry = this.state.customPriceforCertainDates.find(entry => entry.date === singleDate);

      if (customPriceEntry) {
        const price = customPriceEntry.price;
        this.setState({ selectedDatePrice: price });
      } else {
        this.setState({ selectedDatePrice: this.state.editedPrice });
      }



      //END

      // Handle the click for future dates
      this.setState({ selectedDates: [clickedDate] });
      this.openPopup(clickedDate, "");
      // console.log('Clicked on a future date:', date);
    }

  };

  // handleEventClick = (info) => {
  //   const clickedDate = info.event.start; // Access the event's start date
  //   // Handle the clicked date further (e.g., display a modal, update state)


  //   // / Check if the clicked date is in the past
  //   const isPastDate = clickedDate < new Date();

  //   if (isPastDate) {
  //     console.log("hi")
  //     return;
  //   }else {
  //     // Handle the click for future dates
  //     console.log('Event clicked:', clickedDate); // Log the date for demonstration
  //     // console.log('Clicked on a future date:', date);
  //   }
  // };

  handleDateSelect = (info) => {
    const selectedStartDate = info.startStr
    let selectedEndDate = info.end.toISOString().split('T')[0];

    // Convert selectedEndDate to a JavaScript Date object
    const endDate = new Date(selectedEndDate);
  
    // Subtract one day from the end date
    endDate.setDate(endDate.getDate() - 1);
  
    // Format the result back to your desired format (e.g., YYYY-MM-DD)
    selectedEndDate = endDate.toISOString().split('T')[0];
  

  // // Check if selected dates are in the same month
  // if (info.start.getMonth() === info.end.getMonth()) {
  //   // Subtract 1 day in milliseconds for the same month
  //   selectedEndDate = new Date(info.end.getTime() - 86400000).toISOString().split('T')[0];
  // }

    console.log(selectedStartDate, selectedEndDate);

    if (selectedStartDate === selectedEndDate) {
      return;
    }

    console.log(info);
    const unblockedDates = this.getUnblockedDatesEvent();
    console.log(unblockedDates);

    // Generate dates between start and end date
    const generatedDates = this.generateDatesBetween(selectedStartDate, selectedEndDate);

    console.log(generatedDates);

    // Check if all generated dates belong to the same category (customBlockedDates or bookedDates)
    const category = this.getCategoryForDates(generatedDates,
      this.state.customBlockedDates,
      this.state.bookedDates,
      this.state.blockedDates,
      unblockedDates
    );
    const anyInCustomPrice = this.areAnyDatesInCustomPrice(generatedDates, this.state.customPriceforCertainDates);
    const commonPrice = this.getCommonPriceForDates(generatedDates, this.state.customPriceforCertainDates);
    if (category) {
      // All dates belong to the same category, perform your actions here
      console.log(`All dates belong to the ${category} category`);

      if (category === "bookedDates") {
        return;
      }

      if (category === "customBlockedDates") {

        this.setState({ isBlocked: 1 })// 1 means blocked 

      } else {

        this.setState({ isBlocked: 2 })// 2 means Unblocked 
      }


      if (anyInCustomPrice) {//checks if any of them are in custom price before checking if they all havw the same price
        // Get the common price for the generated dates in customPriceforCertainDates
        if (commonPrice) {
          // const price = customPriceEntry.price;
          this.setState({ selectedDatePrice: commonPrice });
        } else {
          return;

        }


      }
      console.log(this.state.customPriceforCertainDates);

      this.setState({ selectedDates: [selectedStartDate, selectedEndDate] });
      !commonPrice && this.setState({ selectedDatePrice: this.state.editedPrice });
      this.openPopup(selectedStartDate, selectedEndDate);
    } else {
      // Dates belong to different categories or not in customBlockedDates/bookedDates, handle accordingly
      console.log('Dates belong to different categories or not in customBlockedDates/bookedDates');
    }
  };

  getCategoryForDates = (datesToCheck, customBlockedDates, bookedDates, blockedDates, unblockedDates) => {
    // Initialize a Set to keep track of unique categories
    const uniqueCategories = new Set();

    // Function to extract date from an object with a 'start' property
    const extractDate = obj => (obj && obj.start) || null;

    // Check if all datesToCheck are in customBlockedDates
    if (datesToCheck.every(date => customBlockedDates.includes(date))) {
      uniqueCategories.add('customBlockedDates');
    }

    // Check if all datesToCheck are in bookedDates
    if (datesToCheck.every(date => bookedDates.includes(date))) {
      uniqueCategories.add('bookedDates');
    }

    // Check if all datesToCheck are in blockedDates
    if (datesToCheck.every(date => blockedDates.includes(date))) {
      uniqueCategories.add('blockedDates');
    }

    // Check if all datesToCheck are in unblockedDates
    if (datesToCheck.every(date => unblockedDates.some(obj => extractDate(obj) === date))) {
      uniqueCategories.add('unblockedDates');
    }

    // If there is only one unique category, return that category; otherwise, return null
    return uniqueCategories.size === 1 ? [...uniqueCategories][0] : null;
  };

  /// checks if the selected dates all have the same price 
  getCommonPriceForDates(datesToCheck, customPriceforCertainDates) {
    // Extract date and price from the array of objects
    const datePriceMap = new Map(customPriceforCertainDates.map(item => [item.date, item.price]));

    // Check if all datesToCheck are in customPriceforCertainDates
    if (datesToCheck.every(date => datePriceMap.has(date))) {
      // Extract the prices for the provided dates
      const pricesForDates = datesToCheck.map(date => datePriceMap.get(date));

      // Check if all prices are the same
      const uniquePrices = new Set(pricesForDates);
      if (uniquePrices.size === 1) {
        // All dates have the same price, return that price
        return pricesForDates[0];
      }
    }

    // Dates are not in customPriceforCertainDates or have different prices
    return null;
  }


  areAnyDatesInCustomPrice(datesToCheck, customPriceforCertainDates) {
    // Extract date from the array of objects
    const extractedDates = customPriceforCertainDates.map(item => item.date);

    // Check if any datesToCheck are in customPriceforCertainDates
    return datesToCheck.some(date => extractedDates.includes(date));
  };



  openPopup = (startDate, endDate) => {
    // Your logic to open a popup with the selected date or date range
    console.log('Opening popup with date:', startDate);

    this.setState({ pricingModalVisible: true }) // Set the custom modal to be visible

    // Example: You can use a modal library or create your own popup component
    // showModal({ startDate, endDate });
  };









  render() {
    const {
      blockingMode,
      blockedDates,
      bookedDates,
      selectedHouse,
      selectedDates,
      selectedDatePrice,
      isEditingPrice,
      editedPrice,
      isBlocked,
      customBlockedDates,
      customPriceforCertainDates,
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
            <div className="flex flex-col    relative py-8 px-6">
              <select
                name="houseSelect"
                id="houseSelect"
                onChange={(e) => this.handleHouseSelect(e.target.value)}
                className="py-5 border pr-4 border-orange-400 mb-8 pl-4"
              >
                <option value="">Select an Apartment</option>
                {houseOptions.map((house, index) => (
                  <option key={index} value={house.id}>
                    {house.name}
                  </option>
                ))}
              </select>
              {/* {selectedHouse && (
                <div className="mb-4">
                  <button
                    className={`${blockingMode ? "bg-orange-400" : "bg-black"
                      } text-white py-2 px-4 rounded`}
                    onClick={this.toggleBlockMode}
                  >
                    {blockingMode ? "Unblock date" : "Block date"}
                  </button>
                </div>
              )} */}
              {selectedHouse && (
                <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
                  initialView="dayGridMonth"
                  // multiMonthMaxColumns={1}

                  // editable
                  validRange={validRange}
                  select={this.handleDateSelect}
                  selectable
                  eventClick={this.handleEventClick}
                  selectConstraint={{ start: new Date().setHours(0, 0, 0, 0) }}
                  dateClick={this.handleDateClick}
                  events={[
                    ...blockedDates.map((date) => ({
                      // Check if the date is already in uniqueEvents


                      // If not, add it


                      start: date,
                      allDay: true,
                      display: 'background',
                      backgroundColor: "rgba(209, 213, 219, 0.7)",



                    })),
                    ...bookedDates.map((date) => ({
                      title: '<div class=" flex justify-center"><svg xmlns="http://www.w3.org/2000/svg" class="md:w-7 w-4" viewBox="0 0 24 24"><title>booked</title><path d="M7 14C8.66 14 10 12.66 10 11C10 9.34 8.66 8 7 8C5.34 8 4 9.34 4 11C4 12.66 5.34 14 7 14M7 10C7.55 10 8 10.45 8 11C8 11.55 7.55 12 7 12C6.45 12 6 11.55 6 11C6 10.45 6.45 10 7 10M19 7H11V15H3V5H1V20H3V17H21V20H23V11C23 8.79 21.21 7 19 7M21 15H13V9H19C20.1 9 21 9.9 21 11Z" /></svg></div>',
                      start: date,
                      allDay: true,
                      display: 'background',
                      backgroundColor: "rgba(241 ,245 ,249 , 0.7)",

                    })),

                    ...customBlockedDates.map((date) => ({
                      // Check if the date is already in uniqueEvents


                      // If not, add it

                      title: "Blocked",
                      start: date,
                      allDay: true,
                      backgroundColor: "rgba(51, 65, 85,1)"



                    })),
                  
                  
                    // ...markedBlockedDates,
                    ...this.getUnblockedDatesEvent(),
                  ]}
                  eventContent={(arg) => {
                    if (!arg || !arg.event || !arg.event.start) {
                      console.error('Invalid event data:', arg);
                      return null; // Or return an empty placeholder to prevent rendering errors
                    }
                  
                    // 2. Extract Date String and Check Blocking:
                    const dateStr = arg.event.start.toISOString().split('T')[0];
                    const isBlocked = blockedDates.includes(dateStr) || bookedDates.includes(dateStr);
                  
                    // 3. Determine Custom Price (Efficient Approach):
                    const customPriceEntry = customPriceforCertainDates.find(entry => entry && entry.date === dateStr);
                    const price = customPriceEntry ? customPriceEntry.price : editedPrice;

                    return {
                      html: `
                      <div class="w-full flex-col flex justify-center overflow-clip ">
                        <div  >${arg.event.title}</div>
                        <div class=" text-sm md:text-base ${isBlocked ? " text-center" : ""}  "> ₦${price}</div>
                      </div>
                    `,
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

            {pricingModalVisible && <PricingModal
              visible={pricingModalVisible}
              onClose={this.hidePricingModal}
              showBlocker={true}
              title={"Per night"}
              onSave={this.savePrice}
              price={selectedDatePrice}
              date={selectedDates}
              isBlocked={isBlocked}
              onBlockChange={this.handleBlockchange}
            />}
          </section>
        </div>
      </div>
    );
  }



}

// ...


