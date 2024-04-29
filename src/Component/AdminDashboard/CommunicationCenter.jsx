import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faUser } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import axios from "../../Axios";
import { IoExitOutline } from "react-icons/io5";
import { useStateContext } from "../../ContextProvider/ContextProvider";
import { notification } from 'antd';
import SessionTimer from "../ChatBot/SessionTimer";
import { DatePicker, Select } from 'antd';


const CommunicationCenter = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [expiry, setExpiry] = useState("");
  const [sessionChatHistory, setSessionChatHistory] = useState([]);
  const [isSessionEnded, setSessionEnded] = useState(false);
  const [isUserLeftchat, setUserLeftchat] = useState(false);

  const [users, setUsers] = useState([

  ]);

  const [currentSession, setCurrentSession] = useState([]);

  const [userChats, setUserChats] = useState({});
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  const { user, token, setUser, setHost, setAdminStatus } = useStateContext();
  // const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, error) => {
    api[type]({
      message: type === "error" ? 'Error' : "Succesfull",
      description: error,
      placement: 'topRight',
      className: 'bg-green'
    });
  };


  const initializeEcho = (token, adminId) => {
    if (typeof window.Echo !== "undefined") {
      const channelName = `start-convo`;
      const channel = `left.chat.${adminId}`;
      window.Echo.connector.options.auth.headers.Authorization = `Bearer ${token}`;
      console.log(
        "Authentication token is set:",
        window.Echo.connector.options.auth.headers.Authorization
      );

      const privateChannel = window.Echo.channel(channelName);
      const privateChannelLeftChat = window.Echo.private(channel);
      const messageHandler = (data) => {
        const formattedChats = data.unattended_chats.map((data) => (
          {
            id: data.id,
            name: `User ${data.user_id}`,
            userId: data.user_id,
            role: data.status,
            session_id: data.session_id,
            image: "https://shbro.onrender.com/assets/logo-94e89628.png",
            userProfile: `/UserDetails/${data.user_id}`,
            messages: [
              {
                text: data.message,
                time: new Date(),
              },
            ],
          }
        )).reverse();


        const initialMessage = {
          text: data.message,
          time: data.created_at,
          id: data.id,
          session: data.session_id,
          sender: "user",
          type: "text",
          // time: data.created_at,
        }
        const sessionId = data.session_id
        const chat = userChats[sessionId] || [];

        const newChat = [...chat, initialMessage];
        setUserChats(prevChats => ({ ...prevChats, [sessionId]: newChat }));



        setUsers(formattedChats)


        console.table(data);


        console.log("user joined ", data)

        // setMessages(prevMessages => [...prevMessages, newMessage]);
        // // setSupportAgent(agent);
        // saveAgentToSession(agent);
        // isSupportAgentConnected(true);

      };

      const leftChatHandler = (data) => {
        // const newMessage = {
        //   content: data.message,
        //   timestamp: new Date(),
        //   isSentByUser: true,
        //   adminJoined: true, // adding this because of the styling adminJoined
        //   adminLeftChat: true,
        // };


        setUserLeftchat(true);




        console.table(data);


        console.log("User left ", data)

        // messageSentSound.play();
        // setMessages(prevMessages => [...prevMessages, newMessage]);
        // sessionStorage.removeItem('supportAgent');


      }

      privateChannel.listen("MessageBroadcasted", messageHandler);
      privateChannelLeftChat.listen("LeaveChatEvent", leftChatHandler);
      console.log("Listening for messages on channel:", channelName);
      console.log("Listening for messages on channel:", channel);

      return () => {
        privateChannel.stopListening("MessageBroadcasted", messageHandler);
        privateChannelLeftChat.stopListening("LeaveChatEvent", leftChatHandler);
      };
    } else {
      console.error(
        "Echo is not defined. Make sure Laravel Echo is properly configured."
      );
    }
  };


  const initializeBroadcastReceiverEcho = (userId) => {
    const channelName = `chat.admin.${userId}`;

    const privateChannel = window.Echo.private(channelName);

    const messageHandler = (dataArray) => {
      const storedAgent = loadAgentFromSession();
      const formattedData = dataArray.map(data => ({
        id: data.id,
        session: data.sessionId,
        text: data.image ?? data.message,
        sender: data.status == "guest" ? "user" : "admin",
        type: !data.image ? "text" : "file",
        time: data.created_at,
      }));

      const sessionId = storedAgent?.session_id;
      setUserChats(prevChats => ({ ...prevChats, [sessionId]: formattedData }));

      console.log("user sent a message", dataArray);
      updateSessionTime();
    };


    privateChannel.listen("MessageBroadcasted", messageHandler);

    console.log("Listening for messages on channel:", channelName);

    // Return a function to unsubscribe from the channel
    return () => {
      privateChannel.stopListening("MessageBroadcasted", messageHandler);
    };
  };

  const initializeSessionEndEcho = (userId) => {
    const channelName = `chat.endsession.${userId}`;

    const privateChannel = window.Echo.private(channelName);

    const messageHandler = (data) => {

      // const storedAgent = loadAgentFromSession();
      // const newMessage = {
      //   id: new Date(),
      //   text: data.notification,
      //   sender: 'admin',
      //   sessionEnded: true,
      //   type: 'text',

      // };

      // const sessionId = storedAgent?.session_id;
      // const chat = userChats[sessionId] || [];

      // const newChat = [...chat, newMessage];
      // setUserChats(prevChats => ({ ...prevChats, [sessionId]: newChat }));





      // setMessages(prevMessages => [...prevMessages, newMessage]);

      setSessionEnded(true);

      sessionStorage.removeItem('supportUser');


      console.log("SessionEnded", data)
    };

    privateChannel.listen("SessionEnded", messageHandler);

    console.log("Listening for messages on channel:", channelName);

    // Return a function to unsubscribe from the channel
    return () => {
      privateChannel.stopListening("SessionEnded", messageHandler);
    };

  };

  const initializeTypingEcho = (userId) => {
    const channelName = `typing.${userId}`;

    const privateChannel = window.Echo.private(channelName);
    let typingTimeout;
    const messageHandler = (data) => {
      if (!isTyping) {
        setIsTyping(true);
      }// Adjust the timeout duration as needed

      console.log("typing", data)
    };

    privateChannel.listen("Typing", messageHandler);

    console.log("Listening for messages on channel:", channelName);

    // Return a function to unsubscribe from the channel
    return () => {
      privateChannel.stopListening("Typing", messageHandler);
    };
  };


  useEffect(() => {






    const storedAgent = loadAgentFromSession();
    if (storedAgent) {
      setCurrentSession([storedAgent]);
    }






    const cleanupInitial = initializeEcho(token, user.id);
    const cleanupBroadcastReceiver = initializeBroadcastReceiverEcho(user.id);
    const cleanupTyping = initializeTypingEcho(user.id);
    const cleanupSessionEnd = initializeSessionEndEcho(user.id);
    return () => {
      cleanupInitial();
      cleanupBroadcastReceiver(); // Cleanup function to unsubscribe
      cleanupTyping();
      cleanupSessionEnd();
    };
  }, [token, user]);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to get the user data
        const response = await axios.get('/user'); // Adjust the endpoint based on your API


        // Set the user data in state
        setUser(response.data);
        setHost(response.data.host);
        setAdminStatus(response.data.adminStatus);


      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        // Set loading to false regardless of success or error
        // setLoading(false);

      }
    };
    if (!user.id) {

      fetchUserData();
    }
  }, [])


  useEffect(() => {


    axios.get('/admin-guest-chat/getUnattendedChats').then((response) => {

      const formattedChats = response.data.unattended_chats.map((data) => ({
        id: data.id,
        name: `User ${data.user_id}`,
        userId: data.user_id,
        role: data.status,
        session_id: data.session_id,
        image: "https://shbro.onrender.com/assets/logo-94e89628.png",
        userProfile: `/UserDetails/${data.user_id}`,
        messages: [
          {
            text: data.message,
            time: data.created_at,
            id: data.id, // Assuming this id corresponds to the message
            session: data.session_id,
            sender: "user",
            type: "text",
          },
        ],
      })).reverse();

      // Assuming userChats is your state containing previous chats
      const updatedUserChats = {};
      formattedChats.forEach((chat) => {
        updatedUserChats[chat.session_id] = [
          ...(userChats[chat.session_id] || []), // Existing chats for the user
          ...chat.messages, // New messages for the user
        ];
      });

      // Assuming setUsers is a state updater function
      setUsers(formattedChats);
      console.log("check", updatedUserChats)
      console.log(formattedChats)
      setUserChats(updatedUserChats);


    }).catch((error) => {

    });









  }, []);


  const saveUserToSession = (user) => {
    const data = {
      expiry: Date.now() + 420000, // 420000 milliseconds = 7 minutes
      id: user.id,
      name: user.name,
      userId: user.userId,
      role: user.role,
      session_id: user.session_id,

    };
    setExpiry(data.expiry)
    sessionStorage.setItem('supportUser', JSON.stringify(data));
  };


  const loadAgentFromSession = () => {
    const storedData = sessionStorage.getItem('supportUser');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      if (parsedData.expiry > Date.now()) {
        setExpiry(parsedData.expiry)
        return parsedData;
      } else {
        // Clear expired data
        sessionStorage.removeItem('supportUser');
      }
    }
    return null;
  };

  const updateSessionTime = () => {
    // Retrieve existing data from session storage
    const existingDataString = sessionStorage.getItem('supportUser');
    const existingData = JSON.parse(existingDataString);

    // Update expiry value
    if (existingData) {

      existingData.expiry = Date.now() + 420000;
      setExpiry(Date.now() + 420000);
    }

    // Store updated data back into session storage
    sessionStorage.setItem('supportUser', JSON.stringify(existingData));

  }




  const handleJoinLeaveChat = async (data, type) => {


    console.table(type == "join")

    const guestid = data.userId;
    const sessionId = data.session_id;

    if (type == "join" && currentSession.length > 0) {// does not make a join session request when you are alreaddy in a session

      console.log(data)

      openNotificationWithIcon("error", "You are currently in an ongoing session")

      return;


    }



    await axios.get(
      type == "join" ? `/admin-guest-chat/joinChat/${guestid}/${sessionId}` :
        `/admin-guest-chat/leaveChat/${user.id}/${guestid}/admin`)
      .then((response) => {

        if (type == "join") {
          saveUserToSession({ id: data.id, userId: guestid, role: data.status, name: data.name, session_id: sessionId });

          setUsers(users.filter(user => user.id !== data.id))


          setCurrentSession([data]);

        } else if (type == "leave") {
          setSessionEnded(false);
          setUserLeftchat(false);
          setCurrentSession([]);
          sessionStorage.removeItem('supportUser');
          setSelectedUser(null);
        }

        openNotificationWithIcon("success", response.data.message)



      }).catch((error) => {


        if (error.response.data.message) {
          openNotificationWithIcon("error", error.response.data.message);
          // setError(error.response.data.message);

        } else {

          openNotificationWithIcon("error", error.response.data);
          // setError(error.response.data);
        }

      });


  }

  const formatDate = (inputDate) => {
    const now = new Date();
    const date = new Date(inputDate);

    const isToday = now.toDateString() === date.toDateString();

    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (isToday) {
      return `today, ${hours}:${minutes}`;
    } else {
      // Further handling can be added here
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}, ${hours}:${minutes}`;
    }
  };



  // loads the chat in a current session
  useEffect(() => {

    const storedAgent = loadAgentFromSession();
    if (storedAgent) {
      const agentId = storedAgent.userId;
      const sessionId = storedAgent.session_id;
      const adminId = user.id

      console.table({ agentId, sessionId, adminId })

      axios.get(`/admin-guest-chat/getChatMessages/${user.id}/${agentId}/${sessionId}`).then((response) => {


        console.log("I am in here", response.data.chat_messages)


        const formattedChats = response.data.chat_messages.map((element) => {
          return {
            id: element.id,
            text: element.image ?? element.message,
            time: element.created_at,
            sender: element.status == "guest" ? "user" : "admin",
            type: !element.image ? "text" : "file",
            session: storedAgent.session_id,



          };
        });

        // const chat = userChats[sessionId] || [];

        const newChat = [...formattedChats];
        setUserChats({ [sessionId]: newChat });


        console.log("history", newChat)




      }).catch((error) => {
        console.error(error)
      })



    } else {
      console.log("no chats")
    }

  }, [user]);





  const sendMessage = async (msgType, file) => {
    if (!message.trim() && !file) return; // Prevent sending empty messages

    const storedAgent = loadAgentFromSession();
    if (!storedAgent) {
      return; // Do nothing if storedAgent is empty
    }

    const chat = userChats[storedAgent.session_id] || [];
    let newChatItem;

    const createChatItem = (text, sender, type) => ({
      text,
      sender,
      type,
      time: new Date(),
    });

    const updateChatAndSend = async (postChat) => {
      const newChat = [...chat, newChatItem];
      setUserChats(prevChats => ({ ...prevChats, [storedAgent.session_id]: newChat }));
      setMessage(""); // Clear the message input after sending

      console.table(postChat);

      try {
        console.log("Sending:", postChat);
        const response = await axios.post("/admin-guest-chat/startConversationOrReplyText", postChat);
        console.log("Response:", response.data);
        updateSessionTime();
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    };

    if (file) {
      newChatItem = createChatItem(file, "admin", msgType);

      const postChat = {
        message: "",
        image: file,
        status: "admin",
        recipient_id: storedAgent.userId,
        chat_session_id: storedAgent.session_id,
      };
      await updateChatAndSend(postChat);

    } else {
      newChatItem = createChatItem(message.trim(), "admin", msgType);
      const postChat = {
        message: message.trim(),
        image: "",
        status: "admin",
        recipient_id: storedAgent.userId,
        chat_session_id: storedAgent.session_id,
      };
      await updateChatAndSend(postChat);
    }
  };


  const handleKeyUp = async (event) => {
    // setInputValue(event.target.value);

    const storedAgent = loadAgentFromSession();
    // if (storedAgent) {
    //   setSupportAgent(storedAgent);
    // }


    // Only send typing notification if the user was not already marked as typing
    if (!isTyping) {
      if (storedAgent?.id) {
        try {
          await axios.get(`/typing/${storedAgent.userId}/${user.id}`);
          console.log("typing....")
        } catch (error) {


        }
      }
      // setIsTyping(true);
      // sendTypingNotification(true);  // Notify that the user is typing
    }
  };

  useEffect(() => {
    if (isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 2000);  // Adjust delay as necessary, 1000 ms = 1 second

      // Cleanup function to clear the timer when the component unmounts or updates
      return () => clearTimeout(timer);
    }
  }, [isTyping]);


  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  useEffect(() => {

    axios.get("/admin-guest-chat/getSessionMessages").then((response) => {

      setSessionChatHistory(response.data.session_messages);


    })

  }, []);







  return (
    <div>
      {contextHolder}
      <div className="bg-gray-100 min-h-screen">
        <AdminHeader />
        <div className="flex">
          <div className="bg-orange-400 hidden md:block text-white md:w-1/5 h-screen p-4">
            <AdminSidebar users={users} setSelectedUser={setSelectedUser} />
          </div>

          <div className="w-full md:w-4/5 p-4 h-screen overflow-auto example">
            <h1 className="text-2xl font-semibold mb-4">
              Communication Center
            </h1>
            <div className="flex ">
              <div className="w-1/4 border-r pr-4">
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />


                <h2 className="text-lg font-semibold mb-2">current session</h2>
                <ul className=" " >
                  {currentSession.map((user) => (
                    <li
                      key={user.id}
                      className={`cursor-pointer flex justify-between items-center p-2 px-4 ${selectedUser === user.session_id ? "bg-gray-200" : ""
                        }`}
                      onClick={() => { setSelectedUser(user.session_id), setSelectedUserData(user) }}
                    >
                      <div className="flex items-center">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                          <p
                            className={`text-sm ${selectedUser === user.session_id
                              ? "text-gray-500"
                              : "text-orange-500"
                              }`}
                          >
                            {user.messages?.length > 0
                              ? user.messages[user?.messages?.length - 1].text
                              : "No messages yet"}
                          </p>
                        </div>
                      </div>

                      <button
                        className="bg-orange-300 text-white h-fit mx-auto text-sm px-2 py-1 ml-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the li click event from firing
                          window.location.href = user.userProfile;
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                      </button>
                    </li>
                  ))}
                  {currentSession.length <= 0 && <div className=" text-xs py-8 w-full break-words text-center text-slate-700 " >No current Chat session at the moment </div>}
                </ul>
                <h2 className="text-lg font-semibold mb-2">Unattended chats</h2>
                <ul className=" overflow-y-scroll h-[50%]   " >
                  {filteredUsers.map((user) => (
                    <li
                      key={user.id}
                      className={`cursor-pointer flex justify-between items-center p-2 px-4 ${selectedUser === user.session_id ? "bg-gray-200" : ""
                        }`}
                      onClick={() => { setSelectedUser(user.session_id), setSelectedUserData(user) }}
                    >
                      <div className="flex items-center">
                        <img
                          src={user.image}
                          alt={user.name}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                        <div>
                          <p className="font-semibold">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.role}</p>
                          <p
                            className={`text-sm ${selectedUser === user.session_id
                              ? "text-gray-500"
                              : "text-orange-500"
                              }`}
                          >
                            {user.messages.length > 0
                              ? user.messages[user.messages.length - 1].text
                              : "No messages yet"}
                          </p>
                        </div>
                      </div>

                      <button
                        className="bg-orange-300 text-white h-fit mx-auto text-sm px-2 py-1 ml-2 rounded"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent the li click event from firing
                          window.location.href = user.userProfile;
                        }}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-3/4 pl-4">
                <div className="bg-white h-[90vh] p-4 rounded shadow">
                  {selectedUser ? (
                    <>
                      <div className="flex justify-between" >
                        {/* <p className="text-lg font-semibold">
                          {users.name}
                        </p> */}
                        <p className="text-sm text-gray-500">
                          Ticket: {selectedUser}
                        </p>
                        {currentSession.find(chat => chat.session_id === selectedUser) && <div className="text-sm text-gray-500"><SessionTimer expiry={expiry} /></div>}
                        {currentSession.length > 0 && currentSession[0].session_id === selectedUser ? (
                          <button onClick={() => { handleJoinLeaveChat(selectedUserData, "leave"); }} className="text-sm bg-orange-400 rounded flex items-center gap-1 font-medium text-white p-3">
                            Leave Chat <IoExitOutline className="h-4 w-4" />
                          </button>
                        ) : currentSession.length === 0 ? (
                          <button onClick={() => { handleJoinLeaveChat(selectedUserData, "join"); }} className="text-sm bg-orange-400 rounded flex items-center gap-1 font-medium text-white p-3">
                            Join Chat
                          </button>
                        ) : null}



                      </div>
                      <div className="h-[70vh] overflow-y-auto example">
                        {selectedUser &&
                          userChats[selectedUser]?.length === 0 && (
                            <div className="mb-2 p-2 rounded bg-orange-100 text-blue-900 text-center">
                              Admin joined the chat
                            </div>
                          )}

                        {userChats[selectedUser]?.map((msg, index) => (
                          // <div key={index}>
                          //   {!msg.sessionEnded ? 
                          <div key={index}

                            className={`mb-2 p-2 rounded ${msg.sender === "admin"
                              ? "bg-orange-100 w-fit  "
                              : "bg-gray-100"
                              } ${msg.sender === "admin"
                                ? "text-blue-900"
                                : "text-gray-900"
                              }`}
                            style={{ wordBreak: 'break-word' }}
                          >
                            {msg.type === "text" ? (
                              <>
                                <p>{msg.text}</p>
                                <p className="text-xs text-gray-500">
                                  {formatDate(msg.time)}
                                </p>
                              </>

                            ) : (
                              <img
                                src={msg.text}
                                alt="Attachment"
                                className=" h-auto"
                              />
                            )}
                          </div>
                          //     :

                          // </div>
                        ))}


                        {isTyping && currentSession[0].session_id === selectedUser && <div className=" text-slate-500 text-sm ">User typing........</div>}


                        {isSessionEnded && currentSession[0].session_id === selectedUser && <div className=" my-4 w-full font-medium text-slate-600 bg-slate-50 text-center " >Session has ended leave the chat </div>}

                        {isUserLeftchat&&currentSession[0].session_id === selectedUser && <div className="mb-2 p-2 rounded bg-orange-100 text-blue-900 text-center">
                          user{currentSession[0].userId} left the chat
                        </div>}


                      </div>



                      {currentSession.find(chat => chat.session_id === selectedUser) && !isSessionEnded && !isUserLeftchat && <div className="mt-4 flex gap-2">
                        <button
                          className="bg-orange-400 text-white px-4 py-2 ml-2 rounded"
                          onClick={() => fileInputRef.current.click()}
                        >
                          <FontAwesomeIcon
                            icon={faPaperclip}
                            className="mr-2"
                          />
                          Attach File
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*, video/*"
                          style={{ display: "none" }}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                sendMessage("file", e.target.result);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <textarea
                          className="w-full p-2 border rounded"
                          placeholder="Type your message here..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyUp={handleKeyUp}
                        ></textarea>
                        <button
                          className="bg-orange-400 text-white px-4 py-2 ml-2 rounded"
                          onClick={() => sendMessage("text")}
                        >
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="mr-2"
                          />
                        </button>
                      </div>}
                    </>
                  ) : (
                    <p className="text-gray-500 flex items-center h-[80vh] justify-center">
                      Select a user to start chatting.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <ChatHistory sessionMessages={sessionChatHistory}/>
  );
};

export default CommunicationCenter;








const { Option } = Select;

const ChatHistory = ({ sessionMessages }) => {
  const [selectedSessionID, setSelectedSessionID] = useState('');

  const handleSessionIDChange = (value) => {
    setSelectedSessionID(value);
  };

  const session = sessionMessages.find(session => session.session_id === selectedSessionID);

  const sessionIDs = [...new Set(sessionMessages.map(session => session.session_id))];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-4">
        <label htmlFor="sessionID" className="block text-lg font-semibold mb-1">Filter by Session ID:</label>
        <Select
          id="sessionID"
          className="w-full"
          value={selectedSessionID}
          onChange={handleSessionIDChange}
          placeholder="Select Session ID"
        >
          {sessionIDs.map(id => (
            <Option key={id} value={id}>{id}</Option>
          ))}
        </Select>
      </div>

      {/* <div className="mb-4">
              <label htmlFor="date" className="block text-lg font-semibold mb-1">Filter by Date:</label>
              <DatePicker id="date" className="w-full" />
          </div> */}

      {session && (
        <div className="border rounded-lg p-4">
          <div className="mb-4">
            <p className="text-lg font-semibold">Session Information:</p>
            <p>User: {session.user_name} ({session.user_email})</p>
            <p>Admin: {session.admin_name} ({session.admin_email})</p>
            <p>Session ID: {session.session_id}</p>
            <p>Date: {session.dateOfChat}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.messages.map((message, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4">
                <p className="text-lg font-semibold">Message:</p>
                <p>{message.message}</p>
                <p className="mt-2">Sent by: {message.whoSentMessage === 'guest' ? 'User' : 'Admin'}</p>
                <p>Sent at: {new Date(message.created_at).toLocaleString()}</p>
                {message.image && <img src={message.image} alt="Image" className="mt-2" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

