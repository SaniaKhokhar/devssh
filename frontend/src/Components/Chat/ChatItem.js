import { Avatar, Box, Typography } from '@mui/material'
import React from 'react'

const ChatItem = ({content, role}) => {
    const username="sk"
    const roll= "ai"
  return (
   role === "assistant" ? (
   <Box 
    sx ={{
        display:"flex",
        p:4,
        bgcolor:"#09535C91",
        color:"black",
      // #004d5612
        my:2,
        gap:2
    }}>
        <Avatar sx = {{ ml:"0"}}>
            {roll}
            {/* <img src="openai.png" alt="assistant image" width={"30px"}/> */}
        </Avatar>
        <Box>
            <Typography fontSize={"20px"}>{content}</Typography>
        </Box>
   </Box> 
   ) : <Box 
        sx ={{
            display:"flex",
            p:4,
            bgcolor:"#9290C3",
            // 004d56
            my:4,
            gap:2
        }}>
        <Avatar sx = {{ ml:"0"}}>
            {/* <img src="openai.png" alt="user image" width={"30px"}/> */}
            {username}   
        </Avatar>
        <Box>
            <Typography color={"black"} fontSize={"20px"}>{content}</Typography>
        </Box>
  </Box> 
  )
}

export default ChatItem

// import { Box, Typography } from "@mui/material";
// import React from "react";

// const ChatItem = ({content}) => {(
//       <Box
//         style={{
//           display: "flex",
//           p: 2,
//           bgcolor: "#004d56",
//           gap: 2,
//           borderRadius: 2,
//         }}
//       >        
//         <Box>          
//             <Typography style={{ fontSize: "20px" }}>{content}</Typography>
//         </Box>
//       </Box>
//     );
//   };
  
//   export default ChatItem;