import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsHouseDoor, BsArrowBarRight } from "react-icons/bs"; // Import the icons
import rightArrow from "../../assets/svg/line-angle-right-icon.svg";
import defaultProfile from "../../assets/svg/avatar-icon.svg";

export default function HostModal({ isOpen, onClose }) {
  const [profilePicture, setProfilePicture] = useState(defaultProfile);

  return (
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center md:z-[99] text-black">
        <div className="bg-white w-full   p-4 z-[999] h-full  overflow-auto">
          <div className="text-black md:w-2/4  p-3 pb-32">
            <h1 className="text-2xl font-bold">Menu</h1>

            <div>
              <section className="bg-orange-400 p-2 rounded-lg my-10">
                <div>
                  <Link to="/UsersShow" className="flex flex-wrap space-y-2  items-center space-x-4">
                    <div>
                    <label htmlFor="profilePictureInput" className="w-fit">
                      <div
                        className="cursor-pointer bg-slate-200"
                        style={{
                          backgroundImage: `url(${profilePicture})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                      >
                        {!profilePicture && (
                          <img
                            src={defaultProfile}
                            alt="Default Profile"
                            width="100"
                            height="100"
                          />
                        )}
                      </div>
                    </label>
                    </div>
                    <div>
                      <h1 className="text-white text-2xl">
                      Welcome Endo
                      </h1>
                    </div>
                  </Link>
                </div>
              </section>
              <section>
                <ul>

                <li>
                    <div className=" p-4 my-4">
                      <Link to="/HostHomes" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                         Create a new listing
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link to="/EditHomepage" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                        Dashboard
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className="shadow-lg p-4 my-4 border rounded-xl">
                      <Link to="/Listings" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-lg p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">Listings</div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link to="/Profile" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Personal Info
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link to="/TransactionHistory" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Transaction History
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link to="/Payments" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                         Payments
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Reservations{" "}
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link to="/Security" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Security{" "}
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
              <h1 className="text-2xl my-10">Hosting</h1>
                <ul>
                  <li>
                    <div className=" p-4 my-4">
                      <Link to="/hosting" className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Manage your listing{" "}
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                </ul>
              </section>

              <section>
              <h1 className="text-2xl my-10">Support</h1>
                <ul>
                  <li>
                    <div className=" p-4 my-4">
                      <Link className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Visit help center{" "}
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>

                  <li>
                    <div className=" p-4 my-4">
                      <Link className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Report a neighborhood concern
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          How Shbro works
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className=" p-4 my-4">
                      <Link className="flex justify-between cursor-pointer items-center">
                        <div className="bg-orange-400 text-white rounded-full p-2">
                          <BsHouseDoor />
                        </div>
                        <div className="text-base text-slate-500 text-center">
                          Get help with a safety issue
                        </div>
                        <div className="text-2xl">
                          <img src={rightArrow} className="w-4 h-4" alt="" />
                        </div>{" "}
                        {/* Right arrow icon */}
                      </Link>
                    </div>
                  </li>
                </ul>
              </section>
              <div className="text-center">
                <button className="border w-full p-2 my-2">Log out</button>
              </div>
            </div>
          </div>
          <button className="text-blue-500" onClick={onClose}>
            Close Modal
          </button>
        </div>
      </div>
    )
  );
}
