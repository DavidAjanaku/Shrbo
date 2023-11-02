import React, { useState } from "react";
import { Table, Button, Modal } from "antd";


const sampleBookingDetails = {
    guestName: "John Doe",
    email: "johndoe@example.com",
    numGuests: 2,
    specialRequests: "Late check-in requested.",
    propertyName: "Beachfront Villa",
    propertyType: "Villa",
    checkInDate: "2023-10-20",
    checkOutDate: "2023-10-25",
    roomsBedsRequired: "2 bedrooms, 2 beds",
    amenities: "Private pool, beach access",
    totalBookingCost: 500,
    paymentMethod: "Credit Card",
    paymentAmount: 500,
    amountReceivedByHost: 70,

    taxesFees: 50,
    paymentConfirmation: "Payment confirmed",
    addons: "Airport pickup, breakfast",
    cancellationPolicy: "Free cancellation up to 7 days before check-in.",
    refundPolicy: "Full refund within 24 hours of booking.",
    confirmationNumber: "B123456789",
    bookingDate: "2023-10-15",
    bookingStatus: "Confirmed",
    reviewAndRating: "4.5 out of 5 stars",
    termsConditions: "Terms and conditions text...",
    hostName: "My Name",
    hostContact: "host@example.com",
    hostReviews: "4.7 out of 5 stars",
    propertyId: "ABC123",
    guestComment:"lorem inpsum",
    hostCommunicationOptions: "Email, Phone, Chat",
    bookingSummary: "Summary of booking details...",
  };
  

  const sampleBookingDetails2 = {
    guestName: "Jane Smith",
    email: "janesmith@example.com",
    numGuests: 3,
    specialRequests: "Early check-in requested.",
    propertyName: "Mountain Chalet",
    propertyType: "Chalet",
    checkInDate: "2023-11-05",
    checkOutDate: "2023-11-10",
    roomsBedsRequired: "3 bedrooms, 3 beds",
    amenities: "Mountain view, fireplace",
    totalBookingCost: 700,
    paymentMethod: "PayPal",
    paymentAmount: 700,
    amountReceivedByHost:85,

    taxesFees: 70,
    paymentConfirmation: "Payment confirmed",
    addons: "Hiking tour, dinner",
    cancellationPolicy: "Free cancellation up to 14 days before check-in.",
    refundPolicy: "Full refund within 48 hours of booking.",
    confirmationNumber: "C987654321",
    bookingDate: "2023-10-18",
    bookingStatus: "Confirmed",
    reviewAndRating: "4.8 out of 5 stars",
    termsConditions: "Terms and conditions text...",
    hostName: "Host Name",
    hostContact: "host@example.com",
    hostReviews: "4.7 out of 5 stars",
    hostCommunicationOptions: "Email, Phone, Chat",
    bookingSummary: "Summary of booking details...",
    propertyId: "XYZ789",
    guestComment:"lorem inpsum",

  };

const data = [
    {
      key: "1",
      guestName: "John Doe",
      transactionId: 'T12345',
      numGuests: 2,
      propertyId: "ABC123",
      amountReceivedByHost: 70,
      paymentAmount: 100,
      serivceCharge: 10,
      bookingDetails: sampleBookingDetails, // Add the booking details object
  
    },
    {
      key: "2",
      guestName: "Jane Smith",
      transactionId: 'T12345',
      numGuests: 3,
      propertyId: "XYZ789",
      amountReceivedByHost: 85,

      paymentAmount: 150,
      serivceCharge: 15,
      bookingDetails: sampleBookingDetails2, // Add the booking details object

    },
    // Add more booking data as needed
  ];

const HostTransactionHistory = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const columns = [
    {
        title: "Transaction ID",
        dataIndex: 'transactionId',
        key: 'transactionId',
      },
    {
      title: "Guest Name",
      dataIndex: "guestName",
      key: "guestName",
    },
  
    {
      title: "Number of Guests",
      dataIndex: "numGuests",
      key: "numGuests",
    },
    {
      title: "Property ID",
      dataIndex: "propertyId",
      key: "propertyId",
    },
    {
      title: "Payment Amount",
      dataIndex: "paymentAmount",
      key: "paymentAmount",
    },
    {
        title: " Amount Received By Host",
        dataIndex: "amountReceivedByHost",
        key: "amountReceivedByHost",
      },
    {
      title: "Serivce Charge",
      dataIndex: "serivceCharge",
      key: "serivceCharge",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => viewBookingDetails(record)}>View Details</Button>
      ),
    },
  ];

  const viewBookingDetails = (booking) => {
    // Find the booking details with the same email and property ID
    const matchingBooking = data.find(
      (item) =>
        item.email === booking.email && item.propertyId === booking.propertyId
    );
  
    if (matchingBooking) {
      setSelectedBooking(matchingBooking);
      setDetailsVisible(true);
    }
  };
  

  const handleDetailsClose = () => {
    setDetailsVisible(false);
  };

  return (
    <div>
    <div className="">

     
        <div className="overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Transaction History</h1>

          <div className="bg-white p-4 rounded shadow">
            <div className="overflow-x-auto">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
  
      <Modal
        title="Booking Details"
        open={detailsVisible}
        onOk={handleDetailsClose}
        onCancel={handleDetailsClose}
      >
     {selectedBooking && (
  <div>
  




    <h2 className="text-base font-semibold mt-4 mb-2">Guest Paid</h2>
    <p>Property Name:{selectedBooking.bookingDetails.propertyName}</p>
    <p>Property Type:{selectedBooking.bookingDetails.propertyType}</p>
    <p>Check-In Date:{selectedBooking.bookingDetails.checkInDate}</p>
    <p>CheckedOut Date:{selectedBooking.bookingDetails.checkOutDate}</p>
    <p>Rooms and Beds:{selectedBooking.bookingDetails.roomsBedsRequired}</p>
    <p>Amenities:{selectedBooking.bookingDetails.amenities}</p>
    <p>Confirmation Number:{selectedBooking.bookingDetails.confirmationNumber}</p>

    

    <h2 className="text-base font-semibold mt-4 mb-2">Pricing and Payments:</h2>
    <p>Total Booking Cost:${selectedBooking.bookingDetails.totalBookingCost}</p>
    <p>Commission Paid to Host:{selectedBooking.bookingDetails.amountReceivedByHost}</p>

    <p>Payment Method:{selectedBooking.bookingDetails.paymentMethod}</p>
    <p>Payment Amount:${selectedBooking.bookingDetails.paymentAmount}</p>
    <p>Taxes and Fees:${selectedBooking.bookingDetails.taxesFees}</p>
    <p>Payment Confirmation:{selectedBooking.bookingDetails.paymentConfirmation}</p>

    <h2 className="text-xl font-semibold mt-4 mb-2">Guest Reviews and Ratings:</h2>
    <p><strong>Review and Rating:</strong> {selectedBooking.bookingDetails.reviewAndRating}</p>
    <p><strong>Guest Comment:</strong> {selectedBooking.bookingDetails.guestComment}</p>

 </div>
)}

      </Modal>
    </div>
  </div>
  );
};

export default HostTransactionHistory;
