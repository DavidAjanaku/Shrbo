import React, { useEffect, useRef, useState } from "react";
import MainSlider from "./MainSlider";
import ThumbnailSlider from "./ThumbnailSlider";
import { useParams } from "react-router-dom";
import Axios from "../../Axios";
import { useStateContext } from "../../ContextProvider/ContextProvider";

const SliderFull = () => {
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const { id } = useParams(); // Get the ID parameter from the route
  const [pics, setPics] = useState([]);
  const { token } = useStateContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListingDetails = async () => {
      let response;
      try {
        setLoading(true);
        if (token) {
          // If token exists, fetch details for authenticated user
          response = await Axios.get(`showGuestHomeForAuthUser/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else {
          // If token doesn't exist, fetch details for unauthenticated user
          response = await Axios.get(`showGuestHomeForUnAuthUser/${id}`);
        }
        const formattedPics = response.data.data.hosthomephotos.map((url, index) => ({
          id: index + 1,
          min: url.images,
        }));
        const formattedVideo = {
          id: "video",
          min: response.data.data.hosthomevideo,
          pic: response.data.data.hosthomephotos[0].images,
        };
        setPics([formattedVideo, ...formattedPics]);
      } catch (error) {
        console.error("Error fetching listing details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListingDetails();
  }, [id, token]);

  useEffect(() => {
    if (slider1.current && slider2.current) {
      slider1.current.sync(slider2.current.splide);
    }
  }, [slider1, slider2, pics]);

  return (
    <div className="w-full relative pt-6 gap-[10px] h-full flex flex-col justify-between">
      {!loading ? (
        <>
          <MainSlider slider1={slider1} pics={pics} />
          <ThumbnailSlider slider2={slider2} pics={pics} />
        </>
      ) : (
        <div className="mt-5 w-full">
          <div className="w-full mx-auto">
            {/* Skeleton Loader */}
            <div className="animate-pulse w-full">
              <div className="h-full w-full gap-2">
                <div className="bg-gray-300 w-full h-64 rounded-md mb-4"></div>
                <div className="grid grid-cols-4 gap-2 mb-4 w-full">
                  <div className="bg-gray-300 h-16 rounded-md"></div>
                  <div className="bg-gray-300 h-16 rounded-md"></div>
                  <div className="bg-gray-300 h-16 rounded-md"></div>
                  <div className="bg-gray-300 h-16 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderFull;
