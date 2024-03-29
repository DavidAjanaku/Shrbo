import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faUser } from "@fortawesome/free-solid-svg-icons";

import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import BottomNavigation from "../Navigation/BottomNavigation";
import { BsChevronBarLeft } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import Axios from "../../Axios";
import echo from "../../Real Time/echo";
import { format } from "date-fns";
import shbrologo from "../../assets/shbro logo.png"
import { Link } from "react-router-dom";
const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [recentMessages, setRecentMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newMessages, setNewMessages] = useState([]);
  const chatContainerRef = useRef(null);
  const [selectedUserName, setSelectedUserName] = useState(null); // State to store the selected user's name
  const [selectedUserProfilePic, setSelectedUserProfilePic] = useState(null);
  const [users] = useState([]);
  const [hostId, setHostId] = useState(null);

  const [selectedUserObj, setSelectedUserObj] = useState(null);

  const token = localStorage.getItem("tokens");

  console.log(token);
  const initializeEcho = (token, receiverId) => {
    if (typeof window.Echo !== "undefined") {
      const channelName = `messanger.${receiverId}`;

      window.Echo.connector.options.auth.headers.Authorization = `Bearer ${token}`;
      console.log(
        "Authentication token is set:",
        window.Echo.connector.options.auth.headers.Authorization
      );

      const privateChannel = window.Echo.private(channelName);

      privateChannel.listen("MessageSent", (data) => {
        console.log("Received message:", data);
        console.log("User ID:", data.user_id);

        setRecentMessages(() => data.recentMessages);

        setUserChats((prevChats) => {
          const newChats = { ...prevChats };
          if (!newChats[receiverId]) {
            newChats[receiverId] = [];
          }
          // console.log('New message:', newMessage);
          setNewMessages((prevMessages) => [
            ...prevMessages,
            data.messagesWithAUser[data.messagesWithAUser.length - 1],
          ]);

          // newChats[receiverId].push(newMessage);
          return newChats;
        });
      });

      console.log("Listening for messages on channel:", channelName);
    } else {
      console.error(
        "Echo is not defined. Make sure Laravel Echo is properly configured."
      );
    }
  };

  useEffect(() => {
    initializeEcho(token, receiverId);
  }, []);

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
      const now = new Date();
      const formattedTime = format(now, "EEEE, d MMMM yyyy 'at' HH:mm");

      const newChatItem = {
        text: message.trim(),
        sender: { id: ADMIN_ID },
        type: msgType,
        time: new Date(),
      };

      const newChat = [...chat, newChatItem];
      setUserChats({ ...userChats, [selectedUser]: newChat });

      // Update recentMessages to show the user you texted to at the top
      const updatedRecentMessages = recentMessages.filter(
        (msg) => msg.user_id !== selectedUser
      );
      const selectedUserMessage = {
        user_id: selectedUser,
        name: selectedUserName,
        profilePic: selectedUserProfilePic,
        message: { message: newChatItem.text },
      };
      const newRecentMessages = [selectedUserMessage, ...updatedRecentMessages];

      // Create a new array reference to force re-render
      setRecentMessages([...newRecentMessages]);
      console.log("check", selectedUserProfilePic);

      setMessage(""); // Clear the message input after sending
      setSelectedUser(selectedUser); // Set the selectedUser state to the receiverId
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const checkTyping = async () => {
    try {
      const response = await Axios.get(`/typing/${selectedUser}/${ADMIN_ID}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsTyping(response.data.typing);
      console.log(response);
    } catch (error) {
      console.error("Error checking typing status:", error);
    }
  };

  // Use useEffect to call checkTyping when the selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      checkTyping();
    }
  }, [selectedUser]);

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
    if (selectedUser) {
      checkTyping();
    }
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const messageMatch = recentMessages.some(
      (message) =>
        message.name &&
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
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await Axios.get("/user");
        setHostId(response.data.id);

        console.log(response.data.id);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error, show error message, etc.
      }
    };

    fetchUsers();
  }, []);

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
      console.log(response.data.receiver.name);
      setSelectedUserName(response.data.receiver.name); // Store the name of the selected user in state
      setSelectedUserProfilePic(response.data.receiver.profilePicture); // Store the profile picture of the selected user in state
      console.log(response);
      response.data.messagesWithAUser[0].booking_request.forEach(
        (booking, index) => {
          console.log(`Booking Request ${index + 1}:`);
          console.log("host_home_id:", booking.host_home_id);
          console.log("host_id:", booking.host_id);
          console.log("requestId:", booking.id);
        }
      );

      // Assuming you want to select the first booking request for further processing
      const selectedBookingRequest =
        response.data.messagesWithAUser[0].booking_request[0];
      if (selectedBookingRequest) {
        setSelectedUserObj({
          hostHomeId: selectedBookingRequest.host_home_id,
          requestId: selectedBookingRequest.id,
          message: selectedBookingRequest.message,
          name: response.data.receiver.name,
          profilePic: response.data.receiver.profilePic,
          user_id: selectedBookingRequest.sender_id,
        });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are received or the selected user changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [newMessages, selectedUser]);



  const renderMessages = (userChats, newMessages, selectedUser, users) => {
    const userChat = userChats[selectedUser] || [];
    const noMessagesReceived =
      userChat.length === 0 && newMessages.length === 0;
    let messageCount = 1;

    if (noMessagesReceived && message.trim()) {
      const formattedTime = format(new Date(), "EEEE, d MMMM yyyy 'at' HH:mm");
      return (
        <div className="flex flex-row-reverse mb-2">
          <div className="bg-orange-100 w-fit text-blue-900 p-2 rounded">
            <p>{message}</p>
            <p className="text-xs text-gray-500">{formattedTime}</p>
          </div>
        </div>
      );
    }

    const handleBookingAction = async (
      requestId,
      hostHomeId,
      hostId,
      guestId,
      action
    ) => {
      console.log(requestId, hostHomeId, hostId, guestId, action);
      try {
        const response = await Axios.post(
          `/handleBookingRequest/${requestId}/${hostHomeId}/${hostId}/${guestId}/${action}`
        );
        console.log("Booking request handled successfully:", response.data);
        // Optionally, you can update your UI or state based on the response
      } catch (error) {
        console.error("Error handling booking request:", error);
        // Handle error scenarios, e.g., display an error message to the user
      }
    };

    const handleApprove = () => {
      console.log("Approve parameters:", {
        requestId: selectedUserObj.requestId,
        hostHomeId: selectedUserObj.hostHomeId,
        hostId: hostId,
        guestId: selectedUser,
        action: "accept",
      });

    

      handleBookingAction(
        selectedUserObj.requestId,
        selectedUserObj.hostHomeId,
        hostId,
        selectedUser,
        "accept"
      );
    };

    const handleDecline = () => {
      handleBookingAction(
        selectedUserObj.requestId,
        selectedUserObj.hostHomeId,
        hostId,
        selectedUserObj.guestId,
        "decline"
      );
    };

    // const selectedUserProfilePic = selectedUserObj?.image;

    const filteredNewMessages = newMessages.filter(
      (msg) => !userChat.some((existingMsg) => existingMsg.id === msg.id)
    );
  
    const sortedMessages = [...userChat, ...filteredNewMessages].sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at) : new Date(a.time);
      const dateB = b.created_at ? new Date(b.created_at) : new Date(b.time);
  
      return dateA - dateB;
    });
  
    const uniqueMessages = [];
    sortedMessages.forEach((msg) => {
      const existingMsg = uniqueMessages.find((m) => m.id === msg.id);
      if (!existingMsg) {
        uniqueMessages.push(msg);
      }
    });
    


    return (
      <>
        {selectedUserObj && (
          <div className="flex items-center justify-center mb-4">
            <img
              src={
                selectedUserObj.profilePic ||
                shbrologo
              }
              alt={selectedUserObj.name}
              className="w-10 h-10 rounded-full mr-2"
            />
          </div>
        )}
         {sortedMessages.map((msg, index) => {
          const messageDate = new Date(msg.created_at);
          const isSentMessage = msg.sender?.id === ADMIN_ID;

          let timestamp = messageDate.toLocaleString(undefined, {
              weekday: "long",
              day: "numeric",
              year: "numeric",
              month: "long",
              hour: "2-digit",
              minute: "2-digit",
          });

          return (
            <div
              key={index}
              className={`flex ${
                isSentMessage ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`mb-2 p-2 rounded ${
                  isSentMessage
                    ? "bg-orange-100 w-fit text-blue-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p>{msg.message}</p>
                {messageDate instanceof Date && !isNaN(messageDate.getTime()) && (
                  <p className="text-xs text-gray-500">{timestamp}</p>
                )}
                <p>{msg.text}</p>
                <p className="text-xs text-gray-500">
                  {msg.time instanceof Date
                    ? msg.time.toLocaleString(undefined, {
                        weekday: "long",
                        day: "numeric",
                        year: "numeric",
                        month: "long",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </p>
              </div>
            </div>
          );
        })}
        {userChat.some((msg) =>
          msg.message.includes(
            "has requested to book your apartment please approve or decline"
          )
        ) && (
          <div className="flex justify-center mt-4">
            <div className="bg-gray-200 p-4 rounded-lg shadow-lg">
              {selectedUserObj && (
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={
                      selectedUserObj.profilePic ||
                      shbrologo
                    }
                    alt={selectedUserObj.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <p className="text-lg">
                    {selectedUserObj.name} has requested to book your apartment.
                    Approve or decline?
                  </p>
                </div>
              )}
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  onClick={handleDecline}
                >
                  Decline
                </button>
                <Link to={`/userdetails/${selectedUser}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600">
                  View Guest Profile
                </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const RecentMessages = ({ recentMessages, selectedUser, fetchUserChats }) => {
    return (
      <ul className="overflow-auto example">
        {recentMessages.map((message, index) => (
          <li
            key={index}
            className={`cursor-pointer flex justify-between py-4 items-center p-2 px-4 ${
              selectedUser === message.user_id ? "bg-gray-200" : ""
            }`}
            onClick={() => fetchUserChats(message.user_id)}
          >
            <div className="flex items-center">
              <img
                src={
                  message.profilePic ||
                  shbrologo
                }
                alt={message.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{message.name}</p>
                <p
                  className={`text-sm text-gray-500 overflow-hidden overflow-ellipsis h-10`}
                >
                  {message.message.message}{" "}
                  {/* Assuming this is the message text */}
                </p>
              </div>
            </div>
            {/* <button
              className="bg-orange-300 text-white h-fit  text-sm px-2 py-1 ml-2 rounded"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the li click event from firing
                // Assuming this is the correct property for the user profile link
                window.location.href = message.userProfile;
              }}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
            </button> */}
          </li>
        ))}
      </ul>
    );
  };

  useEffect(() => {
    console.log(
      "Recent Messages Updated:",
      recentMessages.map((message) => message.user_id)
    );
  }, [recentMessages]);
  return (
    <div>
      <div className="bg-gray-100 ">
        {/* <AdminHeader /> */}
        <div className="flex w-full">
          <div className="w-full  p-4 h-[85vh] overflow-auto example">
            <h1 className="text-xl font-semibold mb-4">Message</h1>
            <div className="flex ">
              <div className="hidden md:block  w-full md:w-1/3 border-r pr-4">
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <input
                  type="text"
                  className="w-full p-2 border rounded mb-2"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <RecentMessages
                  recentMessages={recentMessages}
                  selectedUser={selectedUser}
                  fetchUserChats={fetchUserChats}
                />
              </div>

              {!selectedUser && (
                <div className="block md:hidden  w-full md:w-1/4 border-r pr-4">
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
                            src={
                              message.profilePic ||
                              shbrologo
                            }
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
              {selectedUser &&
                (console.log(selectedUser),
                (
                  <div className="w-full">
                    <div className="bg-white p-4 rounded shadow">
                      {selectedUser ? (
                        <>
                          <div className="flex items-center pb-4 gap-3">
                            <div className="cursor-pointer">
                              <FaArrowLeft
                                onClick={() => setSelectedUser(null)}
                              />
                            </div>
                            <p className="font-semibold">{selectedUserName}</p>
                          </div>
                          <div
                            ref={chatContainerRef}
                            className="h-[60vh] overflow-y-auto example"
                          >
                            {renderMessages(
                              userChats,
                              newMessages,
                              selectedUser,
                              users
                            )}

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
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="mr-2"
                              />
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
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
