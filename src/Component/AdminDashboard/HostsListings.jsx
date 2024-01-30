import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { Table, Input, Select, Modal, Space, Dropdown, Spin, notification } from "antd";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import axoisInstance from "../../Axios";
import moment from "moment";

const { confirm } = Modal;

export default function HostsListings() {
  const [hosts, setHosts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    verified: "Any",
    ban: "Any",
    suspended: "Any",
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterChange = (value) => {
    setFilters({
      ...filters,

      verified: value,
    });
  };
  const handleBanFilterChange = (value) => {
    setFilters({
      ...filters,
      ban: value,
    });
  };

  const handleSuspendedFilterChange = (value) => {
    setFilters({
      ...filters,
      suspended: value,
    });
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    axoisInstance
      .get("/hosts")
      .then((response) => {
        setHosts(response.data.data);
        // console.log(response.data.data); 
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching hosts:", error);
        setLoading(false);
      });
  }, []);

  const handleDeleteHost = (hostId) => {
    confirm({
      title: "Do you want to delete this host?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        const updatedHosts = hosts.filter((host) => host.id !== hostId);
        setHosts(updatedHosts);
      },
    });
  };
  

  const handleBanHost = async (record) => {
    if (record && record.user && record.user.id) {
      const hostIdString = record.user.id.toString();
      console.log(hostIdString);
      const hostId = record.user.id;
      console.log("Host ID:", hostId);
      const messageObject = { message: "DD" };
  
      const isBanned = record.user.banned;
      const endpoint = isBanned ? `/unbanGuest/${hostIdString}` : `/banGuest/${hostIdString}`;
  
      try {
        await axoisInstance.put(endpoint, messageObject);
  
        const updatedHosts = hosts.map((host) =>
          host.id === hostId ? { ...host, user: { ...host.user, banned: !isBanned } } : host
        );

        notification.success({
          message: isBanned ? "Host UnBanned" : "Host Banned",
          description: `The host has been successfully ${
            isBanned ? "UnBanned" : "Banned"
          }.`,
        });
  
        setHosts(updatedHosts);
  
        // Wait for 1 second before reloading the page
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error("Error changing host ban status:", error);
        notification.error({
          message: `Error ${isBanned ? "UnBanning" : "Banning"} Host`,
          description: `Failed to ${
            isBanned ? "unabn" : "ban"
          } the host. Please try again later.`,
        });
      }
    } else {
      console.error("Invalid record:", record);
    }
  };

  const handleSuspendHost = async (record) => {
    if (record && record.user && record.user.id) {
      const hostIdString = record.user.id.toString();
      console.log(hostIdString);
      const hostId = record.user.id;
      console.log("Host ID:", hostId);
      const messageObject = { message: "DD" };
  
      // Use isSuspended to determine the action
      const isSuspended = record.user.suspend;
      const endpoint = isSuspended
        ? `/unsuspendGuest/${hostIdString}`
        : `/suspendGuest/${hostIdString}`;
  
      try {
        await axoisInstance.put(endpoint, messageObject);
  
        const updatedHosts = hosts.map((host) =>
          host.id === hostId ? { ...host, user: { ...host.user, suspend: !isSuspended } } : host
        );

        notification.success({
          message: isSuspended ? "Host Unsuspended" : "Host Suspended",
          description: `The host has been successfully ${
            isSuspended ? "Unsuspended" : "Suspended"
          }.`,
        });
  
        setHosts(updatedHosts);
  
        // Wait for 1 second before reloading the page
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        // Reload the page
        window.location.reload();
      } catch (error) {
        console.error("Error changing host suspend status:", error);
        notification.error({
          message: `Error ${isSuspended ? "Unsuspending" : "Suspending"} Host`,
          description: `Failed to ${
            isSuspended ? "unsuspend" : "suspend"
          } the host. Please try again later.`,
        });
      }
    } else {
      console.error("Invalid record:", record);
    }
  };
  
  
  

  const getBanLabel = (record) => {
    return record.user.banned === null ? "Ban" : "Unban";
  };

  const getSuspendLabel = (record) => {
    return record.user.suspend === null ? "Suspend" : "Unsuspend";
  };
  
  

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Host"
          style={{ width: "30px", height: "30px", borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
    },

    {
      title: "Email",
      dataIndex: ["user","email"],
      key: "email",
    },
    {
      title: "Houses Hosted",
      dataIndex: "verified_homes_count",
      key: "housesHosted",
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

      render: (created_at) =>
        moment(created_at).format("MMMM Do, YYYY, h:mm:ss a"),
    },
    {
      title: "Last Login",
      dataIndex: "last_login_at",
      key: "lastLogin",
      render: (last_login_at) => {
        const formattedDate = moment(last_login_at);
        return formattedDate.isValid()
          ? formattedDate.format("MMMM Do, YYYY, h:mm:ss a")
          : "No Date";
      },
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
                    onClick: () => handleBanHost(record),
                  },
                  {
                    label: <div>{getSuspendLabel(record)}</div>,
                    key: "1",
                    onClick: () => handleSuspendHost(record),
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
          &nbsp; <span onClick={() => handleDeleteHost(record.id)}>Delete</span>
        </div>
      ),
    },
  ];

  const filteredHosts = hosts.filter((host) => {
    const { verified, ban, suspended } = filters;

    const matchesVerified =
      verified === "Any" ||
      (verified === "Yes" && host.user.verified) ||
      (verified === "No" && !host.user.verified);

    const matchesBan =
      ban === "Any" ||
      (ban === "Yes" &&
        (host.user.banned !== null ? host.user.banned : false)) ||
      (ban === "No" && (host.user.banned !== null ? !host.user.banned : true));

    const matchesSuspended =
      suspended === "Any" ||
      (suspended === "Yes" &&
        (host.user.suspend !== null ? host.user.suspend : false)) ||
      (suspended === "No" &&
        (host.user.suspend !== null ? !host.user.suspend : true));

    const matchesSearch =
      (host.user.name &&
        host.user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (host.user.email &&
        host.user.email.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesVerified && matchesBan && matchesSuspended && matchesSearch;
  });

  const items = [
    {
      label: <div>{getBanLabel}</div>,
      key: "0",
      onClick: (record) => handleBanHost(record),

    },
    {
      label: <div>Suspend</div>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <div>No idea</div>,
      key: "3",
    },
  ];

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="hidden md:block bg-orange-400 text-white w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>

        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Host Listings</h1>
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
            </div>
            <div className="my-4 flex space-x-3">
              <Select
                style={{ width: 120 }}
                value={filters.verified}
                onChange={handleFilterChange}
              >
                <Select.Option value="Any">Any</Select.Option>
                <Select.Option value="Yes">Verified</Select.Option>
                <Select.Option value="No">Not Verified</Select.Option>
              </Select>

              <Select
                style={{ width: 120 }}
                value={filters.ban}
                onChange={handleBanFilterChange}
              >
                <Select.Option value="Any">Any</Select.Option>
                <Select.Option value="Yes">Banned</Select.Option>
                <Select.Option value="No">Not Banned</Select.Option>
              </Select>

              <Select
                style={{ width: 120 }}
                value={filters.suspended}
                onChange={handleSuspendedFilterChange}
              >
                <Select.Option value="Any">Any</Select.Option>
                <Select.Option value="Yes">Suspended</Select.Option>
                <Select.Option value="No">Not Suspended</Select.Option>
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
                  dataSource={filteredHosts}
                  rowKey={(record) => `${record.user.id}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
