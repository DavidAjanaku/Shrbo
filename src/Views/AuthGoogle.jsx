import React, {useEffect,useState,useRef} from "react";
import axios from '../Axios.js'





const AuthGoogle=()=>{
    const goHome=useRef(null);
    useEffect(()=>{
        try {
            axios.get("/auth/callback").then(response=>{
                console.log(response.data);

              goHome.current.click();
            });
            
            
            
            ;
        } catch (error) {

            console.log("Error: ",error)
            
        }


    })

    return(
        <>
        <a href="/" ref={goHome}  ></a>
        
        </>

    );

} 
export default AuthGoogle;