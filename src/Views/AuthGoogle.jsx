import React, { useEffect, useRef } from "react";
import axios from "../Axios.js";

const AuthGoogle = () => {
  const goHome = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the query string from the current URL
        const queryString = window.location.search;

        // Append the query string to the request URL
        const response = await axios.get(`/auth/callback${queryString}`);

        console.log(response.data);

             // Extract the access token from the response
             const accessToken = response.data.access_token;

                // Store the access token in local storage
        localStorage.setItem('access_token', accessToken);

        goHome.current.click();


      } catch (error) {
        console.log("Error: ", error);
      }
    };

    fetchData();
  }, []);

  return <a href="/" ref={goHome}></a>;
};

export default AuthGoogle;
