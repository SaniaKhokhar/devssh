import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Feedback from "./Components/Feedback/Feedback";
import Chat from "./Components/Chat/Chat";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import Dashboard from "./Components/Login/Dashboard";
import ReviewToast from "./Components/Review/ReviewToast";
import Profile from "./Components/Profile/Profile"
import AboutUs from "./Components/AboutUs/AboutUs";

const App = () => {
  // for dark light mode
  const [mode, setMode] = useState("light");

  return (
    <div className={`container ${mode}`}>
      <Navbar mode={mode} setMode={setMode} />
      {/* <Home mode={mode} setMode={setMode} /> */}

      <ReviewToast />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:userId" element={<Profile/>}/>
        <Route path="/aboutus" element={<AboutUs />} />

        {/* <Route path="/login" component={Login} /> */}
      </Routes>
    </div>
  );
};

export default App;

// <Navbar /> : this is component for navbar