import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import io from "socket.io-client";
var socket;
const token = JSON.parse(localStorage.getItem("access_token"));

function Chat() {
  const { id } = token;

  const [roomId, setRoomId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0); // Initial notification count
  const [hoveredIcons, setHoveredIcons] = useState([]);
  const chatBoxRef = useRef(null); // Ref for the chat box element

///////////////

  const handleUsers = async () => {
    try {
      const response = await axios.post("http://localhost:3000/chat/agent",{receiver:id});
      return setUsers(response.data);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
//////////
  useEffect(()=>{
    handleUsers()
  },[])
  ////////////////
  const handleUserClick = async (chat) => {
    console.log(chat, "11");
    setSelectedUser(chat);
    try {
      // console.log(message, token.id ,selectedUser.id)
      const msg = await axios.post("http://localhost:3000/message/get", {
        sender: chat.senderId,
        receiver: id,
      });
      setMessages(msg.data);
      console.log(messages,"te")
    } catch (error) {
      console.log("error while sending message", error);
    }
  };
  console.log(messages,"te")
  ////////////// 
  const handleSendMessage = async () => {
    if (!selectedUser) return; // Check if a user is selected

    try {
      // console.log(message, token.id ,selectedUser.id)
      const msg = await axios.post("http://localhost:3000/message/add", {
        message,
        sender: id,
        receiver: selectedUser.senderId,
      });
      console.log(selectedUser, 'selected suer')
      // const data = msg.data;
      // setMessages((prev)=>[...prev , data])
      // socket.emit("sendMessage", { roomId, message: data });
      setMessage("");
      // const notif = await axios.post("http://localhost:3000/notification/add", {
      //   message,
      //   sender: token.id,
      //   receiver: selectedUser.id,
      // });
      // console.log(notif.data, "add, notif");
      // socket.emit("notification", { message: notif.data });
    } catch (error) {
      console.log("error while sending message", error);
    }
  };
 /////////////////// 
  const handleCompleteReport = async () => {
    const data = await axios.patch(`http://localhost:3000/user/complete`,
    {
      chatId :selectedUser.id,
      userId : selectedUser.senderId
    })
    data ? alert('report has been completed') : alert('error');
  }

  const handleBlockUser = async () => {
    const data = await axios.patch(`http://localhost:3000/user/block`,
    {
     userId: selectedUser.senderId
    })
    data ? alert('report has been blocked') : alert('error');
  }
  console.log(selectedUser, 'tryinggg')

  return (
    <div className="">
      <div className="row">
        <div
          className="col-md-4"
          style={{ maxHeight: "80vh", overflowY: "auto" }}
        >
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <span>{token.id}</span>
              {/* Notification button */}
              <div class="dropdown">
                <a
                  class="dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => setNotificationCount("")}
                >
                  <a href="" class="text-dark d-flex align-items-center">
                    <i class="fa-solid fa-bell mr-2"></i>
                    <span class="badge rounded-pill badge-notification bg-danger">
                      {notificationCount}
                    </span>
                  </a>
                </a>
                <ul class="dropdown-menu">
                  {notification &&
                    notification.map((notif, index) => (
                      <li
                        key={notif.id}
                        // onClick={() => handle_goTo_notif(notif)}
                      >
                        <a class="dropdown-item d-flex justify-content-between align-items-center">
                          <span>new {notif.message}</span>
                          <i
                            className="fa-solid fa-xmark delete-icon"
                            style={{
                              color: hoveredIcons[index] ? "red" : "black",
                            }}
                            // onMouseEnter={() => handleMouseEnter(index)}
                            // onMouseLeave={() => handleMouseLeave(index)}
                            // onClick={() => handle_delete(notif.id)}
                          ></i>
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              {/* notifiaction end */}
            </div>
            <div className="card-body">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search users"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  // onClick={handleSearch}
                >
                  Search
                </button>
              </div>
              <ul className="list-group">
                {users &&users.map((user) => (
                  <li
                    className={`list-group-item ${
                      selectedUser && selectedUser.id === user.id
                        ? "active"
                        : ""
                    }`}
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                  >
                    {user.senderPhone}<br></br>
                    <sub>{user.title}</sub>
                  </li>
                ))}
              </ul>
              {selectedUser === null && (
                <p className="text-center mt-3">Select a user</p>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-8">
  {/* Right Side - Chat Box */}
  <div
    className="card"
    style={{
      maxHeight: "60vh",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
    }}
    ref={chatBoxRef}
  >
    <div className="card-header">Chat</div>
    <div className="card-body chat-box" style={{ flex: "1", overflowY: "auto" }}>
      {/* Display messages */}
      {messages.map((msg) => (
        <div
          className="message"
          key={msg.id}
          style={{
            textAlign: msg.sender === token.id ? "right" : "left",
            color: msg.sender === token.id ? "blue" : "green",
          }}
        >
          <p>{msg.message}</p>
        </div>
      ))}
    </div>
    {/* Input field for sending messages */}
    {selectedUser && (
      <div className="card-footer">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Type your message"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
            onClick={handleSendMessage}
          >
            Send
          </button>
          <button
            className="btn btn-danger m-1"
            type="button"
            id="button-addon2"
            onClick={handleBlockUser}
          >
            Block
          </button>
          <button
            className="btn btn-success m-1"
            type="button"
            id="button-addon2"
            onClick={handleCompleteReport}
          >
            Complete
          </button>
        </div>
      </div>
    )}
  </div>
</div>

      </div>
    </div>
  );
}

export default Chat;
