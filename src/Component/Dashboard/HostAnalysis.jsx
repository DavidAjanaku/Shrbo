import React, { useState, useEffect } from "react";
import { Tabs, Modal, Checkbox, Select } from "antd";
import HostHeader from "../Navigation/HostHeader";
import Room from "../../assets/room.jpeg";
import TopEarningApartments from "./TopEarningApartments";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import HostBottomNavigation from "./HostBottomNavigation";
import axios from "../../Axios";
import { useStateContext } from "../../ContextProvider/ContextProvider";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const { items } = Tabs;
const { Option } = Select;

export default function HostAnalysis() {
  const [activeTab, setActiveTab] = useState("1");
  const [showListingsModal, setShowListingsModal] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const { user, setUser, setHost, setAdminStatus } = useStateContext();
  const currentDate = new Date();
  const defaultSelectedMonth = `${currentDate.toLocaleString("default", { month: "long" })} ${currentDate.getFullYear()}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultSelectedMonth); // Add selectedMonth state
  const [views, setViews] = useState();
  const [apartmentData, setApartmentData] = useState([]);
  const [earningsApartmentData, setEarningsApartmentData] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [payment, setPayment] = useState();

  function formatAmountWithCommas(amount) {
    // Convert the amount to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = amount.toString().split('.');

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts with a dot if there is a decimal part
    const formattedAmount = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedAmount;
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to get the user data
        const response = await axios.get('/user'); // Adjust the endpoint based on your API


        // Set the user data in state
        setUser(response.data);
        setHost(response.data.host);
        setAdminStatus(response.data.adminStatus);


      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {

      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {

    if (!selectedMonth) {
      return;
    }
    const month = selectedMonth.split(/[ ]+/)[0].toLowerCase();
    const year = selectedMonth.split(/[ ]+/)[1].toString();

    console.log(month);
    console.log(year);


    axios.get(`/hostAnalyticsByMonthYear/${month}/${year}`).then(response => {

      const formattedViews = {
        host_view_count: response.data.data.host_view_count,
        new_bookings_count: response.data.data.new_bookings_count,
        booking_rate: response.data.data.booking_rate,
      }

      setViews(formattedViews);
      console.log(formattedViews);

    }).catch(err => {
      console.log(err)
    });

    axios.get(`/hostAnalyticsEarningsByMonthYear/${month}/${year}`).then(response => {
      const formattedEarnings = {
        hostTotalAmountAllBookings: formatAmountWithCommas(response.data.totalAmountAllBookings),
        hostTotalAmountPaidBookings: formatAmountWithCommas(response.data.totalAmountPaidBookings),
        hostTotalAmountUnpaidBookings: formatAmountWithCommas(response.data.totalAmountUnpaidBookings),
      }

      const formattedApartmentEarnings = response.data.earnings.map((item,index) => ({
        id:index,
        name: item.title,
        image: item.images[0].images,
        datePosted: item.creationDate,
        earnings:formatAmountWithCommas(item.earnings)

      }));

      setPayment(formattedEarnings);
      setEarningsApartmentData(formattedApartmentEarnings);
      console.log("WW", response)




    }).catch(err => {
      console.log(err);
    });

  }, [selectedMonth]);

  function convertTimestampToReadable(timestampString) {
    const timestamp = new Date(timestampString);

    const formattedDate = timestamp.toISOString().split('T')[0];
    const formattedTime = timestamp.toTimeString().split(' ')[0];

    return `${formattedDate} ${formattedTime}`;
  }






  useEffect(() => {
    if (!(user.id)) {

      return;
    }

    axios.get(`/hostReview/${user.id}`).then(response => {
      const formattedApartmentData = response.data.data.hosthomeDetails.map(item => ({

        id: item.hosthome_id,
        name: item.hosthome_title,
        image: item.photo_image,
        // datePosted: "2023-09-01",
        earnings: [
          { date: "2023-09-01", amount: 150 },
          { date: "2023-09-02", amount: 250 },
        ],

      }));

      const formattedReviews = response.data.data.actualReviews.map(item => ({
        apartmentId: item.host_home_id,
        personName: item.user_name,
        comment: item.comment,
        starRating: item.ratings,
        date: convertTimestampToReadable(item.created_at),
      }));

      setReviews(formattedReviews)
      setApartmentData(formattedApartmentData);
      console.log(response);
    }).catch(err => {
      console.log(err);
    });

  }, [user]);


  const handleTabChange = (tabKey) => {
    setActiveTab(tabKey);
  };

  const showListings = () => {
    setShowListingsModal(true);
  };

  const handleApartmentClick = (apartmentId) => {
    setSelectedApartment(apartmentId);
  };

  const hideListingsModal = () => {
    setShowListingsModal(false);
  };

  // const apartmentData = [
  //   {
  //     id: "a",
  //     name: "Apartment 1",
  //     image: Room,
  //     datePosted: "2023-10-01",
  //     earnings: [
  //       { date: "2023-10-01", amount: 100 },
  //       { date: "2023-10-02", amount: 200 },
  //     ],
  //   },
  //   {
  //     id: "b",
  //     name: "Apartment 2",
  //     image: Room,
  //     datePosted: "2023-09-01",
  //     earnings: [
  //       { date: "2023-09-01", amount: 150 },
  //       { date: "2023-09-02", amount: 250 },
  //     ],
  //   },
  //   ...apartmentDataMain,
  // ];

  const selectedApartmentData = apartmentData.find(
    (apartment) => apartment.id === selectedApartment
  );

  // const reviews = [
  //   {
  //     apartmentId: "a",
  //     personName: "John Doe",
  //     comment: "Great place to stay!",
  //     starRating: 5,
  //     nights: 3,
  //     date: "2023-10-04",
  //   },
  //   {
  //     apartmentId: "a",
  //     personName: "Jane Smith",
  //     comment: "Lovely apartment with a nice view.",
  //     starRating: 4,
  //     nights: 2,
  //     date: "2023-10-03",
  //   },

  //   {
  //     apartmentId: "a",
  //     personName: "Jane Smith",
  //     comment: "Lovely apartment with a nice view.",
  //     starRating: 4,
  //     nights: 2,
  //     date: "2023-10-03",
  //   },
  //   {
  //     apartmentId: "b",
  //     personName: "Alice Johnson",
  //     comment: "Very comfortable and clean.",
  //     starRating: 5,
  //     nights: 4,
  //     date: "2023-10-02",
  //   },
  //   ...reviewsMain,
  //   // Add more reviews here
  // ];

  const apartmentReviews = reviews.filter(
    (review) => review.apartmentId === selectedApartment
  );

  const generateMonths = () => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11, 1);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    const months = [];
    let currentMonth = startDate;

    while (currentMonth <= endDate) {
      const year = currentMonth.getFullYear();
      const month = currentMonth.toLocaleString("default", { month: "long" });
      months.push({ value: `${month} ${year}`, date: new Date(currentMonth) });
      currentMonth.setMonth(currentMonth.getMonth() + 1);
    }

    return months;
  };

  // const generateMonths = () => {
  //   // Get the current date from the browser
  //   const currentDate = new Date();
  //   const currentYear = currentDate.getFullYear();
  //   const currentMonth = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based index

  //   // Calculate start date as 12 months before the current month and year
  //   const startYear = currentMonth <= 12 ? currentYear - 1 : currentYear;
  //   const startMonth = currentMonth <= 12 ? currentMonth + 1 : currentMonth - 11;
  //   const startDate = new Date(`${startYear}-${startMonth}-01`);

  //   // End date is the current month and year
  //   const endDate = currentDate;

  //   const months = [];
  //   let tempDate = new Date(startDate);

  //   while (tempDate <= endDate) {
  //       const year = tempDate.getFullYear();
  //       const month = tempDate.toLocaleString("default", { month: "long" });
  //       months.push({ value: `${month} ${year}`, date: new Date(tempDate) });
  //       tempDate.setMonth(tempDate.getMonth() + 1);
  //   }

  //   return months;
  // };

  // const months = generateMonths();
  // console.log(months);


  // // Example usage
  // const result = generateMonths();
  // console.log(result);


  const generateMonthss = () => {
    const startDate = new Date("November 2023");
    const endDate = new Date("December 2024");

    const months = [];
    let currentDate = startDate;

    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.toLocaleString("default", { month: "long" });
      const monthYear = `${month} ${year}`;
      months.push(monthYear);
      currentDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        1
      );
    }

    return months;
  };

  return (
    <div className="">
      <HostHeader />
      <div className="m-3 md:w-3/4 md:mx-auto md:my-28">
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          className="tab-buttons"
        >
          <items tab="Reviews" key="1">
            <div>
              <h2 className="text-3xl">Reviews</h2>

              <button
                onClick={showListings}
                className="border p-2 my-3 rounded-full"
              >
                All listings
              </button>
              {selectedApartmentData && (
                <div>
                  <h2 className="my-4 font-medium text-2xl">
                    Reviews for {selectedApartmentData.name}
                  </h2>
                  {apartmentReviews.length === 0 ? (
                    <p>
                      Your first review will show up here. We’ll let you know
                      when guests leave feedback.
                    </p>
                  ) : (
                    <ul className="list-disc list-inside flex space-x-6 whitespace-nowrap overflow-scroll w-full example">
                      {apartmentReviews.map((review, index) => (
                        <li
                          key={index}
                          className="mt-2 rounded-3xl mb-3 list-none shadow-lg bg-slate-100   p-4 "
                        >
                          <div className="flex items-center space-x-4 ">
                            <div className="w-[120px]">
                              <img
                                src={selectedApartmentData.image}
                                className="w-32 h-32"
                                alt=""
                              />
                            </div>
                            <div className="w-[300px] break-words  whitespace-normal">
                              <strong>Guest Name:</strong> {review.personName}
                              <br />
                              <strong>Comment:</strong> {review.comment}
                              <br />
                              <strong>Rating:</strong> {review.starRating}
                              <br />
                              <strong>Date:</strong> {review.date}
                              <br />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </items>
          <items tab="Earnings" key="2">
            <div>
              <h2 className="text-3xl">Earnings</h2>
              <div className="md:w-3/5">
                <label htmlFor="" className="text-base">
                  Select Month
                </label>
                <div className="w-full py-4">
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Select a month"
                    onChange={(value) => setSelectedMonth(value)} // Update selectedMonth
                    value={selectedMonth}
                  >
                    {generateMonths().map((monthItem) => (
                      <Option
                        key={monthItem.date.toISOString()}
                        value={monthItem.value}
                      >
                        {monthItem.value}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="">
                  <div className="my-4">
                    <div className="text-4xl font-bold">₦{payment && payment.hostTotalAmountAllBookings}</div>
                    <div>
                      <p className="">Booked Earnings for {selectedMonth}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-red-400 h-4 w-4"></span>
                    <div className="text-xl font-bold text-[color-for-amount]">
                      ₦{payment && payment.hostTotalAmountPaidBookings}
                    </div>
                    <div>
                      <p className="text-[color-for-label]">Paid out</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="bg-green-500 h-4 w-4"></span>

                    <div className="text-xl font-bold text-[color-for-amount]">
                      ₦{payment && payment.hostTotalAmountUnpaidBookings}
                    </div>
                    <div>
                      <p className="text-[color-for-label]">Expected</p>
                    </div>
                  </div>
                </div>

                <Line
                  data={{
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        label: "Paid out",
                        data: [
                          200, 200, 600, 800, 1000, 1200, 1000, 1200, 1000,
                          1200, 1000, 1200,
                        ], // Replace with your actual paid out data
                        borderColor: "rgba(75, 192, 192, 1)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        fill: true,
                      },
                      {
                        label: "Expected",
                        data: [
                          250, 450, 650, 850, 1050, 1250, 200, 600, 800, 1000,
                          1200, 1400,
                        ], // Replace with your actual expected data
                        borderColor: "rgba(255, 99, 132, 1)",
                        backgroundColor: "rgba(255, 99, 132, 0.2)",
                        fill: true,
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="my-20">
              <h1 className="text-2xl font-bold">{selectedMonth} Details</h1>
              <TopEarningApartments apartments={earningsApartmentData} />
            </div>
          </items>

          <items tab="Views" key="3">
            <div>
              <div className="my-4">
                <Select
                  style={{ width: "100%" }}
                  placeholder="Select a month"
                  onChange={(value) => setSelectedMonth(value)}
                  value={selectedMonth}
                >
                  {generateMonths().map((monthYear) => (
                    <Option key={monthYear.value} value={monthYear.value}>
                      {monthYear.value}
                    </Option>
                  ))}
                </Select>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <div className="flex flex-col mr-6">
                    <span className="text-4xl font-bold mb-2">{views ? views.host_view_count : 2}</span>
                    <span className="text-base">Views, past 30 days</span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col mr-7">
                    <span className="text-4xl font-bold mb-2">{views ? views.new_bookings_count : 0}</span>
                    <span className="text-base">
                      New bookings, past 30 days
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex flex-col">
                    <span className="text-4xl font-bold mb-2">{(views ? views.booking_rate : 0).toFixed(1)}%</span>
                    <span className="text-base">Booking rate</span>
                  </div>
                </div>
              </div>
            </div>
          </items>


        </Tabs>
      </div>

      <Modal
        open={showListingsModal}
        onCancel={hideListingsModal}
        title="Apartment Listings"
        footer={null}
      >
        {apartmentData.length > 0 ?
          <ul>
            {apartmentData.map((apartment) => (
              <li
                key={apartment.id}
                className="flex items-center justify-between my-4"
              >
                <Checkbox checked={selectedApartment === apartment.id} onChange={() => handleApartmentClick(apartment.id)}>
                  <div className="  overflow-hidden w-[50vw] md:w-[360px]  text-ellipsis whitespace-nowrap ">
                    {apartment.name}
                  </div>

                </Checkbox>
                <img src={apartment.image} className="w-10" alt="" />
              </li>
            ))}
          </ul>
          :
          <div className=" w-full h-32 text-center py-10 font-medium text-lg flex items-center justify-center " >
            <svg xmlns="http://www.w3.org/2000/svg"
              width={"34px"}
              viewBox="0 0 24 24"><title>alert-octagon</title>
              <path d="M3,16V9L8,4H15L20,9V16.03L15.03
        ,21H8L3,16M8.39,5L4,9.39V15.6L8.4,20H14.61L19,15.61V9.39L14.61,
        5H8.39M11,8H12V13H11V8M11,15H12V17H11V15Z"/></svg>
            You have no active Listings
          </div>}
      </Modal>

      <HostBottomNavigation />
    </div>
  );
}
