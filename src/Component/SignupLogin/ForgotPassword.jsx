import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import axios from '../../Axios';
import { notification } from 'antd';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault(); // Prevent form submission

    setLoading(true); // Set loading state to true

    const data = {
      email // Assuming email is defined elsewhere in your code
    };

    try {
      const response = await axios.post('/password/reset', data);
      // console.log('Password reset request successful');
      // console.log(response.data); // Log the response data
      setSuccess(true); // Set success state to true
      setTimeout(() => {
        // Redirect to homepage after 3 seconds
        window.location.href = '/';
      }, 3000);
    } catch (error) {
      console.log(error);
      notification.error({
        message: 'Password Reset Failed',
        description: error.response.data.message
      });
      // Handle errors, e.g., show an error message to the user
    } finally {
      setLoading(false); // Set loading state to false, whether the request succeeded or failed
    }
  };

  return (
    <>
      {loading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <div className="containerld"></div>
        </div>
      ) : success ? (
        <div className='w-full h-screen flex items-center justify-center bg-white'>
        <div className='bg-white p-8 mx-10 rounded-lg shadow-lg text-center'>
          <h1 className='text-2xl font-bold text-orange-500'>Password Reset Link Sent</h1>
          <p className='text-gray-600 mt-4'>
            A password reset link has been sent to your email address. Please check your inbox and follow the instructions in the email to reset your password.
          </p>
        </div>
      </div>
      
      ) : (
        <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-20 w-auto" src={logo} alt="Shrbo" />
            <h2 className="mt-10 text-center text-2xl md:text-3xl font-bold leading-9 text-gray-900">
              Forgot password?
            </h2>
            <h3 className="text-center mt-1 px-3 tracking-tight text-gray-400">
              No worries, we'll send you reset instructions.
            </h3>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-5" onSubmit={submitForm}>
              <div>
                <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-0 px-2 py-3 text-gray-900 shadow-sm ring-2 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:text-lg focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-500 focus:bg-orange-400 px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  style={{ backgroundColor: 'rgb(249, 115, 22)' }}
                >
                  Reset password
                </button>
              </div>
            </form>

            <div className="pr-[18px] text-center w-full md:block cursor-pointer md:relative mt-10 text-sm text-gray-500">
              <button className="flex gap-2 w-full justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="grey">
                  <title>keyboard-backspace</title>
                  <path d="M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z" />
                </svg>
                <Link to="/Login" className="font-semibold leading-6">
                  Back to log in
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
