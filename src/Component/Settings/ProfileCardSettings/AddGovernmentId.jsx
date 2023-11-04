import React, { useState, useRef } from "react";
import SettingsNavigation from "../SettingsNavigation";
import GoBackButton from "../../GoBackButton";
import { Select } from "antd";
import * as faceapi from "face-api.js"; // Import face-api.js
const { Option } = Select;

export default function AddGovernmentId() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [submittedImages, setSubmittedImages] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const videoRef = useRef(null);

  const handleDocumentChange = (value) => {
    setSelectedDocument(value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      addToSubmittedImages(URL.createObjectURL(file));
      detectFace(file); // Detect face in the uploaded image
    }
  };

  const addToSubmittedImages = (image) => {
    setSubmittedImages((prevImages) => [...prevImages, image]);
  };

  // Function to start the camera for face capture
  const startCamera = async () => {
    if (navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error starting camera:", error);
      }
    } else {
      console.error("getUserMedia is not supported.");
    }
  };

  // Function to capture a photo from the camera feed
  const capturePhoto = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL("image/jpeg");
      setUploadedImage(dataUrl);
      addToSubmittedImages(dataUrl);
      detectFace(dataUrl);

      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const detectFace = async (image) => {
    await loadModels();

    const canvas = faceapi.createCanvasFromMedia(image);
    document.body.append(canvas);
    const displaySize = { width: image.width, height: image.height };
    faceapi.matchDimensions(canvas, displaySize);

    const detections = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    if (detections.length > 0) {
      setMessage("Face detected!");
    } else {
      setMessage("No face detected.");
    }
  };

  const loadModels = async () => {
    await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
    await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
    await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
  };

  const handleSubmit = () => {
    console.log("Selected Document:", selectedDocument);
    console.log("Uploaded Image:", uploadedImage);
    console.log("Submitted Images:", submittedImages);
  };

  return (
    <div className="container max-w-2xl mx-auto p-4">
      <GoBackButton />
      <SettingsNavigation title="Government Info" text="Government info" />
      <h1 className="text-2xl font-bold">Upload Government ID Card</h1>
      <p className="mt-2 text-gray-600">
        It looks like this isn't a photo of a valid form of ID. Please provide a
        photo of the type of ID you selected. If this is incorrect, try taking
        another photo and make sure the information on your ID is clearly
        visible.
      </p>
      <Select
        value={selectedDocument}
        onChange={handleDocumentChange}
        className="mt-4"
        placeholder="Select identity document to upload"
      >
        <Option value="driversLicense">Driver's License</Option>
        <Option value="passport">International Passport</Option>
        <Option value="nationalIDCard">National Identity Card</Option>
        <Option value="nationalIDNumber">
          National Identity Number (Slip)
        </Option>
      </Select>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      <div className="mt-4">
        <video ref={videoRef} autoPlay playsInline className="w-full rounded" />
        <div className="flex justify-between mt-2">
          <button
            onClick={startCamera}
            className="w-1/2 p-2 m-2 bg-orange-400 text-white rounded hover m-2:bg-orange-500"
          >
            Start Camera
          </button>
          <button
            onClick={capturePhoto}
            className="w-1/2 p-2 m-2 bg-orange-400 text-white rounded hover m-2:bg-orange-500"
          >
            Capture Photo
          </button>
        </div>
      </div>
      {submittedImages.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Submitted Images:</h2>
          {submittedImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Submitted Image ${index}`}
              className="mt-2 w-full max-w-md rounded"
            />
          ))}
        </div>
      )}
      {message && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Message:</h2>
          <p className="mt-2">{message}</p>
        </div>
      )}
      {confirmationMessage && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Confirmation:</h2>
          <p className="mt-2">{confirmationMessage}</p>
        </div>
      )}
      <button
        onClick={handleSubmit} // Call the handleSubmit function on button click
        className="mt-4 p-2 bg-orange-400 text-white rounded hover:bg-orange-500"
      >
        Submit
      </button>
    </div>
  );
}
