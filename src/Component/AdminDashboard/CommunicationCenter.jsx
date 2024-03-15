import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip, faUser } from "@fortawesome/free-solid-svg-icons";
import AdminHeader from "./AdminNavigation/AdminHeader";
import AdminSidebar from "./AdminSidebar";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const CommunicationCenter = () => {
  const [selectedUser, setSelectedUser] = useState(null);
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

  const sendMessage = (msgType, file) => {
    if (!message.trim() && !file) return; // Prevent sending empty messages

    const chat = userChats[selectedUser] || [];
    let newChatItem;
    if (file) {
      newChatItem = {
        text: file,
        sender: "admin",
        type: msgType,
        time: new Date(),
      };
    } else {
      newChatItem = {
        text: message.trim(),
        sender: "admin",
        type: msgType,
        time: new Date(),
      };
    }

    const newChat = [...chat, newChatItem];

    setUserChats({ ...userChats, [selectedUser]: newChat });
    setMessage(""); // Clear the message input after sending
  };

  return (
    <div>
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
                <h2 className="text-lg font-semibold mb-2">Users</h2>
                <ul>
                  {users.map((user) => (
                    <li
                      key={user.id}
                      className={`cursor-pointer flex justify-between items-center p-2 px-4 ${
                        selectedUser === user.id ? "bg-gray-200" : ""
                      }`}
                      onClick={() => setSelectedUser(user.id)}
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
                            className={`text-sm ${
                              selectedUser === user.id
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
                      <div className="h-[77vh] overflow-y-auto example">
                        {selectedUser &&
                          userChats[selectedUser]?.length === 0 && (
                            <div className="mb-2 p-2 rounded bg-orange-100 text-blue-900 text-center">
                              Admin joined the chat
                            </div>
                          )}

                        {userChats[selectedUser]?.map((msg, index) => (
                          <div
                            key={index}
                            className={`mb-2 p-2 rounded ${
                              msg.sender === "admin"
                                ? "bg-orange-100 w-fit "
                                : "bg-gray-100"
                            } ${
                              msg.sender === "admin"
                                ? "text-blue-900"
                                : "text-gray-900"
                            }`}
                          >
                            {msg.type === "text" ? (
                              <>
                                <p>{msg.text}</p>
                                <p className="text-xs text-gray-500">
                                  {msg.time.toLocaleString(undefined, {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  })}
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
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
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
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500">
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
  );
};

export default CommunicationCenter;
