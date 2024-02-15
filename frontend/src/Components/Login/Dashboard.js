import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function Dashboard() {
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6010/login/success", {
        withCredentials: true,
      });
      setUserdata(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:6010/logout");
      UserProfile.clearDetails();
      navigate("/login");
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="dashboard-container">
        <div className="user-box">
          <img
            src={userdata?.image ? userdata?.image : UserProfile.getImage()}
            alt="User Avatar"
            className="user-avatar"
          />
          <div className="user-details">
            <div className="username">
              {userdata.username
                ? userdata.username
                : UserProfile.getUsername()}
            </div>
            <div className="email">
              {userdata.email ? userdata.email : UserProfile.getEmail()}
            </div>
          </div>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}