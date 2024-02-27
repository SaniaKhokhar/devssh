// // import React from 'react';
// // import UserCard from './UserCard';
// // import { Typography } from '@mui/material';
// // import './AboutUs.css';

// // export default function AboutUs() {
// //   return (
// //     <>
// //       <div className="about-section">
// //         <h1>About Us</h1>
// //         <p>Some text about who we are and what we do.</p>
// //         <p>Resize the browser window to see that this page is responsive by the way.</p>
// //       </div>

// //       <Typography variant='h6' align='center'>Our Team</Typography>
// //       <div className="row">
// //         <div className="column">
// //           <UserCard />
// //         </div>

// //         <div className="column">
// //           <UserCard />
// //         </div>

// //         <div className="column">
// //           <UserCard />
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // import React from 'react'
// // import UserCard from './UserCard'
// // import { Typography } from '@mui/material'
// // import './AboutUs.css'

// // export default function AboutUs() {
// //   return (
// //     <div className='aboutus'>

// //     <Typography variant='h4' align='center' color='white' letterSpacing='5px'>About Us</Typography>
// //     <div>

// //       <Typography variant='h6' align='center' color='white'>Welcome to <b>Curio</b> where we share information related to Technology, AI based. We're dedicated to providing you the very best information and knowledge of the above mentioned topics.</Typography>
// //       <UserCard />
// //       <UserCard />
// //       <UserCard />
// //       <Typography variant='p' align='center' color='white'>If you require any more information or have any questions about our site, please feel free to contact us by email at <b>curio@tech.ac.in</b>.</Typography>

// //     </div>
// //     </div>
// //   )
// // }

// import React from "react";
// import UserCard from "./UserCard";
// import { Typography } from "@mui/material";
// import "./AboutUs.css";

// export default function AboutUs() {
//   return (
//     <>
//       <div className="about-section">
//         <h1>About Us</h1>
//         <p>Some text about who we are and what we do.</p>
//         <p>
//           Resize the browser window to see that this page is responsive by the
//           way.
//         </p>
//       </div>

//       <Typography variant="h6" align="center">
//         Our Team
//       </Typography>
//       <div className="row">
//         <div className="column">
//           <UserCard />
//         </div>

//         <div className="column">
//           <UserCard />
//         </div>

//         <div className="column">
//           <UserCard />
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import UserCard from "./UserCard";
import { Typography } from "@mui/material";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <>
      <div className="about-section">
        <h1>About Us</h1>
        <p>Welcome to Curio!</p>
        <p>
          At Curio, we're on a mission to revolutionize communication through
          innovative chatbot solutions. Our passion lies in crafting intelligent
          conversational agents that streamline processes, enhance user
          experiences, and drive business growth. Our team of skilled
          developers, designers, and AI enthusiasts is dedicated to pushing the
          boundaries of technology. With a focus on creativity and cutting-edge
          techniques, we're committed to delivering chatbot solutions that
          exceed expectations. Whether it's automating customer support,
          optimizing workflows, or engaging users in interactive conversations,
          Curio chatbots are designed to elevate your digital presence and drive
          results. Explore our website to learn more about Curio and how our
          chatbot expertise can empower your business. We're excited to embark
          on this journey with you!
        </p>
        <p>Thank you for choosing Curio!</p>
      </div>

      <Typography variant="h4" align="center">
        Our Team
      </Typography>
      <div className="row">
        <div className="column">
          <UserCard name="Hina Jadav" workType="FullStack Developer" />
        </div>
        <div className="column">
          <UserCard name="Sania Khokhar" workType="FullStack Developer" />
        </div>
        <div className="column">
          <UserCard name="Sneha Khania" workType="Frontend Developer" />
        </div>
      </div>
    </>
  );
}
