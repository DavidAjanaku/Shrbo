import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { usePDF } from "react-to-pdf";
import Logo from "../../assets/logo.png";
import axios from "../../Axios";
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
    borderBottom: '1 solid #CCCCCC',
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
  label: {
    color: '#666666',
  },
  value: {
    color: '#333333',
  },
});


const MyDocument = ({ booking, formatAmountWithCommas }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Image src={Logo} style={styles.logo} />
      <Text style={styles.header}>Your transaction receipt from Shbro</Text>
      
      <View style={styles.section}>
        <Text style={styles.subHeader}>Guest Paid</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{`₦${formatAmountWithCommas(booking.roomPerNightPrice)} * ${booking.numNights} nights`}</Text>
          <Text style={styles.value}>{`₦${formatAmountWithCommas(booking.roomPerNightPrice * booking.numNights)}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Guest service fee</Text>
          <Text style={styles.value}>{`₦${booking.guestServiceFee}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Security fee</Text>
          <Text style={styles.value}>{`₦${booking.securityFee} (Refundable)`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Total (NGN)</Text>
          <Text style={styles.bold}>{`₦${booking.paymentAmount}`}</Text>
        </View>

        <Text style={styles.subHeader}>Breakdowns</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{`${booking.numNights} nights room fee`}</Text>
          <Text style={styles.value}>{`₦${formatAmountWithCommas(booking.roomPerNightPrice * booking.numNights)}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>{`Host service fee (${booking.serviceFeePercentage}%)`}</Text>
          <Text style={styles.value}>{`₦${formatAmountWithCommas(booking.hostServiceFee)}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.bold}>Total (NGN)</Text>
          <Text style={styles.bold}>{`₦${booking.amountReceivedByHost}`}</Text>
        </View>
      </View>
    </Page>
  </Document>
);

const getRandomuserParams = (params) => ({
  per_page: params.pagination?.pageSize,
  page: params.pagination?.current,
});


const HostTransactionHistory = () => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBreakdowns, setShowBreakdowns] = useState(false);
  const pdfRef = useRef(); // Create a ref for the PDF content
  const [dataSource, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  function formatAmountWithCommas(amount) {
    const [integerPart, decimalPart] = amount.toString().split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  }

  const { toPDF, targetRef } = usePDF({ filename: "HostTransactionHistory.pdf" });

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Guest Name",
      dataIndex: "guestName",
      key: "guestName",
    },
    {
      title: "Listings",
      dataIndex: "apartmentName",
      key: "apartmentName",
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
    // {
    //   title: "Service Charge",
    //   dataIndex: "serivceCharge",
    //   key: "serivceCharge",
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => viewBookingDetails(record)}>View Details</Button>
      ),
    },
  ];

  const downloadPDF = () => {
    if (selectedBooking) {
      toPDF(pdfRef, {
        unit: "mm",
        format: "a4", // Set the format to A4 paper size
      });
    }
  };

  const renderBreakdowns = (booking) => {
    const totalNightsFee = booking.roomPerNightPrice*booking.numNights;

    return (
      <div className="breakdoguestPaid4">
        <h2 className="text-base font-semibold mt-4 mb-2">Breakdowns</h2>
        <div className="flex justify-between">
          <span>{booking.numNights} nights room fee</span>
          <span>₦{formatAmountWithCommas(totalNightsFee)}</span>
        </div>
     
        <div className="flex justify-between">
          <span>Host service fee ({booking.serviceFeePercentage}%)</span>
          <span>₦{formatAmountWithCommas(booking.hostServiceFee)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total (NGN)</span>
          <span>₦{booking.amountReceivedByHost}</span>
        </div>
      </div>
    );
  };

  const viewBookingDetails = (booking) => {
  
      setSelectedBooking(booking);
      setDetailsVisible(true);
  
  };

  const handleDetailsClose = () => {
    setDetailsVisible(false);
    setShowBreakdowns(false);
  };

  const toggleBreakdowns = () => {
    setShowBreakdowns(!showBreakdowns);
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

  const fetchData = async () => {
    setLoading(true);
    await axios.get(`/hostTransactionHistory?${qs.stringify(getRandomuserParams(tableParams))}`).then(response => {
      const results = response.data.data.map(item => ({


        key: item.id,//d
        transactionId: item.transactionID,//d
        dateTime: item.paymentDate,
        guestName: item.guest_name,//d
        apartmentName: item.propertyName,
        paymentMethod: item.paymentMethod.toUpperCase(),
        paymentAmount: formatAmountWithCommas(item.paymentAmount),//d
        propertyId: item.propertyID,//d
        hostname: item.hostname,
        securityFee: formatAmountWithCommas(item.securityFee),
        roomPerNightPrice: item.amountForOneNight ,
        numNights:item.duration_of_stay ,
        amountForOneNight: ` ${formatAmountWithCommas(item.amountForOneNight)}`,//d
        guestServiceFee: formatAmountWithCommas(item.guestserviceFee ),//d
        amountReceivedByHost: formatAmountWithCommas(item.amountToHost) ,//d
        // check_in:item.check_in,
        // check_out: item.check_out
        nightlyRateAdjustment: -40.6,
        serviceFeePercentage:item.serviceFeePercentage,
        hostServiceFee:item.hostserviceFee,
        

        // {
        //   guestName: "John Doe",
        //   numGuests: 2,         
  
        // },

        // roomPerNightPrice: 100, // Replace with the actual price per night
        // guestServiceFee: 20, // Replace with the actual guest service fee
        // nightlyRateAdjustment: -50.7,
        // hostServiceFee: -28.9,



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
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div>
      <div className="">
        <div className="overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Booking History</h1>

          <div className="bg-white p-4 rounded shadow">
            <div className="overflow-x-auto">
              <Table columns={columns} pagination={tableParams.pagination}  onChange={handleTableChange} dataSource={dataSource} loading={loading} />
            </div>
          </div>
        </div>

        <Modal
          title="Booking Details"
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
                    Your transaction receipt from Shbro{" "}
                  </h2>
                </div>
                <div className="receipt-details mt-4">
                  <div className="guestPaid">
                    <h2 className="text-lg font-semibold mb-2">Guest Paid</h2>
                    <div className="flex justify-between mb-2">
                      <span>
                      ₦
                        {(
                        formatAmountWithCommas(  selectedBooking.roomPerNightPrice)
                        )}{" "}
                        * {selectedBooking.numNights} nights
                      </span>
                      <span>
                      ₦
                        {(
                          formatAmountWithCommas(selectedBooking.roomPerNightPrice *
                          selectedBooking.numNights)
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Guest service fee</span>
                      <span>₦{selectedBooking.guestServiceFee}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Security fee</span>
                      <span>₦{selectedBooking.securityFee}(Refundable)</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Total (NGN)</span>
                      <span>
                      ₦
                        {(
                          selectedBooking.paymentAmount
                        )}
                      </span>
                    </div>
                  </div>
                  {renderBreakdowns(selectedBooking)}
                  <PDFDownloadLink 
                    document={<MyDocument booking={selectedBooking} formatAmountWithCommas={formatAmountWithCommas} />} 
                    fileName="transaction_receipt.pdf"
                  >
                    {({ blob, url, loading, error }) => 
                      loading ? 'Loading document...' : (
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-700 mt-4">
                          Download PDF
                        </button>
                      )
                    }
                  </PDFDownloadLink>
                </div>
              </div>
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default HostTransactionHistory;
