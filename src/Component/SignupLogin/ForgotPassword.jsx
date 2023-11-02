import React from "react";
import google from "../../assets/google.png"
import { useState } from "react";
import {  notification} from 'antd';


const ForgotPassword=()=>{
    const [email,setEmail]=useState('');
    const handleSubmmit=()=>{

        console.log("wwwwww")
        // openNotificationWithIcon("success")


    } 


    return(
        
        <div className="flex  h-full flex-col justify-center   px-6 py-12 lg:px-8">
             {/* {contextHolder} */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl md:text-3xl font-bold leading-9  text-gray-900">
            Forgot password?
          </h2>
          <h3 className="text-center mt-1 px-3  tracking-tight text-gray-400" >No worries, we'll semd you reset instructions. </h3>
        </div>

   

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-5"    onSubmit={handleSubmmit}  >

         

            <div>
              <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  onChange={(e)=>setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>


            {/* <div className="text-sm  text-right">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div> */}

            <div>
              <button
                type="submit"
             
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 "
              >
                 Reset password 
              </button>
            </div>
          </form>

      
          <div className=" pr-[18px] text-center w-full   md:block cursor-pointer md:relative mt-10  text-sm text-gray-500 ">
            <button className=" flex gap-2 w-full justify-center    " >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill=" grey "
              >
                <title>keyboard-backspace</title>
                <path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
              </svg>
              <a href="#" className="font-semibold leading-6 ">
                Back to log in
            </a>
            </button>
            </div>
            
        
        </div>
      </div>
    
    );





}
export default ForgotPassword;