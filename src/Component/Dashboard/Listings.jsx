import React, { useState } from "react";
import { FiSearch, FiTrash2 } from 'react-icons/fi'; // Import the FiSearch icon
import { Link } from "react-router-dom";
import Modal from "react-modal";
import PaginationExample from "../PaginationExample";
export default function Listings() {
  const [selectedListings, setSelectedListings] = useState([]);
  const [filters, setFilters] = useState({
    rooms: "Any",
    beds: "Any",
    baths: "Any",
    amenities: "Any",
    status: "Any",
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedHouseTitle, setSelectedHouseTitle] = useState("");
  const [selectedHouseId, setSelectedHouseId] = useState(null);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const listings = [
    {
      id: 1,
      status: "Active",
      instantBook: "Yes",
      bedroom: 2,
      bathrooms: 2,
      amenities: "Pool",
      title: "Sharp apartment",
      location: "Lekki Phase 1",
      image:
        "https://images.surferseo.art/fdb08e2e-5d39-402c-ad0c-8a3293301d9e.png",
    },
    {
      id: 2,
      status: "Inactive",
      instantBook: "No",
      bedroom: 3,
      bathrooms: 2.5,
      amenities: "pool",
      title: "fine apartment",

      location: "Admiralty 2b",
      image:
        "https://images.surferseo.art/fdb08e2e-5d39-402c-ad0c-8a3293301d9e.png",
    },
  ];

  // Function to handle checkbox selection
  const handleCheckboxChange = (listingId) => {
    if (selectedListings.includes(listingId)) {
      setSelectedListings(selectedListings.filter((id) => id !== listingId));
    } else {
      setSelectedListings([...selectedListings, listingId]);
    }
  };

  // Function to handle filter changes
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };


  const openDeleteModal = (listingId, title) => {
    setSelectedHouseTitle(title); 
    setSelectedHouseId(listingId);
    setDeleteModalIsOpen(true); 
  };

  const closeDeleteModal = () => {
    setDeleteModalIsOpen(false);
    setSelectedHouseTitle("");
    setSelectedHouseId(null);
  };

  const handleDeleteButtonClick = () => {
    // Implement your delete logic here based on selectedHouseId
    // After deletion, close the modal
    closeDeleteModal();
  };

  // Apply filters to listings
  // Apply filters and search to listings
  const filteredListings = listings.filter((listing) => {
    const { rooms, beds, baths, amenities, status } = filters;

    // Check if the listing matches the selected filters
    const matchesFilters =
      (rooms === "Any" || listing.bedroom === parseInt(rooms, 10)) &&
      (beds === "Any" || listing.beds === parseInt(beds, 10)) &&
      (baths === "Any" || listing.bathrooms === parseFloat(baths)) &&
      (amenities === "Any" || listing.amenities.includes(amenities)) &&
      (status === "Any" || listing.status === status);

    // Check if the listing matches the search query (title or location)
    const matchesSearch =
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilters && matchesSearch;
  });
  const isDeleteButtonVisible = selectedListings.length > 0; // Check if any checkbox is selected

  return (
    <div className="md:flex-col md:w-[80vw] md:mx-auto md:my-10 p-4 md:p-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-semibold mb-4">2 Listings</h1>
        </div>
        <div>
          <Link to="/HostHomes">
          
          <button className="border py-2 px-4 rounded-full">Create new listings</button>
          </Link>
        </div>
      </div>
      <div className="flex justify-end mb-4 cursor-pointer">
      {isDeleteButtonVisible && (
          <FiTrash2 onClick={() => openDeleteModal(selectedListings[0], selectedHouseTitle)} />
        )}      </div>
      <div className="flex  justify-between overflow-auto example space-x-2 items-center">
        <div className="mb-4 w-52">
          <div className="border p-2 rounded-full  flex space-x-2 items-center w-52">
          <FiSearch />
          <input
            type="text"
            name="search"
            id="search"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="search listings"
            className=""
          />
          </div>
       
        </div>
        <div className="mb-4">
          <select
            name="rooms"
            id="rooms"
            value={filters.rooms}
            onChange={handleFilterChange}
            className="border p-1 rounded-full"
          >
            <option value="Any">Rooms</option>
            <option value="Any">Any</option>
            <option value="1">1 Room</option>
            <option value="2">2 Rooms</option>
            <option value="3">3 Rooms</option>
            <option value="4">4 Rooms</option>

            <option value="5">5 Rooms</option>

            <option value="6">6 Rooms</option>
            <option value="7">7 Rooms</option>
            <option value="8">8 Rooms</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            name="beds"
            id="beds"
            value={filters.beds}
            onChange={handleFilterChange}
            className="border p-1 rounded-full"
          >
            <option value="Any">Beds</option>

            <option value="Any">Any</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            name="baths"
            id="baths"
            value={filters.baths}
            onChange={handleFilterChange}
            className="border p-1 rounded-full"
          >
            <option value="Any">Baths</option>
            <option value="Any">Any</option>

            <option value="1">1 Bath</option>
            <option value="2">2 Baths</option>
            <option value="2.5">2.5 Baths</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            name="amenities"
            id="amenities"
            value={filters.amenities}
            onChange={handleFilterChange}
            className="border p-1 rounded-full"
          >
            <option value="Any">Amenities</option>

            <option value="Any">Any</option>
            <option value="Pool">Pool</option>
            <option value="Gym">Gym</option>
            <option value="Parking">Parking</option>
          </select>
        </div>
        <div className="mb-4">
          <select
            name="status"
            id="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="border p-1 rounded-full"
          >
            <option value="Any">Status</option>

            <option value="Any">Any</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="In progress">In progress</option>
          </select>
        </div>
      </div>
      <div className="overflow-auto example shadow-md">
        <table className="md:w-full bg-white shadow-md border rounded-lg overflow-hidden">
          <thead className="bg-orange-400 text-white">
            <tr>
              <th className="py-2 px-4">Select</th>
              <th className="py-2 px-4">Image</th>
              <th className="py-2 px-4">Title</th>

              <th className="py-2 px-4">Listing Status</th>
              <th className="py-2 px-4">Instant Book</th>
              <th className="py-2 px-4">Bedrooms</th>
              <th className="py-2 px-4">Bathrooms</th>
              <th className="py-2 px-4">Location</th>
            </tr>
          </thead>
          <tbody className="">
            {filteredListings.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No listings found.
                </td>
              </tr>
            ) : (
              filteredListings.map((listing) => (
                <tr key={listing.id} className="text-center border">
                  <td className="py-2 px-4">
                    <input
                      className="h-5"
                      type="checkbox"
                      onChange={() => handleCheckboxChange(listing.id)}
                      checked={selectedListings.includes(listing.id)}
                    />
                  </td>
                  <td className="py-2 px-4  flex justify-center">
                    <img
                      src={listing.image}
                      alt={`Listing ${listing.id}`}
                      className="w-14 h-14 object-cover  rounded-lg"
                    />
                  </td>
                  <td className="py-2 px-4">
            <Link to="/HostHomes">{listing.title}</Link>
          </td>
                  <td className="py-2 px-4">{listing.status}</td>
                  <td className="py-2 px-4">{listing.instantBook}</td>
                  <td className="py-2 px-4">{listing.bedroom}</td>
                  <td className="py-2 px-4">{listing.bathrooms}</td>
                  <td className="py-2 px-4">{listing.location}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
  isOpen={deleteModalIsOpen}
  onRequestClose={closeDeleteModal}
  contentLabel="Delete Confirmation"
  style={{
    content: {
      height: "200px", 
      width: "300px",  
      margin: "auto",
      boxShadow:" 0 0 10px rgba(0, 0, 0, 0.2)",
    },
  }}
>
  <h2>Delete Confirmation</h2>
  <p>Are you sure you want to delete the listing "{selectedHouseTitle}"?</p>
  <div className="flex justify-between mt-4">
    <button onClick={handleDeleteButtonClick} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
      Confirm
    </button>
    <button onClick={closeDeleteModal} className="bg-gray-300  hover:bg-gray-400 text-gray-600 px-4 py-2 rounded-full">
      Cancel
    </button>
  </div>
</Modal>

<div className="mt-20">
  {filteredListings.length > 0 &&(

<PaginationExample/>
  )}

</div>
    </div>
  );
}
