import React, { useState,useRef,useEffect } from "react";
import Avatar from "./Avatar"
import SupportWindow from "./SupportWindow/SupportWindow";
import { FloatButton } from 'antd';
import { CommentOutlined } from '@ant-design/icons';
import OptionWindow from "./SupportWindow/OptionWindow";

const ChatSupport = () => {
    const ref=useRef(null)
    const [visible,setVisible]=useState(false);
    const  [showOption,setShowOption]=useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);
    const [botMessage, setBotMessage] = useState(null);

    const handleOptionSelected = (option) => {


      senddbotMessage(option)  
        
      setSelectedIssue(option);
      setVisible(true);
      setShowOption(false);
        console.log(option);
    };

    function handleClose(){
    
            setVisible(false);
            setShowOption(false);
  
    }

    const handleOpen=()=>{
      if(selectedIssue===null){
         setShowOption(true);
        }
        else{
            setVisible(true);
        }

    }

    const SupportCategories=[   
        {index:1,report:"Customer Service",message:["We'll redirect you to our support Team right now..","Please wait while i do that thank you"]},
        {index:2,report:"Technical Support",message:["Redirecting to Support page....... ",]},
        {index:3,type:"menu",report:"Booking Issue",message:["The property doesn't exist ","The host is requesting direct payment outside of Shrbo","The Listing includes the host's personal infromation","The host is not authorized to rent the property"]},
        {index:4,report:"Billing",message:["We'll redirect you to our support Team right now..","make sure you have your billing details or ","image near you for the most Efficient Response "]}
    ] ; 



    const senddbotMessage = (option) => {
        const botm = SupportCategories.find((r) => r.report.trim() === option.trim());
      
        if (botm) {
          const messages = botm.message; // Access the 'message' property from the object
          const menu=botm.type==="menu";
          console.log(messages);
          setBotMessage(messages);
        } else {
          console.log("Category not found.");
        }
      };
      

    
    
   

       
        
    
    




    return (
        <div ref={ref} className=" w-full "  >
            <SupportWindow 
                visible={visible}
                close={handleClose}
                botMessage={botMessage}
                selectedOption={selectedIssue}


            />

            {showOption&&<OptionWindow close={handleClose} selectedOption={(option)=>{handleOptionSelected(option)}} />}



            {!visible&& <FloatButton type="default" icon={<CommentOutlined />} badge={{
          count: 1,
        }}
        
         tooltip={<div className="   ">Customer Support</div>}  onClick={ handleOpen}    />
            }

{/* {!visible&& <Avatar style={" bottom-2  right-6 fixed "} />
            }
         */}

        </div>
    )
}

export default ChatSupport;