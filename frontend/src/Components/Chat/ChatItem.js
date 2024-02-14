import { Box, Typography } from "@mui/material";
import React from "react";

const ChatItem = ({content}) => {(
      <Box
        style={{
          display: "flex",
          p: 2,
          bgcolor: "#004d56",
          gap: 2,
          borderRadius: 2,
        }}
      >        
        <Box>          
            <Typography style={{ fontSize: "20px" }}>{content}</Typography>
        </Box>
      </Box>
    );
  };
  
  export default ChatItem;