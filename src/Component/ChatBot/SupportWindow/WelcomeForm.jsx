import React, { useState } from 'react';
import {styles} from '../Style';
const WelcomeForm = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
   const [isAnimation,setIsAnimation]=useState(true);


  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
            props.setUser(name);
            props.setChat("hello");
            console.log('Sending email')

            
            let animation;

            animation = setTimeout(() => {
                setIsAnimation(false);
              }, 3000);
        


    console.log('Submitted:', { name, email });
  };

  const toggleLoginForm = () => {
    setIsLoginFormVisible(!isLoginFormVisible);
  };

  return (
    <div className=" mx-auto  p-6 bg-white rounded shadow-md"  style={{
        ...styles.emailFormWindow,
        ...{
            height:props.visible?"100%":"0%",
            opacity:props.visible? '1':'0',
            display:props.visible? "block":"none",
        }
    }}>

{/* <div style={{ height:'0px'}}>
                <div style={styles.stripe2}           />

            </div> */}


      <h2 className="text-2xl font-semibold mb-6" style={styles.topText}>Welcome to our Live Chat!</h2>

      
        <p className="text-gray-700 mb-4" >
          If you have an account,{' '}
          <span className="text-blue-500 cursor-pointer" onClick={toggleLoginForm}>
            log in here.
          </span>{' '}
          Otherwise, provide your details to get started.
        </p>
     

      <form onSubmit={handleSubmit} >
        
          <div className="mb-4"   >
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              style={styles.emailInput}
              placeholder='Enter your email here'
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500"
              required
            />
          </div>
      
        <div className="mb-4" >
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name <label className=' text-xs font-thin '>optional</label>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder='Enter your name here'
            value={name}
            style={styles.emailInput}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-orange-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
        >
           Submit
        </button>
      </form>
    </div>
  );
};

export default WelcomeForm;