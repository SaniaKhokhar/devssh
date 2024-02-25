import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "../Home/Home.css";
import { Button } from "react-bootstrap";

const Home = () => {
  const navigate = useNavigate();

  /** */
  // const handleClick = (e) => {
  //   console.log(e.target.id)
  //   navigate(`/chat/${e.target.id}`, { state: { section: e.target.id } })

  //   // // return <Link to="/Chat" />;
  //   // // <Navigate to="Chat" />;
  //   // console.log("sdc");
  // };

  return (
    <>
    
    <div className="home">
      <button 

        style={{boxShadow: "10px 10px 30px #070F2B" }}

        onClick={navigate('/chat/Yoga')} 
        className="talkButton">

        Let's talk with Curio!
      </button>

    </div>
  </>
  );
};

export default Home;
// In this case, if isPopupOpen is true, the second expression after && will be evaluated.
// If isPopupOpen is false, the entire block will not be rendered.
