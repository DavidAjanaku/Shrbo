
import React, { useState } from "react";

const EditPhoneNumber = ({ onCancel, onSave }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    onSave({ phoneNumber });
  };

  return (
    <form name="legalName" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="first_name" className="block font-medium">
          Phone Number
        </label>
        <input
          type="text"
          id="phone_number"
          name="phone_number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border rounded-md py-2 px-3 w-full"
          required
        />
      </div>
   
      <div className="text-right">
        <button
          type="button"
          className="text-gray-500 mr-4"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className="bg-orange-400 text-white rounded-md py-2 px-4">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditPhoneNumber;
