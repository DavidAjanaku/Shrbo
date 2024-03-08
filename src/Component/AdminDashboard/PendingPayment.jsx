import React, { useEffect, useState } from "react";
import { Table, Space, Input, DatePicker, Select, Dropdown } from "antd";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { parse, isAfter } from 'date-fns';
import Axios from "../../Axios"
import moment from "moment";


const { RangePicker } = DatePicker;
const { Option } = Select;

const PendingPayment = () => {
  const [data, setData] = useState([]);

  const [filters, setFilters] = useState({
    hostName: "",
    amount: "",
    dateRange: null,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('/receivablePayable');
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      render: (text) => {
        return moment(text).format('dddd, D MMMM YYYY');
      },
    },
    {
      title: 'Booking No',
      dataIndex: 'paymentId',
      key: 'paymentId',
    },
    {
      title: 'Host Email',
      dataIndex: 'hostEmail',
      key: 'hostEmail',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (totalAmount) => (
        <span>
          ₦{new Intl.NumberFormat().format(totalAmount)}
        </span>
      ),
    },
    {
      title: 'Guest Service Charge',
      dataIndex: 'guestServiceCharge',
      key: 'guestServiceCharge',
      render: (guestServiceCharge) => (
        <span>
          ₦{new Intl.NumberFormat().format(guestServiceCharge)}
        </span>
      ),
    },
    {
      title: 'Host Service Charge',
      dataIndex: 'hostServiceCharge',
      key: 'hostServiceCharge',
      render: (hostServiceCharge) => (
        <span>
          ₦{new Intl.NumberFormat().format(hostServiceCharge)}
        </span>
      ),
    },
    {
      title: 'Net Profit',
      dataIndex: 'netProfit',
      key: 'netProfit',
      render: (netProfit) => (
        <span>
          ₦{new Intl.NumberFormat().format(netProfit)}
        </span>
      ),
    },
    {
      title: 'Amount to Host',
      dataIndex: 'amountToHost',
      key: 'amountToHost',
      render: (amountToHost) => (
        <span>
          ₦{new Intl.NumberFormat().format(amountToHost)}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
            <Dropdown
            menu={{
              items,
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>Edit</Space>
            </a>
          </Dropdown>
       
        </Space>
      ),
    },
  ];



  // const filteredData = data.filter((record) => {
  //   const { hostName, amount, dateRange } = filters;
  //   const paymentDate = parse(record.paymentDate, 'yyyy-MM-dd', new Date());
  
  //   const matchesEmail = record.hostName.toLowerCase().includes(hostName.toLowerCase());
  //   const matchesAmount = record.totalAmount.toLowerCase().includes(amount.toLowerCase());
  
  //   // Check if the payment date is within the selected date range
  //   let matchesDate = true;
  //   if (dateRange) {
  //     const [startDate, endDate] = dateRange;
  //     if (startDate && endDate) {
  //       matchesDate =
  //         isAfter(paymentDate, startDate) && isAfter(endDate, paymentDate);
  //     }
  //   }
  
  //   return matchesEmail && matchesAmount && matchesDate;
  // });
  

  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const items = [
    {
      label: <div>Approve</div>,
      key: "0",
    },
    {
      label: <div>Decline</div>,
      key: "1",
    },
  
  ];

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="bg-orange-400 text-white hidden md:block md:w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>
        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Pending Payments</h1>
          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4 flex justify-end">
              <Input
                placeholder="Filter by Host Name"
                value={filters.hostName}
                onChange={(e) => handleFilterChange("hostName", e.target.value)}
              />
              <Input
                placeholder="Filter by Amount"
                value={filters.amount}
                onChange={(e) => handleFilterChange("amount", e.target.value)}
              />
              <RangePicker
                placeholder={["Start Date", "End Date"]}
                value={filters.dateRange}
                onChange={(dates) => handleFilterChange("dateRange", dates)}
              />
            </div>
            <div className="overflow-x-auto">
            <Table columns={columns} dataSource={data} rowKey="paymentId" />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingPayment;
