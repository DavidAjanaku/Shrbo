import React,{useState} from "react";
import {styles} from '../Style';



const SupportHeader= (props) => {
 
    return (
     
          
          <div className=" w-full bg-slate-800 md:h-[10%] h-[8%] flex px-4 shadow-lg  ">


            <div className=" support/bot gap-2   w-[50%] text-white flex justify-start items-center ">
            <svg xmlns="http://www.w3.org/2000/svg" width={"30px"} height={"30px"} fill='rgb(251,146,60)'  viewBox="0 0 24 24"><title>robot-happy-outline</title>
                    <path d="M10.5 15.5C10.5 15.87 10.4 16.2 10.22 16.5C9.88 15.91 9.24 15.5 8.5 15.5S7.12 15.91 6.78 16.5C6.61 16.2 6.5 15.87 6.5 15.5C6.5 
                    14.4 7.4 13.5 8.5 13.5S10.5 14.4 10.5 15.5M23 15V18C23 18.55 22.55 19 22 19H21V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 
                    19 1 18.55 1 18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9 14 4C14 4.74 13.6 
                    5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M21 16H19V14C19 11.24 16.76 9 14 9H10C7.24 9 5 11.24 5 
                    14V16H3V17H5V20H19V17H21V16M15.5 13.5C14.4 13.5 13.5 14.4 13.5 15.5C13.5 15.87 13.61 16.2 13.78 16.5C14.12 15.91 14.76 15.5 15.5 
                    15.5S16.88 15.91 17.22 16.5C17.4 16.2 17.5 15.87 17.5 15.5C17.5 14.4 16.61 13.5 15.5 13.5Z" /></svg>
                Shrbo Team
            </div>
            <div className=" close-button text-white text-end w-[50%] flex justify-end items-center cursor-pointer  " onClick={props.close}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" width={"24px"} height={"24px"} viewBox="0 0 24 24"><title>window-close</title>
                    <path d="M13.46,12L19,17.54V19H17.54L12,13.46L6.46,19H5V17.54L10.54,12L5,6.46V5H6.46L12,10.54L17.54,5H19V6.46L13.46,12Z" />
                </svg>
            </div>


          </div>     
    )
}

export default SupportHeader;