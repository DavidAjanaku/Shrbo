import React, { useState } from 'react';
import HostHeader from './Navigation/HostHeader';
import Footer from './Navigation/Footer';
import BottomNavigation from './Navigation/BottomNavigation';

const ReportDamage = () => {
  const [damageDescription, setDamageDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [bookingNumber, setBookingNumber] = useState('');

  const handleDamageDescriptionChange = (event) => {
    setDamageDescription(event.target.value);
  };

  const handlePhotoUpload = (event) => {
    // Assuming a single photo upload for simplicity
    const photo = event.target.files[0];
    setPhotos([...photos, photo]);
  };

  const handleBookingNumberChange = (event) => {
    const input = event.target.value;

    // Validate booking number using regex
    const bookingNumberRegex = /^[0-9]+$/;
    if (bookingNumberRegex.test(input) || input === '') {
      setBookingNumber(input);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the report to the server or take appropriate actions
    const reportData = {
      damageDescription,
      photos,
      bookingNumber,
    };

    // Add logic to handle the submission, e.g., API call

    // Reset the form after submission
    setDamageDescription('');
    setPhotos([]);
    setBookingNumber('');
  };

  return (
    <>
      <HostHeader />
      <div className="">
        <div className="max-w-md mx-auto mt-8 p-4 py-10 pb-32 bg-white ">
          <h2 className="text-3xl font-semibold mb-4">Report Property Damage</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Damage Description:
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 h-48 rounded"
                value={damageDescription}
                onChange={handleDamageDescriptionChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Photos:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Booking Number:
              </label>
              <input
                className="w-full p-2 border border-gray-300 rounded"
                type="text"
                value={bookingNumber}
                onChange={handleBookingNumberChange}
              />
            </div>
            <button
              className="bg-orange-400 text-white py-2 px-4 rounded hover:bg-orange-500"
              type="submit"
            >
              Submit Report
            </button>
          </form>
        </div>
      </div>

      <BottomNavigation />
      <Footer />
    </>
  );
};

export default ReportDamage;
