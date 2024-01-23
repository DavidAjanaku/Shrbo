import React,{useState,useEffect,useRef} from "react";
import logo from "../assets/logo.png"
import google from "../assets/google.png"
import { Link } from "react-router-dom";
import axios from "../Axios.js"
import {  notification} from 'antd';
import { useStateContext } from "../ContextProvider/ContextProvider.jsx";

const LogIn=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [googleUrl,setGoogleUrl]=useState('');
    // const [userData,setUserData]=useState([]);
   
    const goHome=useRef();
    // const [token,setToken]=useState([]);
    const { setUser, setToken } = useStateContext();

    useEffect(()=>{

      try {
        // Make a GET request to the Google OAuth endpoint
         axios.get("/auth").then(response=>{
           setGoogleUrl(response.data.url);
           console.log(response.data)
        
       });;
    
        // // Redirect the user to the Google sign-in page
        // if(response.data.url){
        //   window.location.href = response.data.url;

        // }
      } catch (error) {
        console.error('Error:', error);
        // Handle error if needed
      }

    },[]);


    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type,error) => {
        api[type]({
        message: type==="error"?'Error':"Succesfull",
        description:error,
        placement:'topRight',
        className:'bg-green'
    });
    };



    const handleSubmmit= async(e)=>{
      e.preventDefault();
      try {
        const response= await axios.post("/login",
          {
            email,
            password
          }
  
        );
        
        openNotificationWithIcon("success");
        if(response.data){
          
          setUser(response.data.user);
          setToken(response.data.token);
          console.log(response.data);
          window.location.replace('/');

        

        }
      } catch (error) {
        console.error('Error:', error);
        
        if(error.response.data.message){
          openNotificationWithIcon("error",error.response.data.message);

        }else{

          openNotificationWithIcon("error",error.response.data);
        }
        
      }
      // console.log(userData);
      // console.log(token)

    }

 



    





    return(
    
    
        <div className="flex h-full lg:max-h-screen flex-1 flex-col lg:justify-center px-6 py-16 lg:py-10 bg-slate-50/30 lg:px-8">
          {contextHolder}
        <div className="sm:mx-auto  sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16   w-auto"
            src={logo}
            alt="Your Company"
          />
          <h2 className="mt-2 text-center text-2xl md:text-2xl font-medium leading-9  text-gray-900">
            Sign in to Shrbo
          </h2>
          <h3 className="text-center mt-1  tracking-tight text-gray-400" >Kindly log in to gain access to your account</h3>
        </div>

   

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm border rounded lg:bg-blend-darken bg-white      p-6 lg:p-8">
          <div>
            <a href={googleUrl} >

              <button
                type="submit"
                className="flex w-full gap-1 justify-center rounded-md border-0 ring-2 ring-inset ring-gray-300   px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-50"
                >
                <img width={"24px"} height={"24px"} src={google} />
                <span>Sign in with Google   </span>
              </button>
                </a>
            </div>
                                      
          <form className="space-y-5"  onSubmit={handleSubmmit}>

      <div
        className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p
          className="mx-4 mb-0 text-gray-500 text-sm text-center font-semibold ">
          or
        </p>
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
                  className="block w-full rounded-md border px-2 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-orange-300 focus:border-2  sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border px-2 py-2 text-gray-900 shadow-sm  focus:border-orange-300 focus:border-2  placeholder:text-gray-400  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="text-sm  text-right">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-orange-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 "
              >
                Log in
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            Not a member of <span className=" text-slate-900 font-semibold ">Shrbo</span>?{' '}
            <Link to="/Signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create an account
            </Link>
          </p>
        </div>
        
        <div className="mt-5 text-center text-sm sm:mx-auto sm:w-full sm:max-w-sm">
          <label>
           
            <Link to={"/TermsofService"} className=" text-indigo-600 hover:underline " > Terms & Conditions</Link> and  
            <Link to={"/PrivacyPolicy"} className=" text-indigo-600 hover:underline " > Privacy policy</Link>.
            <Link to={"/"} className=" text-indigo-600 hover:underline hidden " ref={goHome} > Home page</Link>.

          </label>
        </div>

      </div>
    
    )



}


export default LogIn;