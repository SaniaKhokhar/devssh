import React from "react";
import "./Navbar.css";
import sun from "../../Assest/sun.png";
import moon from "../../Assest/moon.png";
import yolob from "../../Assest/yolob.png";
import yolow from "../../Assest/yolow.png";
import userb from "../../Assest/userb.png";
import userw from "../../Assest/userw.png";
import Login from "../Login/Login";
import { Link} from "react-router-dom";

const Navbar = ({ mode, setMode }) => {
  // toggle finction --> link it with togglw icon
  const toggle_mode = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };
  
  return (
    <div className="navbar">
      <img
        src={mode === "light" ? yolob : yolow}
        alt="YOLO"
        className="logo"
      />

      {/* <ul>
        <li>Home</li>
        <li>Feedback</li>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul> */}

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      {/* for Dark and Light mode */}
      <img
        onClick={() => {
          toggle_mode();
        }}
        src={mode === "light" ? moon : sun}
        alt="Light mode"
        className="toggle"
      />
      {/* User logo */}
      <img
        // onClick={() => {
        //   toggle_mode();
        // }}
        src={mode === "light" ? userb : userw}
        alt="User"
        className="toggle"
      />
    </div>
  );
};

export default Navbar;

// onCanPlay = It is a HTML attribute which useful if you want to perform some action or provide feedback
