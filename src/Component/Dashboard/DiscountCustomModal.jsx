import React, { useState } from "react";

const DiscountCustomModal = ({ visible, onClose, onSubmit }) => {
  const [discountDuration, setDiscountDuration] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");

  const handleCancel = () => {
    onClose();
  };

  const handleOK = () => {
    // Calculate and set the discount based on the selected duration and percentage
    const discount = `${discountPercentage}%`;

    if (discountDuration === "7") {
      // Weekly discount
      // Calculate and set the weekly discount
      // For example, update the state or make an API request
    } else if (discountDuration === "28") {
      // Monthly discount
      // Calculate and set the monthly discount
      // For example, update the state or make an API request
    }

    onSubmit(discount);
    onClose();
  };

  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 ${visible ? "" : "hidden"}`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-1/2 rounded shadow-md">
        <span className="absolute top-4 right-4 cursor-pointer text-xl" onClick={handleCancel}>
          &times;
        </span>
        <h2 className="text-2xl mb-4">Set Discounts</h2>
        <div className="mb-4">
          <p>Select duration:</p>
          <select
            value={discountDuration}
            onChange={(e) => setDiscountDuration(e.target.value)}
            className="w-full p-2 border rounded"
          >
             <option value="1">1 week</option>
            <option value="2">2 weeks</option>
            <option value="3">3 weeks</option>
          </select>
        </div>
        <div className="mb-4">
          <p>Discount percentage:</p>
          <input
            type="number"
            placeholder="Enter discount percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <button onClick={handleOK} className="bg-orange-500 text-white p-2 rounded cursor-pointer">Submit</button>
          <button onClick={handleCancel} className="bg-gray-300 text-gray-700 p-2 rounded cursor-pointer ml-2">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DiscountCustomModal;
