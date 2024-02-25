import React from 'react';
import UserCard from './UserCard';
import { Typography } from '@mui/material';
import './AboutUs.css';

export default function AboutUs() {
  return (
    <>
      <div className="about-section">
        <h1>About Us</h1>
        <p>Some text about who we are and what we do.</p>
        <p>Resize the browser window to see that this page is responsive by the way.</p>
      </div>

      <Typography variant='h6' align='center'>Our Team</Typography>
      <div className="row">
        <div className="column">
          <UserCard />
        </div>

        <div className="column">
          <UserCard />
        </div>

        <div className="column">
          <UserCard />
        </div>
      </div>
    </>
  );
}


// import React from 'react'
// import UserCard from './UserCard'
// import { Typography } from '@mui/material'
// import './AboutUs.css'

// export default function AboutUs() {
//   return (
//     <div className='aboutus'>
    
//     <Typography variant='h4' align='center' color='white' letterSpacing='5px'>About Us</Typography>
//     <div>
      
//       <Typography variant='h6' align='center' color='white'>Welcome to <b>Curio</b> where we share information related to Technology, AI based. We're dedicated to providing you the very best information and knowledge of the above mentioned topics.</Typography>
//       <UserCard />
//       <UserCard />
//       <UserCard />
//       <Typography variant='p' align='center' color='white'>If you require any more information or have any questions about our site, please feel free to contact us by email at <b>curio@tech.ac.in</b>.</Typography>

//     </div>
//     </div>
//   )
// }
