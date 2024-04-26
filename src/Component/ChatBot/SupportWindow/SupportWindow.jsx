import React, { useState, useEffect } from "react";
import { styles } from '../Style';
import EmailForm from "./EmailForm";
import ChatEngine from "./ChatEngine";
import SupportHeader from "./SupportHeader";
import OptionWindow from "./OptionWindow";
import WelcomeForm from "./WelcomeForm";
import { useStateContext } from "../../../ContextProvider/ContextProvider";
import axios from "../../../Axios";




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
    const storedUserData = localStorage.getItem("gnU");
    const initialUser = storedUserData ? JSON.parse(storedUserData) : null;
    const [_user, _setUser] = useState(initialUser);
    const [chat, setChat] = useState(null);
    const { user, token } = useStateContext();
    const [generatedToken, setGeneratedToken] = useState(localStorage.getItem("gnT"));
    const [generatedUserId, setGeneratedUserId] = useState(localStorage.getItem("gnUID"));



    const handleSubmitWelcomeForm = async (data) => {

        await axios.post("/admin-guest-chat/startConversationOrReplyText", {
            message: "Live chat",
            status: "guest",
            recipient_id: "",
            chat_session_id: "",
            image: "",
            email: data.email,
            name: data.name,
        }).then((response) => {
            console.log(response.data.token)
            console.log(response.data.user_id)

            _setGeneratedUserId(response.data.user_id);
            _setGeneratedToken(response.data.token);
            _setGeneratedUser({name: data.name, email:data.email });

        }).catch((error) => {

        });



        console.log('Submitted:', data.name, data.email);


        //   console.log('Submitted:',response.data)

    }


    const _setGeneratedToken = (status) => {
        setGeneratedToken(status)
        if (status) {
            localStorage.setItem("gnT", status);
        } else {
            localStorage.removeItem("gnT");
        }
    }

    const _setGeneratedUserId = (status) => {
        setGeneratedUserId(status)
        if (status) {
            localStorage.setItem("gnUID", status);
        } else {
            localStorage.removeItem("gnUID");
        }
    }

    const _setGeneratedUser = (status) => {
        _setUser(status);
        if (status) {
            const data = {
                name: status.name,
                email: status.email
            };
            localStorage.setItem("gnU", JSON.stringify(data));
        } else {
            localStorage.removeItem("gnU");
        }
    }



    // starts the chat when the user clicks on live chat for Authenticated users
    useEffect(() => {

        const storedAgent = props.agentName


        // console.log(_user)


        if (props.selectedOption == "Live chat" && !storedAgent && token) {
          try {
            const response = axios.post("/admin-guest-chat/startConversationOrReplyText", {
              message: "Live chat",
              status: "guest",
              recipient_id: "",
              chat_session_id: "",
              image: "",
            });

            if (response.data) {

              console.log("Live chat", response.data)
            }
          } catch (error) {

          }

        }

    }, [props.selectedOption]);











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


            {(props.selectedOption === "Live chat" && token === null&&_user===null) && <WelcomeForm visible={_user === null || chat === null} setUser={(user) => _setUser(user)}
                setChat={(chat) => setChat(chat)} onSubmit={handleSubmitWelcomeForm} />}


            {/* 
      {user===null || chat===null?
           <EmailForm
                setUser={(user)=>setUser(user)}
                setChat={(chat)=>setChat(chat)}
                visible={user===null || chat===null}
           />
              : */}

            {(props.botMessage || props.agentName) && (token || _user) &&
                <ChatEngine
                    visible={props.selectedOption === "Live chat" ? !token != null : true}
                    chat={chat}
                    guestUser={_user}
                    userId={user?.id ?? generatedUserId}
                    token={token ?? generatedToken}
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