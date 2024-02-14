import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios'

import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
// import Navbar from "Navbar/Navbar.js";
// import Home from "./Components/Home/Home";
// import Feedback from "./Components/Feedback/Feedback";
// import Chat from "./Chat/Chat";
import "../Chat/Chat.css"
import ChatItem from "./ChatItem";

const Chat = (props) => {
  // const [mode, setMode] = useState("light");
  const location = useLocation();
  const section = location.state ? location.state.section : "Unknown Section";

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')
  const inputRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const content = inputRef.current?.value;
      if (inputRef && inputRef.current) {
        inputRef.current.value = "";
      }
      const newMessage = { content };
      setMessage(message)
      // setMessage((prev) => [...prev, newMessage]);
      //const chatData = await sendChatRequest(content);
      // setMessage([...chatData.chats]);
      console.log(message)
      // http://localhost:6010/
      const res = await axios.post(`/api/chat/${section.toLowerCase()}`,
        { name: message.toLowerCase() }
      )
      setResponse([...res.data])
    }
    catch (error) {
      console.log(error)
    }
  }
  const handleKeyDown = (event) => {    
    if (event.key === 'Enter') {
      handleSendMessage();
      event.preventDefault();
    }
  };
  return (
    <>
      {/* <Navbar mode={mode} setMode={setMode} /> */}      
      {/* Add your chat content here */}
      <div className="chat">
      <h1>{section} Chat Page</h1>
      {/* {response && ( */}
        <div className="chat-response">
          {/* <h2>Bard's Response:</h2> */}
          <p>
          {response ? <p><b>Response</b>: <br /> {response.map((lines,index) => (
            <p key={index}>{lines} <br></br></p>
            // <ChatItem content={lines} key={index} />
          ))}</p> : ""}
          </p>
        </div>
      {/* )} */}
      <form  onSubmit={handleSendMessage}>   
        {/* */}
        <textarea
          // ref ={inputRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything.a.."
          // onKeyDown={handleKeyDown}
        />
        <button type="submit">Send</button>
        {/* onClick={handleSendMessage} */}
      </form>
    </div>
      
    </>
  );
};

export default Chat;