import React, { useState } from "react";
import { Link } from "react-router-dom";
import SettingsNavigation from "./SettingsNavigation";
import EditLegalNameForm from "./EditLegalFormName";
import EditEmailAddress from "./EditEmailAddress";
import EditPhoneNumber from "./EditPhoneNumber";
import AddressForm from "./AddressForm";
import BottomNavigation from "../Navigation/BottomNavigation";
import Header from "../Navigation/Header";
import Footer from "../Navigation/Footer";
import GoBackButton from "../GoBackButton";

export default function Profile() {
  const [isEditingLegalName, setIsEditingLegalName] = useState(false);
  const [isEditingEmailName, setIsEditingEmailName] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const handleSaveLegalName = (updatedLegalName) => {
    console.log("Legal Name Updated:", updatedLegalName);
    setIsEditingLegalName(false);
  };

  const handleSaveEmailAddress = (updatedEmailAddress) => {
    console.log("Email Address Updated:", updatedEmailAddress);
    setIsEditingEmailName(false);
  };

  const handleSavePhoneNumber = (updatedEmailAddress) => {
    console.log("Email Address Updated:", updatedEmailAddress);
    setIsEditingPhoneNumber(false);
  };

  const handleSaveAddress = (updatedAddress) => {
    console.log("Address Updated:", updatedAddress);
    setIsEditingAddress(false);
  };

  const detailsArray = [
    {
      title: "Legal name",
      value: "User name",
      action: "Edit",
      link: "/edit-name",
    },
    {
      title: "Email address",
      value: "U***e@gmail.com",
      action: "Edit",
      link: "/edit-email",
    },
    {
      title: "Phone number",
      value: "+123 *** *** 7490",
      action: "Edit",
      link: "/edit-phone-number",
    },
    {
      title: "Government ID",
      value: "Not provided",
      action: "Add",
      link: "/AddGovvernmentId",
    },
    {
      title: "Address",
      value: "Not provided",
      action: "Edit",
      link: "/edit-address",
    },
    {
      title: "Emergency contact",
      value: "Not provided",
      action: "Add",
      link: "/add-emergency-contact",
    },
  ];

  return (
    <div>
      <div className="pb-48">
      <Header/>
      <div className="max-w-2xl mx-auto  p-4">
        <GoBackButton/>
        <SettingsNavigation title="Personal Info" text="Personal info" />

        <div>
          <p className="text-gray-400 font-normal text-base my-4">Here, you can manage your personal information and account preferences for a tailored experience with Shrbo.</p>
          <div className="tab">
            {isEditingLegalName && (
              <div className="max-w-2xl mx-auto p-4 shadow-md">
                <h2 className="text-2xl font-medium mb-4">Edit Legal Name</h2>
                <EditLegalNameForm
                  onCancel={() => setIsEditingLegalName(false)}
                  onSave={handleSaveLegalName}
                />
              </div>
            )}

            {isEditingEmailName && (
              <div className="max-w-2xl mx-auto p-4 shadow-md">
                <h2 className="text-2xl font-medium mb-4">
                  Edit Email Address
                </h2>
                <EditEmailAddress
                  onCancel={() => setIsEditingEmailName(false)}
                  onSave={handleSaveEmailAddress}
                />
              </div>
            )}

            {isEditingPhoneNumber && (
              <div className="max-w-2xl mx-auto p-4 shadow-md">
                <h2 className="text-2xl font-medium mb-4">Edit Phone Number</h2>
                <EditPhoneNumber
                  onCancel={() => setIsEditingPhoneNumber(false)}
                  onSave={handleSavePhoneNumber}
                />
              </div>
            )}

            {isEditingAddress && (
              <div className="max-w-2xl mx-auto p-4 shadow-md">
                <h2 className="text-2xl font-medium mb-4">Edit Address</h2>
                <AddressForm
                  onCancel={() => setIsEditingAddress(false)}
                  onSave={handleSaveAddress}
                />
              </div>
            )}

            {detailsArray.map((detail, index) => (
              <div
                className="flex justify-between items-center py-5 border-b"
                key={index}
              >
                <div>
                  <div>
                    <section>
                      <h2>{detail.title}</h2>
                    </section>
                  </div>
                  <div>
                    <span>{detail.value}</span>
                  </div>
                </div>
                <div>
                  {detail.action === "Edit" ? (
                    <button
                      className="underline"
                      onClick={() => {
                        if (detail.link === "/edit-name") {
                          setIsEditingLegalName(true);
                        } else if (detail.link === "/edit-email") {
                          setIsEditingEmailName(true);
                        } else if (detail.link === "/edit-phone-number") {
                          setIsEditingPhoneNumber(true);
                        } else if (detail.link === "/edit-address") {
                          setIsEditingAddress(true);
                        }
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <Link className="underline" to={detail.link}>
                      Add
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
      <BottomNavigation/>
      <Footer/>
    </div>
  );
}
