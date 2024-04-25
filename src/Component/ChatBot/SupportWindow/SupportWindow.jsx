import React, { useState,useEffect } from "react";
import { styles } from '../Style';
import EmailForm from "./EmailForm";
import ChatEngine from "./ChatEngine";
import SupportHeader from "./SupportHeader";
import OptionWindow from "./OptionWindow";
import WelcomeForm from "./WelcomeForm";
import { useStateContext } from "../../../ContextProvider/ContextProvider";





//  // Position
//  position: 'fixed',
//  bottom: '11px',
//  right: '24px',
//  // Size
//  width: '370px',
//  height: '570px',
//  maxWidth: 'calc(100% - 48px)',
//  maxHeight: 'calc(100% - 48px)',
//  backgroundColor: 'white',
//  // Border
//  borderRadius: '12px',
//  // border: `2px solid #7a39e0`,
//  overflow: 'hidden',
//  zIndex:'1000',



const SupportWindow = (props) => {
    const [_user, _setUser] = useState(null);
    const [chat, setChat] = useState(null);
    const { user, token } = useStateContext();
    










    return (
        <div className="transition-5 cursor-default bg-slate-800 z-[1000] bottom-0  overflow-hidden md:rounded-xl 
        fixed h-full w-full md:w-[400px] md:h-[550px] lg:h-[560px] md:bottom-3 md:right-6 md:max-h-[calc(100% - 48px)] md:max-w-[calc(100% - 48px)] " style={{
                ...styles.supportWindow,
                ...{
                    display: props.visible ? 'block' : 'none',
                    // opacity:props.visible ? '1':'0'

                }
            }}>

            <SupportHeader close={props.close} agentName={props.agentName} />


            {/* <OptionWindow/> */}


            {(props.selectedOption === "Live chat" && token === null) && <WelcomeForm visible={_user === null || chat === null} setUser={(user) => _setUser(user)}
                setChat={(chat) => setChat(chat)} />}


            {/* 
      {user===null || chat===null?
           <EmailForm
                setUser={(user)=>setUser(user)}
                setChat={(chat)=>setChat(chat)}
                visible={user===null || chat===null}
           />
              : */}

            {(props.botMessage||props.agentName)&&token&&
                <ChatEngine
                    visible={props.selectedOption === "Live chat" ? !token != null : true}
                    chat={chat}
                    guestUser={_user}
                    userId={user?.id}
                    token={token}
                    botMessage={props.botMessage}
                    selectedOption={props.selectedOption}
                    updateHeader={props.updateHeader}
                />
            }
            {/* } */}
        </div>
    )
}

export default SupportWindow;