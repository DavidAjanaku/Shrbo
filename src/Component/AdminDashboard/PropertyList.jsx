import React, { useState, useEffect } from 'react';
import AdminHeader from './AdminNavigation/AdminHeader';
import AdminSidebar from './AdminSidebar';
import { Table, Button, Input, Modal,Spin } from 'antd';
import { ExclamationCircleOutlined , LoadingOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axiosInstance from "../../Axios"
import moment from 'moment';

const { confirm } = Modal;

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Sample data for demonstration purposes
  const sampleProperties = [
    {
      key: 1, // Add a unique key for each property
      id: 1,
      propertyName: 'Cozy Apartment',
      propertyId: 'ABC123',
      price: '$120 per night',
      addedBy: 'John Doe',
      createdOn: '2023-10-01',
      status: 'published',
      userVerified: true,
    },
    {
      key: 2, // Add a unique key for each property
      id: 2,
      propertyName: 'Luxury Villa',
      propertyId: 'XYZ789',
      price: '$350 per night',
      addedBy: 'Jane Smith',
      createdOn: '2023-09-15',
      status: 'unpublished',
      userVerified: false,
    },
    // Add more property listings as needed
  ];

  const showConfirm = (propertyId) => {
    confirm({
      title: 'Do you want to delete this property?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        // Implement the logic to delete the property with the given propertyId
        // Update the properties state after deletion
        const updatedProperties = properties.filter((property) => property.id !== propertyId);
        setProperties(updatedProperties);
      },
    });
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredProperties = properties.filter((property) => {
    return (
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (property.user && property.user.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  

  const columns = [
    {
      title: 'Property Name',
      dataIndex: 'title',
      key: 'propertyName',
    },
    {
      title: 'Property ID',
      dataIndex: 'id',
      key: 'propertyId',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Added By',
      dataIndex: 'user', // Access the 'user' object
      key: 'addedBy',
      render: (user) => user.name, // Render the 'name' property of the 'user' object
    },
    {
      title: 'Created On',
      dataIndex: 'user', // Assuming 'createdOn' is stored in the 'created_at' property
      key: 'createdOn',
      render: (user) => moment(user.created_at).format('MMMM Do, YYYY, h:mm:ss a'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Verified',
      dataIndex: ['user', 'verified'], // Nested property path
      key: 'Verified',
      render: (verified) => (verified ? 'Yes' : 'No'), // Render 'Yes' if true, 'No' if false
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="primary">Edit</Button>
          &nbsp;

          <Button type="danger" onClick={() => showConfirm(record.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];
 
  useEffect(() => {
    // Fetch guests from the API when the component mounts
    axiosInstance
      .get("/allHomes")
      .then((response) => {
        setProperties(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching guests:", error);
        setLoading(false);
      });
  }, []);
  

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="hidden md:block bg-orange-400 text-white w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>

        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
          <h1 className="text-2xl font-semibold mb-4">Property Listings</h1>
          <div className="bg-white p-4 rounded shadow">
            <Input
              placeholder="Search by Property Name or Added By"
              value={searchQuery}
              onChange={handleSearch}
              style={{ width: 200, marginBottom: '1rem' }}
            />
            <div className='overflow-x-auto'>
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
            <Table columns={columns} dataSource={filteredProperties}
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
