import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import {
  Table,
  Input,
  Select,
  Modal,
  Space,
  Dropdown,
  Spin,
  notification,
} from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../Axios";
import { LoadingOutlined } from "@ant-design/icons";

const { confirm } = Modal;

export default function GuestsListings() {
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    verified: "Any",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (value) => {
    setFilters({
      verified: value,
    });
  };

  useEffect(() => {
    // Fetch guests from the API when the component mounts
    axiosInstance
      .get("/guests")
      .then((response) => {
        // console.log(response.data.data);
        // Check the 'banned' property in each guest and update the label accordingly
        const updatedGuests = response.data.data.map((guest) => {
          return {
            ...guest,
            banLabel: guest.banned === null ? "Ban" : "Unban",
          };
        });
  
        setGuests(updatedGuests);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
        setLoading(false);
      });
  }, []);
  

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image, record) => (
        <img
          src={image}
          alt={`Guest ${record.id}`}
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Verified",
      dataIndex: "verified",
      key: "verified",
      render: (verified) => (verified ? "Yes" : "No"),
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      key: "dateCreated",
    },
    {
      title: "Last Login",
      dataIndex: "last_login_at",
      key: "lastLogin",
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
                  label: <div>{getBanLabel(record)}</div>,
                  key: "0",
                  onClick: () => handleBanGuest(record),
                },
                {
                  label: <div>{getSuspendLabel(record)}</div>,
                  key: "1",
                  onClick: () => handleSuspendGuest(record),
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
            <a onClick={(e) => e.preventDefault()}>
              <Space>Edit</Space>
            </a>
          </Dropdown>
          &nbsp;
          <span
            onClick={() => handleDeleteGuest(record.id)}
            className="cursor-pointer"
          >
            Delete
          </span>
        </div>
      ),
    },
  ];


  // function to delete guests
  const handleDeleteGuest = (guestId) => {
    confirm({
      title: "Do you want to delete this guest?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // Call handleDeleteeGuest directly
        handleDeleteeGuest({ id: guestId });
      },
    });
  };
  

  //function to ban guest
  const handleBanGuest = async (record) => {
    // Make an API call to update the ban status of the guest
    if (record && record.id) {
      const guestIdString = record.id.toString();
      const messageObject = { message: "DD" };
  
      // Determine the action based on the current ban status of the guest
      const isBanned = record.banned;
  
      // Define the API endpoint based on the action (ban/unban)
      const endpoint = isBanned ? `/unbanGuest/${guestIdString}` : `/banGuest/${guestIdString}`;
  
      try {
        await axiosInstance.put(endpoint, messageObject);
  
        // Update the local state with the updated data
        const updatedGuests = guests.map((guest) =>
          guest.id === record.id
            ? { ...guest, banned: !isBanned } // Toggle the ban status
            : guest
        );
  
        notification.success({
          message: isBanned ? "Guest Unbanned" : "Guest Banned",
          description: `The Guest has been successfully ${isBanned ? "Unbanned" : "Banned"}.`,
        });
  
        setGuests(updatedGuests);
  
        // Wait for 1 second before reloading the page
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        // Reload the page
        window.location.reload();
        // You can also show a success message or perform other actions if needed
      } catch (error) {
        console.error("Error changing guest ban status:", error);
        notification.error({
          message: `Error ${isBanned ? "Unbanning" : "Banning"} Guest`,
          description: `Failed to ${isBanned ? "unban" : "ban"} the guest. Please try again later.`,
        });
        // Handle error scenarios, show an error message, etc.
      }
    } else {
      console.error("Invalid record:", record);
    }
  };
  

  const handleDeleteeGuest = (record) => {
    // Make an API call to update the ban status of the guest
    if (record && record.id) {
      const guestIdString = record.id.toString();
      const messageObject = { message: "DD" };
  
      // Determine the action based on the current ban status of the guest
      const isDeleted = record.banned;
  
      // Define the API endpoint based on the action (ban/unban)
      const endpoint = isDeleted ? `/unDeleteGuest/${guestIdString}` : `/deleteGuest/${guestIdString}`;
  
      axiosInstance
        .put(endpoint, messageObject)
        .then((response) => {
          // Update the local state with the updated data
          const updatedGuests = guests.map((guest) =>
            guest.id === record.id
              ? { ...guest, banned: !isDeleted } // Toggle the ban status
              : guest
          );
  
          notification.success({
            message: isDeleted ? "Guest Deleted" : "Guest Deleted",
            description: `The Guest has been successfully ${isDeleted ? "UnDeleted" : "Deleted"}.`,
          });
  
          setGuests(updatedGuests);
  
          // You can also show a success message or perform other actions if needed
        })
        .catch((error) => {
          console.error("Error changing guest ban status:", error);
          notification.error({
            message: `Error ${isDeleted ? "UnDeleting" : "Deleting"} Guest`,
            description: `Failed to ${isDeleted ? "unDelete" : "Delete"} the guest. Please try again later.`,
          });
          // Handle error scenarios, show an error message, etc.
        });
    } else {
      console.error("Invalid record:", record);
    }
  };
  
  // function to suspend guests
  const handleSuspendGuest = async (record) => {
    // Make an API call to update the ban status of the guest
    if (record && record.id) {
      const guestIdString = record.id.toString();
      const messageObject = { message: "DD" };
  
      // Determine the action based on the current ban status of the guest
      const isSuspend = record.suspend;
  
      // Define the API endpoint based on the action (ban/unban)
      const endpoint = isSuspend
        ? `/unsuspendGuest/${guestIdString}`
        : `/suspendGuest/${guestIdString}`;
  
      try {
        const response = await axiosInstance.put(endpoint, messageObject);
  
        // Update the local state with the updated data
        const updatedGuests = guests.map((guest) =>
          guest.id === record.id ? { ...guest, suspend: !isSuspend } : guest
        );
  
        notification.success({
          message: isSuspend ? "Guest UnSuspended" : "Guest Suspend",
          description: `The Guest has been successfully ${
            isSuspend ? "UnSuspended" : "Suspend"
          }.`,
        });
  
        setGuests(updatedGuests);
  
        // Wait for the notification to be displayed before reloading
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error("Error changing guest ban status:", error);
        notification.error({
          message: `Error ${isSuspend ? "Unsuspending" : "Suspending"} Guest`,
          description: `Failed to ${
            isSuspend ? "unban" : "ban"
          } the guest. Please try again later.`,
        });
        // Handle error scenarios, show an error message, etc.
      }
    } else {
      console.error("Invalid record:", record);
    }
  };


  // function to be able to change the label of guests
  const getBanLabel = (record) => {
    return record.banned === null ? "Ban" : "Unban";
  };

    // function to be able to change the label of guests
  const getSuspendLabel = (record) => {
    return record.suspend === null ? "suspend" : "Unsuspend";
  };
  
  

  const items = [
    {
      label: <div>{getBanLabel}</div>,
      key: "0",
      onClick: (record) => handleBanGuest(record),
    },

    {
      label: <div>Suspend</div>,
      key: "1",
      onClick: (record) => handleSuspendGuest(record), 

    },
    {
      type: "divider",
    },
    {
      label: <div>No idea</div>,
      key: "3",
    },
  ];

  

  const filteredGuests = guests.filter((guest) => {
    const { verified } = filters;

    // Check if the guest is verified or not based on the selected filter
    const matchesVerified =
      verified === "Any" ||
      (verified === "Verified" && guest.verified === "Verified") ||
      (verified === "Not Verified" && guest.verified !== "Verified");

    const matchesSearch =
      (guest.name &&
        guest.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (guest.email &&
        guest.email.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesVerified && matchesSearch;
  });

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="hidden md:block bg-orange-400 text-white md:w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>

        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Guest Listings</h1>
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
                value={filters.verified}
                onChange={handleFilterChange}
              >
                <Select.Option value="Any">Any</Select.Option>
                <Select.Option value="Verified">Verified</Select.Option>
                <Select.Option value="Not Verified">Not Verified</Select.Option>
              </Select>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex justify-center h-52 items-center">
                  <Spin
                    indicator={
                      <LoadingOutlined
                        style={{
                          fontSize: 24,
                        }}
                        spin
                      />
                    }
                  />
                </div>
              ) : (
                <Table
                  columns={columns}
                  dataSource={filteredGuests}
                  rowKey={(record) => record.id} // Set the rowKey to the guest's id
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
