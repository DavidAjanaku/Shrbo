import React from "react";
import SignUp from "../Component/SignupLogin/SignUp";
import Login from  "../Component/SignupLogin/Login";


const Registration=()=>{

    return(<div className=" min-h-screen flex ">
        {/* <SignUp/> */}
        <Login/>
        {/* <ForgotPassword/> */}
        {/* <SetNewPassword/> */}
        {/* <div className="w-1/2">
            <div> <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /></div>
            <div></div>
            <div></div>



        </div> */}

    </div>);
}


export default Registration;