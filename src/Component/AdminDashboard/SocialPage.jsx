import React, { useState } from "react";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function SocialPage() {
  const [links, setLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can save the links using an API call or other method
    console.log("Submitting links:", links);
    // Optionally, clear the form after submission
    setLinks({
      facebook: "",
      instagram: "",
      twitter: "",
    });
  };

  return (
    <div className="bg-gray-100 h-[100vh]">
      <AdminHeader />
      <div className="flex">
        <div className="bg-orange-400 overflow-scroll example text-white hidden md:block md:w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>
        <div className="w-full md:w-4/5 p-4 h-[100vh] overflow-auto example">
          <h2 className="text-lg font-semibold mb-4">Social Media Links</h2>
          <p className="text-gray-400 text-sm mb-4">
            The Social Page is where you can manage the links to your website's
            Facebook, Instagram, and Twitter accounts. It provides a simple form
            where you can enter or update these links. This helps keep your
            website connected to your social media presence without needing to
            edit the website directly.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="facebook" className=" mb-2 flex items-center gap-2">
              <FaFacebook/>    Facebook: 
              </label>
              <input
                type="text"
                id="facebook"
                name="facebook"
                value={links.facebook}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="instagram" className=" mb-2 flex items-center gap-2">
           <FaInstagram/>     Instagram:
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                value={links.instagram}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="twitter" className=" mb-2 flex items-center gap-2">
             <FaTwitter/>   X:
              </label>
              <input
                type="text"
                id="twitter"
                name="twitter"
                value={links.twitter}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
