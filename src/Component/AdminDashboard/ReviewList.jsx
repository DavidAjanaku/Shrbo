import React, { useEffect, useState } from "react";
import { Table, Input, Select, Modal, Space, Dropdown, Spin } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import Axios from "../../Axios"
const { confirm } = Modal;

export default function ReviewListings() {
  const [reviews, setReviews] = useState([
  
  ]);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await Axios.get("/getReviews");
        setReviews(response.data.data); 
        console.log(response.data.data);
        setLoading(false); 

      } catch (error) {
        console.error("Error fetching reviews:", error);
        // Handle error, show error message, etc.
        setLoading(false); // Set loading to false whether request succeeds or fails

      }
    };

    fetchReviews();
  }, []);


  const [filters, setFilters] = useState({
    status: "Any",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (value) => {
    setFilters({
      status: value,
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDeleteReview = (reviewId) => {
    confirm({
      title: "Do you want to delete this review?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const updatedReviews = reviews.filter(
          (review) => review.id !== reviewId
        );
        setReviews(updatedReviews);
      },
    });
  };

  const columns = [
    {
      title: "Rental Name",
      dataIndex: "rentalName",
      key: "rentalName",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Email Address",
      dataIndex: "emailAddress",
      key: "emailAddress",
    },

    {
      title: "Comments",
      dataIndex: "comments",
      key: "comments",
    },
    {
      title: "Date Added",
      dataIndex: "dateAdded",
      key: "dateAdded",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <div>
          <Dropdown
            menu={{
              items: [
                {
                  label: <div>Approve</div>,
                  key: "0",
                },
                {
                  label: <div>Reject</div>,
                  key: "1",
                },
                {
                  type: "divider",
                },
                {
                  label: <div>No idea</div>,
                  key: "3",
                },
              ],
            }}
            trigger={["click"]}
          >
            <a onClick={(e) => e.preventDefault()}>Action</a>
          </Dropdown>
          &nbsp;
          <span
            onClick={() => handleDeleteReview(record.id)}
            className="cursor-pointer"
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  const filteredReviews = reviews.filter((review) => {
    const { status } = filters;

    const matchesStatus = status === "Any" || review.status === status;

    const matchesSearch =
      review.rentalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.emailAddress.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="hidden md:block bg-orange-400 text-white md:w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>
        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Review Listings</h1>
          <div className="bg-white p-4 rounded shadow">
            <div className="mb-4 flex justify-end">
              <Input
                type="text"
                name="searchQuery"
                value={searchQuery}
                onChange={handleSearchInputChange}
                placeholder="Search by name or email"
                className="border p-1 rounded-full mr-2"
              />
              <Select
                style={{ width: 120 }}
                value={filters.status}
                onChange={handleFilterChange}
              >
                <Select.Option value="Any">Status (Any)</Select.Option>
                <Select.Option value="Active">Active</Select.Option>
                <Select.Option value="Not Active">Not Active</Select.Option>
                {/* Add more status options as needed */}
              </Select>
            </div>
            <div className="overflow-x-auto">
            {loading ? (
                <Spin size="large" />
              ) : (
                <Table columns={columns} rowKey="id" dataSource={filteredReviews} />
              )}            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
