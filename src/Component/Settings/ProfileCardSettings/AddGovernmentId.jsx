import React, { useState } from 'react';
import SettingsNavigation from '../SettingsNavigation';
import GoBackButton from '../../GoBackButton';

export default function AddGovernmentId() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [cameraImage, setCameraImage] = useState(null);
  const [message, setMessage] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [submittedImages, setSubmittedImages] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Simulate uploading the image to a server (replace with actual API call)
      uploadImageToServer(file)
        .then(() => {
          setUploadedImage(URL.createObjectURL(file));
          setMessage(
            "It looks like this isn’t a photo of a valid form of ID. Please provide a photo of the type of ID you selected. If this is incorrect, try taking another photo and make sure the information on your ID is clearly visible."
          );
          addToSubmittedImages(URL.createObjectURL(file));
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
    }
  };

  const handleCameraSnap = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      const mediaStreamTrack = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(mediaStreamTrack);

      const photoBlob = await imageCapture.takePhoto();
      const photoUrl = URL.createObjectURL(photoBlob);

      setCameraImage(photoUrl);
      addToSubmittedImages(photoUrl);
    } catch (error) {
      console.error('Error capturing image:', error);
    }
  };

  const uploadImageToServer = (file) => {
    // Simulate uploading the image to a server (replace with actual API call)
    return new Promise((resolve, reject) => {
      // Simulating a delay for the upload
      setTimeout(() => {
        console.log('Image uploaded successfully:', file);
        resolve();
      }, 2000);
    });
  };

  const addToSubmittedImages = (image) => {
    setSubmittedImages((prevImages) => [...prevImages, image]);
  };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <GoBackButton />
      <SettingsNavigation title="Government Info" text="Government info" />
      <h1 className="text-2xl font-bold">Upload Government ID Card</h1>
      <p>
        It looks like this isn’t a photo of a valid form of ID. Please provide a
        photo of the type of ID you selected. If this is incorrect, try taking
        another photo and make sure the information on your ID is clearly
        visible.
      </p>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-4 p-2 border border-gray-300 rounded"
      />

      <button
        onClick={handleCameraSnap}
        className="mt-4 p-2 bg-blue-400 text-white rounded hover:bg-blue-500"
      >
        Take Photo with Camera
      </button>

      {submittedImages.length > 0 && (
  <div className="mt-4">
    <h2 className="text-xl font-semibold">Submitted Images:</h2>
    {submittedImages.map((image, index) => (
      <img key={index} src={image} alt={`Submitted Image ${index}`} className="mt-2 max-w-md" />
    ))}
  </div>
)}

      {message && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Error Message:</h2>
          <p className="mt-2 text-red-500">{message}</p>
        </div>
     ) }

      {confirmationMessage && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Confirmation:</h2>
          <p className="mt-2 text-green-500">{confirmationMessage}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        onClick={() => {
          // Log the uploaded image and camera image when the submit button is clicked
          console.log('Uploaded Image:', uploadedImage);
          console.log('Camera Image:', cameraImage);
          console.log('Submitted Images:', submittedImages);
        }}
        className="mt-4 p-2 bg-orange-400 text-white rounded hover-bg-orange-500"
      >
        Submit
      </button>
    </div>
  );
}
