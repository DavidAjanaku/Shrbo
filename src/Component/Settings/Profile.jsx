import React, { useState,useEffect } from "react";
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
import axios from '../../Axios';
import { useStateContext } from "../../ContextProvider/ContextProvider";


export default function Profile() {
  const [isEditingLegalName, setIsEditingLegalName] = useState(false);
  const [isEditingEmailName, setIsEditingEmailName] = useState(false);
  const [isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const {user,setUser,setHost,setAdminStatus}=useStateContext();
  const [reRender,setRerender]=useState(false)

  // const [visible, setVisible] = useState(false);
  // const handleClose = () => {
  //   setVisible(false);   
  // };
  
  const handleSaveLegalName =async (updatedLegalName) => {
    console.log("Legal Name Updated:", updatedLegalName);
    
    // try {
    //   const response= await axios.put(`/userDetail/${user.id}`,{
    //     firstName:updatedLegalName.firstName,
    //     lastName:updatedLegalName.lastName
    //   }
    //   );
    //   console.log('PUT request successful for Name', response.data);
    // } catch (error) {
    //   console.error('Error making PUT request', error);
    // }

    const data={
      firstName:updatedLegalName.firstName,
      lastName:updatedLegalName.lastName
    }

    updateData(data)


    
    // setVisible(true);
    setIsEditingLegalName(false);


  };

  const handleSaveEmailAddress = async (updatedEmailAddress) => {
    console.log("Email Address Updated:", updatedEmailAddress);
      
    // try {
    //   const response= await axios.put(`/userDetail/${user.id}`,{
    //     email:updatedEmailAddress
    //   }
    //   );
    //   console.log('PUT request successful for Email', response.data);
    // } catch (error) {
    //   console.error('Error making PUT request', error);
    // }

    const data={
      email:updatedEmailAddress
    }

    updateData(data)

    setIsEditingEmailName(false);
  };

  const handleSavePhoneNumber = (updatedPhoneNumber) => {
    console.log("Email Address Updated:", updatedPhoneNumber);

    // try {
    //   const response= await axios.put(`/userDetail/${user.id}`,{
    //     phone:updatedPhoneNumber
    //   }
    //   );
    //   console.log('PUT request successful for Number', response.data);
    // } catch (error) {
    //   console.error('Error making PUT request', error);
    // }
    let stringNumber = updatedPhoneNumber.toString();

    const data={
      phone:stringNumber
    }

    updateData(data)

    setIsEditingPhoneNumber(false);
  };

  const handleSaveAddress = (updatedAddress) => {
    console.log("Address Updated:", updatedAddress);

    // try {
    //   const response= await axios.put(`/userDetail/${user.id}`,{
    //     street:updatedAddress.street,
    //     city:updatedAddress.city,
    //     state:updatedAddress.state,
    //     country:updatedAddress.country,
    //     zipCode:updatedAddress.zipCode     
    //   }
    //   );
    //   console.log('PUT request successful for Email', response.data);
    // } catch (error) {
    //   console.error('Error making PUT request', error);
    // }
    const data={
      street:updatedAddress.street,
      city:updatedAddress.city,
      state:updatedAddress.state,
      country:updatedAddress.country,
      zipCode:updatedAddress.zipCode     
    }

    updateData(data)

    setIsEditingAddress(false);
  };

  const updateData=async(data)=>{
    try {
      const response= await axios.put(`/userDetail/${user.id}`,data);
      console.log('PUT request successful for Email', response.data);
    } catch (error) {
      console.error('Error making PUT request', error);
    }finally{
      setRerender(true);
    }
  }




  const detailsArray = [
    {
      title: "Legal name",
      value: user.name||"User name",
      action: "Edit",
      link: "/edit-name",
    },
    {
      title: "Email address",
      value: user.email||"U***e@gmail.com",
      action: "Edit",
      link: "/edit-email",
    },
    {
      title: "Phone number",
      value: user.phone||"Not provided",
      action: "Edit",
      link: "/edit-phone-number",
    },
    {
      title: "Government ID",
      value: user.goverment_id||"Not provided",
      action: "Add",
      link: "/AddGovvernmentId",
    },
    {
      title: "Address",
      value: user.street?`${user.street} ${user.city} ${user.state} ${user.country} `:"Not provided",
      action: "Edit",
      link: "/edit-address",
    },
    {
      title: "Emergency contact",
      value: user.emergency_no||"Not provided",
      action: "Add",
      link: "/add-emergency-contact",
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to get the user data
        const response = await axios.get('/user'); // Adjust the endpoint based on your API
        

        // Set the user data in state
        setUser(response.data);
        setHost(response.data.host);
        setAdminStatus(response.data.adminStatus);
      

      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        // Set loading to false regardless of success or error
        // setLoading(false);
        setRerender(false);
      }
    };

    fetchUserData();
  }, [reRender]); 


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
              //for skeleton loader
             user.name ? <div
                className={`flex justify-between items-center py-5 border-b `}
                key={index}
              >
                <div>
                  <div>
                    <section>
                      <h2>{detail.title}</h2>
                    </section>
                  </div>
                  <div className="">
                    <label className={` ${(detail.value=="Not provided")?"text-red-500":"text-black"} `} >{detail.value}</label>
                  </div>
                </div>
         {!(detail.title=="Email address"&&user.google_id)?
                <div>
                  {detail.action === "Edit" ? (
                    <button
                      className="underline"
                      onClick={() => {
                        window.scrollTo(0, 4);
                        if (detail.link === "/edit-name") {
                          setIsEditingLegalName(true);
                          setIsEditingEmailName(false);
                          setIsEditingPhoneNumber(false);
                          setIsEditingAddress(false);
                        } else if (detail.link === "/edit-email") {
                          setIsEditingEmailName(true);
                          setIsEditingLegalName(false);
                          setIsEditingPhoneNumber(false);
                          setIsEditingAddress(false);
                        } else if (detail.link === "/edit-phone-number") {
                          setIsEditingPhoneNumber(true);
                          setIsEditingLegalName(false);
                          setIsEditingEmailName(false);
                          setIsEditingAddress(false);
                        } else if (detail.link === "/edit-address") {
                          setIsEditingAddress(true);
                          setIsEditingLegalName(false);
                          setIsEditingEmailName(false);
                          setIsEditingPhoneNumber(false);
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
                    :""}
              </div>
              :
              <span key={index} className={`skeleton-loader text-transparent h-14 w-full `}></span>
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
