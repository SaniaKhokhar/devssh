import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:6010/profile/${userId}`);
        setUser(res.data);
        // Initialize updatedUser with user data
        setUpdatedUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null); // Reset user state to handle error case
      }
    };
    fetchUserProfile();
  }, [userId]);

  const handleEditClick = () => {
    navigate(`/profile/${userId}`);
    setEditable(true);
  };

  const handleSaveClick = async () => {
    try {
      // Update local state with the updated user data
      setUser(updatedUser);

      // Make the API call to update the data on the server
      await axios.put(`http://localhost:6010/profile/${userId}`, updatedUser);

      // If the API call is successful, set editable to false to exit edit mode
      setEditable(false);

      // Log a success message
      console.log("Profile updated successfully!");

      // Redirect the user to the desired page
      // Example: history.push("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      // Handle error updating profile
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(`/profile/${userId}`);
  };

  if (!user) {
    return <div className="profile-container">User profile not found</div>;
  }

  return (
    <div className="profile-container">
      <div className="pofile-image">
        <img
          src={user.getImage || "./defaultProfile.jpg"}
          alt="Profile"
          className="profile-image"
        />
      </div>
      <div className="profile-details">
        <h1>User Profile</h1>
        <label htmlFor="username">Name:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={editable ? updatedUser.username : user.username}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={editable ? updatedUser.email : user.email}
          readOnly={!editable}
          onChange={handleInputChange}
        />
        <br />
        {editable ? (
          <div>
            <button onClick={handleSaveClick} className="save-button">
              Save
            </button>
            <button onClick={handleBackClick} className="back-button">
              Back
            </button>
          </div>
        ) : (
          <button onClick={handleEditClick} className="edit-button">
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;