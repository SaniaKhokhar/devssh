import { Box,Avatar, Typography, Button, IconButton} from "@mui/material";
import red from '@mui/material/colors/red';

import React, { useRef, useState } from "react";
import ChatItem from "../Chat/ChatItem";
import {IoMdSend} from "react-icons/io";
// import { sendChatRequest } from "../helpers/api-communicator";

const chatMessages = [
    {role: "assistant", content: "Hello! How can I assist you today?"},
    {role: "user", content: "I need help with setting up my email account."},
    {role: "assistant", content: "Sure, I can help with that. Which email provider are you using?"},
    {role: "user", content: "I'm using Gmail."},
    {role: "assistant", content: "Great! Here are the steps to set up your Gmail account..."},
    {role: "user", content: "Thank you! That was very helpful."},
    {role: "assistant", content: "You're welcome! Is there anything else I can assist you with?"},
    {role: "user", content: "Not at the moment, thanks."},
    {role: "assistant", content: "Alright, feel free to reach out if you need further assistance. Have a great day!"},
]

const Chat = () => {
    const username="user";
    const inputRef = useRef(null)

    // const [chatMessages,setChatMessages] = useState([])
    // const handleSubmit = async() =>{
    //     console.log(inputRef.current?.value)
    //     const content = inputRef.current.value
    //     if(inputRef && inputRef.current){
    //         inputRef.current.value = ""
    //     }
    //     const newMessage = {role:"user",content}
    //     setChatMessages((prev) => [...prev, newMessage])

    //     const chatData = await sendChatRequest(content)
    //     setChatMessages([...chatData.chats])
    // }
    return (
        <Box 
            sx={{
                display:"flex", 
                flex:1, 
                width:"100%", 
                height:"100%",
                mt:3,
                gap:3,
            }}>
            <Box 
                sx={{
                    display: {
                        md:"flex",
                        xs:"none",
                        sm: "none",
                    },
                    flex:0.2,
                    flexDirection:"column"
                }}
             >
                <Box 
                    sx={{
                        display:"flex",
                        width:"100%",
                        height:"60vh",
                        bgcolor:"rgb(17,29,39)",
                        borderRadius: 5,
                        flexDirection: "column",
                        mx:3,
                }} >
                    <Avatar 
                        sx={{
                            mx:"auto",
                            my:2,
                            bgcolor:"white",
                            color:'black',
                            fontWeight:700,
                        }}
                    > {username[0]}                    
                    </Avatar>
                    <Typography 
                        sx={{
                            mx:"auto",
                            fontFamily:"work sans"
                        }}
                    >
                        You are talking to Curio !!
                    </Typography>
                    <Typography 
                        sx={{
                            mx:"auto",
                            fontFamily:"work sans",
                            my:4,
                            p:3
                        }}
                    >
                        You can ask questions related to food,medical,yoga !!
                    </Typography>
                    <Button sx={{
                        width:"200px",
                        my:"auto",
                        color:"white",
                        fontWeight: "700",
                        borderRadius:3,
                        mx:"auto",
                        bgcolor: red[300],
                        ":hover":{
                            bgcolor : red.A400,
                        },
                    }}>
                        Clear conversation
                    </Button>
                </Box>
            </Box>
            <Box 
                sx={{
                    display: "flex",
                    flex:{
                        md: 0.8,
                        xs: 1,
                        sm: 1
                    },
                    flexDirection: "column",
                    px:3,
                }} >
                 <Typography  
                 sx={{
                    //textAlign:"center",
                    fontSize: "40px",
                    color:"white",
                    mb:2,
                    mx:"auto",
                    fontWeight:"600",
                 }}>
                    Curio
                 </Typography>   
                 <Box 
                    sx={{
                        width:"100%",
                        height:"60vh",
                        borderRadius:3,
                        mx:"auto",
                        display:"flex",
                        flexDirection:"column",
                        overflow:"scroll",
                        overflowX:"hidden",
                        overflowY:"auto",
                        scrollBehavior: "smooth",
                        color: 'black',
                    }}>                
                    {chatMessages.map((chat,index) => <ChatItem content={chat.content} role={chat.role} />)}
                 </Box>
                 <div 
                    style={{
                        width:"100%", 
                        padding:"20px", 
                        borderRadius:8, 
                        backgroundColor:"rgb(17,27,39)", 
                        margin: "auto",
                        display:"flex", 
                    }}>
                    <input 
                        ref={inputRef}
                        type="text" 
                        style={{
                            width:"100%",
                            backgroundColor:"transparent",
                            padding:'10px',
                            border:"none",
                            outline:"none",
                            color:"white",
                            fontSize:"20px",
                    }} />
                    <IconButton 
                        // onClick={handleSubmit}
                        sx={{ml:"auto", color:"white"}} >
                        <IoMdSend />
                    </IconButton>
                 </div>                 
            </Box>
        </Box>        
    )
}

export default Chat;

// import React, { useRef, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from 'axios'

// import { Box, Avatar, Typography, Button, IconButton } from "@mui/material";
// // import Navbar from "Navbar/Navbar.js";
// // import Home from "./Components/Home/Home";
// // import Feedback from "./Components/Feedback/Feedback";
// // import Chat from "./Chat/Chat";
// import "../Chat/Chat.css"
// import ChatItem from "./ChatItem";

// const Chat = (props) => {
//   // const [mode, setMode] = useState("light");
//   const location = useLocation();
//   const section = location.state ? location.state.section : "Unknown Section";

//   const [message, setMessage] = useState('')
//   const [response, setResponse] = useState('')
//   const inputRef = useRef(null);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     try {
//       const content = inputRef.current?.value;
//       if (inputRef && inputRef.current) {
//         inputRef.current.value = "";
//       }
//       const newMessage = { content };
//       setMessage(message)
//       // setMessage((prev) => [...prev, newMessage]);
//       //const chatData = await sendChatRequest(content);
//       // setMessage([...chatData.chats]);
//       console.log(message)
//       // http://localhost:6010/
//       const res = await axios.post(`/api/chat/${section.toLowerCase()}`,
//         { name: message.toLowerCase() }
//       )
//       setResponse([...res.data])
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }
//   const handleKeyDown = (event) => {    
//     if (event.key === 'Enter') {
//       handleSendMessage();
//       event.preventDefault();
//     }
//   };
//   return (
//     <>
//       {/* <Navbar mode={mode} setMode={setMode} /> */}      
//       {/* Add your chat content here */}
//       <div className="chat">
//       <h1>{section} Chat Page</h1>
//       {/* {response && ( */}
//         <div className="chat-response">
//           {/* <h2>Bard's Response:</h2> */}
//           <p>
//           {response ? <p><b>Response</b>: <br /> {response.map((lines,index) => (
//             <p key={index}>{lines} <br></br></p>
//             // <ChatItem content={lines} key={index} />
//           ))}</p> : ""}
//           </p>
//         </div>
//       {/* )} */}
//       <form  onSubmit={handleSendMessage}>   
//         {/* */}
//         <textarea
//           // ref ={inputRef}
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Ask anything.a.."
//           // onKeyDown={handleKeyDown}
//         />
//         <button type="submit">Send</button>
//         {/* onClick={handleSendMessage} */}
//       </form>
//     </div>
      
//     </>
//   );
// };

// export default Chat;

