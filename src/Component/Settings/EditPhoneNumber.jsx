import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css'

import React, { useState } from "react";

const EditPhoneNumber = ({ onCancel, onSave }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
    onSave({ phoneNumber });
  };

  return (
    <form name="legalName" onSubmit={handleSubmit}>
     <PhoneNumberValidation phoneNumber={phoneNumber} setPhoneNumber={(a)=>{setPhoneNumber(a)}}/>
   
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





const PhoneNumberValidation = ({phoneNumber,setPhoneNumber}) => {
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [valid, setValid] = useState(true);

  const handleChange = (value) => {
    setPhoneNumber(value);
    setValid(validatePhoneNumber(value));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberPattern = /^\+?[1-9]\d{1,14}$/;

    return phoneNumberPattern.test(phoneNumber);
  };

  return (
    <div>
      <label>
        {/* Phone Number: */}
        <PhoneInput
          country={'ng'}
          enableSearch
          placeholder={'00-000-00'}
          countryCodeEditable={false}
          value={phoneNumber}
          onChange={handleChange}
          inputProps={{
            required: true,
          }}
          isValid={(value, country) => {
            if (value.match(/12345/)) {
              return 'Invalid value: '+value+', '+country.name;
            } else if (value.match(/1234/)) {
              return false;
            } else {
              return true;
            }
          }}
        />
      </label>
      {!valid && (
        <p>Please enter a valid phone number.</p>
      )}
    </div>
  );
};
