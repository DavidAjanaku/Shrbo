import React, { useState } from "react";
import { Table, Button, Modal } from "antd";

const sampleBookingDetails = {
  bookingDetails1: {
    guestName: "Jane Smith",
    roomPerNightPrice: 100, // Replace with the actual price per night
    guestServiceFee: 20,   // Replace with the actual guest service fee
    numNights: 10,
    nightlyRateAdjustment: -50.70,
    hostServiceFee: -28.90,
  },
  bookingDetails2: {
    guestName: "John Doe",
    roomPerNightPrice: 120, // Replace with the actual price per night
    guestServiceFee: 25,   // Replace with the actual guest service fee
    numNights: 8,
    nightlyRateAdjustment: -40.60,
    hostServiceFee: -23.50,
  },
};

const data = [
  {
    key: "1",
    guestName: "John Doe",
    transactionId: "T12345",
    numGuests: 2,
    propertyId: "ABC123",
    amountReceivedByHost: 70,
    paymentAmount: 100,
    serivceCharge: 10,
  },
  {
    key: "2",
    guestName: "Jane Smith",
    transactionId: "T12345",
    numGuests: 3,
    propertyId: "XYZ789",
    amountReceivedByHost: 85,
    paymentAmount: 150,
    serivceCharge: 15,
  },
  // Add more booking data as needed
];

const HostTransactionHistory = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBreakdowns, setShowBreakdowns] = useState(false);

  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
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
      title: "Service Charge",
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

  const renderBreakdowns = (booking) => {
    const totalNightsFee = booking.roomPerNightPrice * booking.numNights;
    
    return (
      <div className="breakdowns">
        <h2 className="text-base font-semibold mt-4 mb-2">Breakdowns</h2>
        <div className="flex justify-between">
          <span>{booking.numNights} nights room fee</span>
          <span>${totalNightsFee}</span>
        </div>
        <div className="flex justify-between">
          <span>Nightly rate adjustment</span>
          <span>${booking.nightlyRateAdjustment}</span>
        </div>
        <div className="flex justify-between">
          <span>Host service fee (3.0%)</span>
          <span>${booking.hostServiceFee}</span>
        </div>
        <div className="flex justify-between">
          <span>Total (USD)</span>
          <span>${calculateTotal(booking)}</span>
        </div>
      </div>
    );
  };

  const viewBookingDetails = (booking) => {
    const matchingBooking = Object.values(sampleBookingDetails).find(
      (details) => details.guestName === booking.guestName
    );

    if (matchingBooking) {
      setSelectedBooking(matchingBooking);
      setDetailsVisible(true);
    }
  };

  const calculateTotal = (booking) => {
    const total =
      booking.roomPerNightPrice * booking.numNights +
      booking.guestServiceFee +
      booking.nightlyRateAdjustment +
      booking.hostServiceFee;
    return total;
  };

  const handleDetailsClose = () => {
    setDetailsVisible(false);
    setShowBreakdowns(false);
  };

  const toggleBreakdowns = () => {
    setShowBreakdowns(!showBreakdowns);
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
          visible={detailsVisible}
          onOk={handleDetailsClose}
          onCancel={handleDetailsClose}
        >
          {selectedBooking && (
            <div>
              <h2 className="text-base font-semibold mt-4 mb-2">Guest Paid</h2>
              <div className="flex justify-between">
                <span>
                  ${(selectedBooking.roomPerNightPrice * selectedBooking.numNights).toFixed(2)} * {selectedBooking.numNights} nights
                </span>
                <span>${(selectedBooking.roomPerNightPrice * selectedBooking.numNights).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Guest service fee</span>
                <span>${selectedBooking.guestServiceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total (USD)</span>
                <span>${(selectedBooking.roomPerNightPrice * selectedBooking.numNights + selectedBooking.guestServiceFee).toFixed(2)}</span>
              </div>
              <Button onClick={toggleBreakdowns}>
                {showBreakdowns ? "Hide Breakdowns" : "Show Breakdowns"}
              </Button>
              {showBreakdowns && renderBreakdowns(selectedBooking)}
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default HostTransactionHistory;
