import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminNavigation/AdminHeader";
import bellIcon from "../../assets/svg/bell-icon.svg"

export default function EditHomepage() {
  const [image, setImage] = useState(""); // State for the homepage image URL
  const [title, setTitle] = useState(""); // State for the title text
  const [subtitle, setSubtitle] = useState(""); // State for the subtitle text

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubtitleChange = (e) => {
    setSubtitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked");
    console.log("Submitted Details:");
    console.log("Homepage Image:", image);
    console.log("Title Text:", title);
    console.log("Subtitle Text:", subtitle);
  };

  return (
    <div className="bg-gray-100 h-[100vh]">
<AdminHeader/>
      <div className="flex">
        <div className="hidden  md:block bg-orange-400 text-white w-1/5 h-[100vh] p-4">
          <AdminSidebar />
        </div>

        <div className="md:w-4/5 w-full p-4 h-[100vh]">
          <h1 className="text-2xl font-semibold mb-4">Edit Homepage</h1>
          <div className="bg-white p-4 rounded shadow">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Homepage Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="mt-1 p-2 border rounded w-full"
                  onChange={handleImageChange}
                />
              </div>

                {image ? (
                       <img
                       src={image}
                       alt="Selected Image"
                       className="mb-4 w-48 rounded-md"
                     />
                ):(
                    <div className="text-gray-600 mb-4">No image selected</div>

                )}
           

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title Text
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  value={title}
                  onChange={handleTitleChange}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subtitle Text
                </label>
                <input
                  type="text"
                  className="mt-1 p-2 border rounded w-full"
                  value={subtitle}
                  onChange={handleSubtitleChange}
                />
              </div>

              <button
                type="submit"
                className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
