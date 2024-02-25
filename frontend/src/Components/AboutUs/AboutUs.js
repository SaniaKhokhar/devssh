import React from 'react'
import UserCard from './UserCard'
import { Typography } from '@mui/material'
import './AboutUs.css'

export default function AboutUs() {
  return (
    <div className='aboutus'>
    
    <Typography variant='h4' align='center'>About Us</Typography>
    <div>
      <UserCard />
      <UserCard />
      <UserCard />
    </div>
    </div>
  )
}
