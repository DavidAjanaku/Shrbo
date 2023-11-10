import React from "react";
import google from "../../assets/google.png"
import logo from "../../assets/logo.png"
import { useState } from "react";
import {  notification} from 'antd';
import { Link } from "react-router-dom";

const Login=()=>{   

    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
  

    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type) => {
        api[type]({
        message: 'Notification Title',
        description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement:'bottom',
        className:'bg-green'
    });
    };

    const handleSubmmit=()=>{

        console.log("wwwwww")
        openNotificationWithIcon("success")


    } 




    return(
    
    
        <div className="flex h-full max-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
             {contextHolder}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl md:text-2xl font-medium leading-9  text-gray-900">
            Create an account
          </h2>
          <h3 className="text-center mt-1 px-3  tracking-tight text-gray-400" >Please complete the registration process to create an account. </h3>
        </div>

   

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm px-1">
          <form className="space-y-5"    onSubmit={handleSubmmit}  >

          <div>
              <button
                type="submit"
                className="flex w-full mb-2 gap-1 justify-center rounded-md border-0 ring-2 ring-inset ring-gray-300   px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-50"
              >
                <img width={"24px"} height={"24px"} src={google} />
                <span>Sign in with Google   </span>
              </button>
            </div>
                                      
      <div
        className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p
          className="mx-4 mb-0 text-gray-500 text-sm text-center font-semibold ">
          or
        </p>
      </div>
            <div>
              <label htmlFor="Fullname" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="Fullname"
                  name="Fullname"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter Name"
                  onChange={(e)=>setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-2  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
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
                  className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
             
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

      

            <div>
              <button
                type="submit"
             
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-base font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 "
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account? {' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Log in
            </a>
          </p>
        </div>

        <div className="mt-3 text-center text-xs sm:mx-auto sm:w-full sm:max-w-sm">
          <label>
            By singing up,you have read and agree to our  
            <Link to={"/TermsofService"} className=" text-indigo-600 hover:underline " > Terms & Conditions</Link> and  
            <Link to={"/PrivacyPolicy"} className=" text-indigo-600 hover:underline " > Privacy policy</Link>.

          </label>
        </div>



      </div>
    
    )



}


export default Login;