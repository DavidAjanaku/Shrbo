import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SettingsNavigation from "./SettingsNavigation";
import ChangePassword from "./ChangePassword";
import GoBackButton from "../GoBackButton";
import { Table, Button, Modal } from "antd";
import { usePDF } from "react-to-pdf";
import Logo from "../../assets/logo.png";
import axios from "../../Axios"
import qs from 'qs';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1px solid #E0E0E0',
    borderRadius: 5,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 10,
    color: '#4A4A4A',
    borderBottom: '1px solid #CCCCCC',
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    fontSize: 12,
  },
  bold: {
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    alignSelf: 'center',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 15,
    paddingTop: 10,
    borderTop: '1px solid #CCCCCC',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    color: '#666666',
  },
  value: {
    color: '#333333',
  },
});

const formatAmountWithCommas = (amount) => {
  const [integerPart, decimalPart] = amount.toString().split('.');
  const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

const MyDocument = ({ booking }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={Logo} style={styles.logo} />
      <View style={styles.section}>
        <Text style={styles.header}>Your transaction receipt from Shrbo</Text>
        
        <View style={styles.row}>
          <Text style={[styles.bold, styles.label]}>Receipt ID:</Text>
          <Text style={styles.value}>{booking.receiptId}</Text>
        </View>
        
        <Text style={styles.subHeader}>Guest Paid</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>{booking.propertyDetails}</Text>
          <Text style={styles.value}>{formatAmountWithCommas(booking.roomPerNightPrice)} * {booking.numNights} night(s)</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Booking Dates:</Text>
          <Text style={styles.value}>{booking.bookingDates}</Text>
        </View>
        
        <Text style={styles.subHeader}>Deductions</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Service fee:</Text>
          <Text style={styles.value}>{formatAmountWithCommas(booking.guestServiceFee)} (Refundable)</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Security fee:</Text>
          <Text style={styles.value}>{formatAmountWithCommas(booking.securityFee)}</Text>
        </View>
        
        <View style={styles.totalRow}>
          <Text style={styles.label}>Total (NGN):</Text>
          <Text style={styles.value}>{formatAmountWithCommas(booking.paymentAmount)}</Text>
        </View>
        
        <Text style={styles.subHeader}>Description</Text>
        
        <View style={styles.row}>
          <Text style={styles.label}>Payment Method:</Text>
          <Text style={styles.value}>{booking.paymentMethod}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Property Description:</Text>
          <Text style={styles.value}>{booking.propertyDescription}</Text>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.label}>Host:</Text>
          <Text style={styles.value}>{booking.hostName}</Text>
        </View>
      </View>
    </Page>
  </Document>
);



const getRandomuserParams = (params) => ({
  per_page: params.pagination?.pageSize,
  page: params.pagination?.current,
  // ...params,
});


export default function TransactionHistory() {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBreakdowns, setShowBreakdowns] = useState(false);
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 4,
    },
  });
  const pdfRef = useRef(); // Create a ref for the PDF content

  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });


  const columns = [
    // Define table columns
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Host Name",
      dataIndex: "hostName",
      key: "hostName",
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
      title: " Booking Status",
      dataIndex: "bookingStatus",
      key: "bookingStatus",
    },
    {
      title: "Booking Dates",
      dataIndex: "bookingDates",
      key: "bookingDates",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => viewBookingDetails(record)}>View Details</Button>
      ),
    },
  ];

  // Function to render booking details breakdown
  const renderBreakdowns = (booking) => {
    const totalNightsFee = formatAmountWithCommas(booking.roomPerNightPrice * booking.numNights);
    const totalFull = formatAmountWithCommas(booking.paymentAmount);

    return (
      <div className="breakdoguestPaid4">
        <h2 className="text-base font-semibold mt-4 mb-2">Breakdowns</h2>
        <div className="flex justify-between">
          <span>{booking.numNights} nights room fee</span>
          <span>₦{totalNightsFee}</span>
        </div>

        <div className="flex justify-between">
          <span>Total (NGN)</span>
          <span>₦{totalFull}</span>
        </div>
      </div>
    );
  };

  function formatAmountWithCommas(amount) {
    // Convert the amount to a string and split it into integer and decimal parts
    const [integerPart, decimalPart] = amount.toString().split('.');

    // Add commas to the integer part
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts with a dot if there is a decimal part
    const formattedAmount = decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;

    return formattedAmount;
  }

  // Example usage:
  const amount = 1234567.89;
  const formattedAmount = formatAmountWithCommas(amount);
  console.log(formattedAmount); // Output: "1,234,567.89"


  // Function to view booking details
  const viewBookingDetails = (booking) => {
    const matchingBooking = Object.values(dataSource).find(
      (details) => details.hostName === booking.hostName
    );

    if (matchingBooking) {
      setSelectedBooking(matchingBooking);
      setDetailsVisible(true);
    }
  };

  // Function to calculate the total cost of a booking

  // Function to handle closing the details modal
  const handleDetailsClose = () => {
    setDetailsVisible(false);
    setShowBreakdowns(false);
  };

  // Function to toggle displaying the breakdowns
  const toggleBreakdowns = () => {
    setShowBreakdowns(!showBreakdowns);
  };

  // Function to download the PDF
  const DownloadPDFLink = ({ booking }) => (
    <PDFDownloadLink document={<MyDocument booking={booking} />} fileName="TransactionReceipt.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download PDF'
      }
    </PDFDownloadLink>
  );

  const fetchData = async () => {
    setLoading(true);
    await axios.get(`/transactionHistory?${qs.stringify(getRandomuserParams(tableParams))}`).then(response => {
      const results = response.data.data.map(item => ({


        key: item.id,
        hostName: item.hostname,
        transactionId: item.transactionID,
        // numGuests: 2,
        propertyId: item.propertyID,
        bookingStatus: "confirmed",
        paymentAmount: formatAmountWithCommas(item.paymentAmount),
        serivceCharge: item.serviceFee,
        bookingDates: ` ${item.check_in} to ${item.check_out}`,

        roomPerNightPrice: item.amountForOneNight, // Replace with the actual price per night
        guestServiceFee: item.serviceFee, // Replace with the actual guest service fee
        numNights: item.duration_of_stay,
        nightlyRateAdjustment: -40.6,
        hostServiceFee: -23.5,
        securityFee: item.securityFee,
        propertyDetails: item.propertyName,
        receiptId: item.transactionID,
        paymentMethod: item.paymentMethod, // Add payment method for the second booking
        propertyDescription: `${item.hosthomebeds} bed${item.hosthomebeds > 1 ? "s" : ""}`,


      }));
      setData(results);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: response.data.meta.total,
          // 200 is mock data, you should read it from server
          // total: data.totalCount,
        },
      });

      console.table(response.data)
      console.log(`/transactionHistory?${qs.stringify(getRandomuserParams(tableParams))}`)

    }).catch(err => {
      console.log(err);

    }).finally(() => {
      setLoading(false);
    });

  }

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `per_page` changed
    if (pagination.pageSize!== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-4">
        <GoBackButton />
        <SettingsNavigation
          title="Transaction History"
          text="Transaction History"
        />

        <div>
          <div className="bg-white p-4 rounded shadow">
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                 />
            </div>
          </div>
        </div>

        <Modal
          title="Receipt from  Shortlet Booking"
          open={detailsVisible}
          onOk={handleDetailsClose}
          onCancel={handleDetailsClose}
        >
          <div
            ref={targetRef}
            className="receipt-container flex items-center justify-center "
          >
            {selectedBooking && (
              <div className="bg-white p-4 border border-black w-full">
                <img src={Logo} alt="Company Logo" className="w-16 h-auto" />
                <div className="receipt-header flex justify-between items-center">
                  <h2 className="text-xl font-semibold">
                    Your transaction receipt from Shrbo
                  </h2>
                </div>
                <div className="receipt-details mt-4">
                  <div className="flex justify-between mb-2 font-bold my-5">
                    <span>Receipt ID</span>
                    <span className="uppercase">
                      {selectedBooking.receiptId}
                    </span>
                  </div>
                  <div className="guestPaid">
                    <h2 className="text-lg font-semibold mb-2">Guest Paid</h2>

                    <div className="flex justify-between mb-2">
                      <span>{selectedBooking.propertyDetails}</span>
                      <span>
                        ₦
                        {(
                          formatAmountWithCommas(selectedBooking.roomPerNightPrice)
                        )}{" "}
                        * {selectedBooking.numNights} night(s)
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Booking Dates</span>
                      <span>{selectedBooking.bookingDates}</span>
                    </div>
                    <div className="my-4">
                      <h1 className="text-lg font-semibold mb-2">Deductions</h1>
                      <div className="flex justify-between mb-2">
                        <span> Service fee</span>
                        <span>
                          ₦{formatAmountWithCommas(selectedBooking.guestServiceFee)}(Refundable)
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Security fee</span>
                        <span>
                          ₦{formatAmountWithCommas(selectedBooking.securityFee)}
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Total (NGN)</span>
                        <span>
                          ₦
                          {formatAmountWithCommas((
                            selectedBooking.paymentAmount
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="my-5">
                      <h1 className="text-lg font-semibold mb-2">
                        Description
                      </h1>

                      <div className="flex justify-between mb-2">
                        <span>Payment Method</span>
                        <span className=" uppercase ">{selectedBooking.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Property Description</span>
                        <span>{selectedBooking.propertyDescription}</span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Host</span>
                        <span>{selectedBooking.hostName}</span>
                      </div>
                    </div>
                  </div>
                  {renderBreakdowns(selectedBooking)}
                  <Button type="primary" className="mt-4">
            <DownloadPDFLink booking={selectedBooking} />
          </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
}
