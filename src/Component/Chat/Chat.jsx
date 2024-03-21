import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faUser } from "@fortawesome/free-solid-svg-icons";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BottomNavigation from "../Navigation/BottomNavigation";
import { BsChevronBarLeft } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import Axios from "../../Axios";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentMessages, setRecentMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const [users] = useState([
    {
      id: 1,
      name: "User 1",
      role: "host",
      image: "https://shbro.onrender.com/assets/logo-94e89628.png",
      userProfile: "/UserDetails/47",
      messages: [
        { text: "Hey, can you help me with...", time: new Date() },
        { text: "Sure, what do you need help with?", time: new Date() },
      ],
    },
    {
      id: 2,
      name: "User 2",
      role: "guest",
      image: "https://shbro.onrender.com/assets/logo-94e89628.png",
      userProfile: "/UserDetails/47",
      messages: [
        { text: "Hi, I'm interested in booking...", time: new Date() },
        { text: "Great! Let me check availability for you.", time: new Date() },
      ],
    },
    {
      id: 3,
      name: "User 3",
      role: "guest",
      image: "https://shbro.onrender.com/assets/logo-94e89628.png",
      userProfile: "/UserDetails/47",
      messages: [
        {
          text: "Hello, can I have more information about...",
          time: new Date(),
        },
        { text: "Of course, here are the details...", time: new Date() },
      ],
    },
  ]);

  const [userChats, setUserChats] = useState({});
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const sendMessage = async (msgType) => {
    if (!message.trim()) return; // Prevent sending empty messages
  
    try {
      const response = await Axios.post(
        `/chat/${selectedUser}`,
        { message: message.trim(), senderId: ADMIN_ID }, // Include senderId in the message object
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the userChats state with the new message
      const chat = userChats[selectedUser] || [];
      const newChatItem = {
        text: message.trim(),
        sender: { id: ADMIN_ID }, // Use { id: ADMIN_ID } as the sender
        type: msgType,
        time: new Date(),
      };
      const newChat = [...chat, newChatItem];
      setUserChats({ ...userChats, [selectedUser]: newChat });
  
      setMessage(""); // Clear the message input after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  
  const TypingIndicator = () => (
    <div className="flex items-center text-gray-500">
      <div className="w-3 h-3 bg-gray-500 rounded-full mr-1"></div>
      <p>User is typing...</p>
    </div>
  );
  

  
    // Your existing code
  
    const handleTyping = (e) => {
      const message = e.target.value;
      setMessage(message);
      setIsTyping(message.trim().length > 0);
    };
  

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const messageMatch = recentMessages.some((message) =>
      message.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return nameMatch || messageMatch;
  });

  const receiverId = parseInt(localStorage.getItem("receiverid"), 10);

  const ADMIN_ID = receiverId;

  useEffect(() => {
    const token = localStorage.getItem("tokens");
    const receiverId = localStorage.getItem("receiverid");

    const fetchMessages = async () => {
      try {
        const response = await Axios.get(`/chat/${receiverId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserChats({ ...userChats, [receiverId]: response.data.messages });
        setRecentMessages(response.data.recentMessages);
        // console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [receiverId]);

  const fetchUserChats = async (receiverId) => {
    try {
      const response = await Axios.get(`/chat/${receiverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserChats({
        ...userChats,
        [receiverId]: response.data.messagesWithAUser,
      });
      setRecentMessages(response.data.recentMessages);
      setSelectedUser(receiverId); // Set the selectedUser state to the clicked user
      console.log(response.data.messagesWithAUser);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100 ">
        {/* <AdminHeader /> */}
        <div className="flex w-full">
          <div className="w-full  p-4 h-[85vh] overflow-auto example">
            <h1 className="text-xl font-semibold mb-4">Message</h1>
            <div className="flex ">
              {!selectedUser && (
                <div className=" w-full md:w-1/4 border-r pr-4">
                  <h2 className="text-lg font-semibold mb-2">Users</h2>
                  <input
                    type="text"
                    className="w-full p-2 border rounded mb-2"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <ul>
                    {recentMessages.map((message, index) => (
                      <li
                        key={index}
                        className={`cursor-pointer flex justify-between items-center p-2 px-4 ${
                          selectedUser === message.user_id ? "bg-gray-200" : ""
                        }`}
                        onClick={() => fetchUserChats(message.user_id)}
                      >
                        <div className="flex items-center">
                          <img
                            src={message.profilePic}
                            alt={message.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <p className="font-semibold">{message.name}</p>
                            <p className="text-sm text-gray-500">Role: Guest</p>
                            <p
                              className={`text-sm ${
                                selectedUser === message.user_id
                                  ? "text-gray-500"
                                  : "text-orange-500"
                              }`}
                            >
                              {message.message.message}{" "}
                              {/* Assuming this is the message text */}
                            </p>
                          </div>
                        </div>
                        <button
                          className="bg-orange-300 text-white h-fit  text-sm px-2 py-1 ml-2 rounded"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the li click event from firing
                            // Assuming this is the correct property for the user profile link
                            window.location.href = message.userProfile;
                          }}
                        >
                          <FontAwesomeIcon icon={faUser} className="mr-2" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {selectedUser && (
             <div className="w-full">
             <div className="bg-white p-4 rounded shadow">
               {selectedUser ? (
                 <>
                   <div className="flex items-center pb-4 gap-3">
                     <div className="cursor-pointer">
                       <FaArrowLeft onClick={() => setSelectedUser(null)} />
                     </div>
                     <p className="text-lg font-semibold">
                       {users.find((user) => user.id === selectedUser)?.name}
                     </p>
                   </div>
                   <div className="h-[60vh] overflow-y-auto example">
                     {userChats[selectedUser]?.map((msg, index) => (
                       <div
                         key={index}
                         className={`flex ${
                           msg.sender.id === ADMIN_ID ? "flex-row-reverse" : "flex-row"
                         }`}
                       >
                         <div
                           className={`mb-2 p-2 rounded ${
                             msg.sender.id === ADMIN_ID
                               ? "bg-orange-100 w-fit text-blue-900"
                               : "bg-gray-100 text-gray-900"
                           }`}
                         >
                           <p>{msg.message}</p>
                           <p>{msg.text}</p>
                           <p className="text-xs text-gray-500">
                             {msg.time instanceof Date
                               ? msg.time.toLocaleDateString(undefined, {
                                   weekday: "long",
                                   day: "numeric",
                                   year: "numeric",
                                   month: "long",
                                 })
                               : ""}
                           </p>

                         </div>
                       </div>
                     ))}
                     {isTyping && <TypingIndicator />}
                   </div>
                   <div className="mt-4 flex gap-2">
                     <textarea
                       className="w-full p-2 border rounded"
                       placeholder="Type your message here..."
                       value={message}
          onChange={handleTyping}
                     ></textarea>
                     <button
                       className="bg-orange-400 text-white px-4 py-2 rounded float-right"
                       onClick={() => sendMessage("text")}
                     >
                       <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                     </button>

                   </div>
                 </>
               ) : (
                 <p className="text-gray-500 flex items-center h-[80vh] justify-center">
                   Select a user to start chatting.
                 </p>
               )}
             </div>
           </div>
           
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
