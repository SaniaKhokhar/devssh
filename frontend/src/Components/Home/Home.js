import React, { useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "../Home/Home.css";
import chat from "../Chat/Chat";


const Home = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const navigate = useNavigate();

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  /** */
  const handleClick = (e) => {
    console.log(e.target.id)
    navigate(`/Chat/${e.target.id}`, { state: { section: e.target.id } })

    // // return <Link to="/Chat" />;
    // // <Navigate to="Chat" />;
    // console.log("sdc");
  };

  return (
    <div className="home">
      <button onClick={openPopup} className="talkButton">
        Talk!
      </button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <p>Select your content.</p>
            <button id="Food" onClick={handleClick}>Food Recipe</button>
            <button id="Medicine" onClick={handleClick}>Medical</button>
            <button id="Yoga" onClick={handleClick}>Yoga</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
// In this case, if isPopupOpen is true, the second expression after && will be evaluated.
// If isPopupOpen is false, the entire block will not be rendered.
