import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import UserProfile from "./UserProfile";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    // try {
    //     const response = await axios.post("http://localhost:6010/login", { email, password });
    //     console.log(response.data);
    //     navigate('/dashboard')
    // } catch (error) {
    //     console.error(error)
    //     console.error(error.response.data.message);
    // }

    axios
      .post("http://localhost:6010/login", { email, password })
      .then((res) => {
        window.localStorage.setItem("isAuthenticated", true);
        console.log(res);
        if (res.status === 200) {
          setError("");
          console.log(res);
          UserProfile.setEmail(email);
          UserProfile.setUsername(res.data.user.username);

          navigate("/dashboard");
          // this.setState({ success: true, error: false });
          // this.props.history.push("/");
        }
      })
      .catch((error) => {
        console.error("Error:", error);

        if (error.response && error.response.data) {
          setError(error.response.data.message || "Internal Server Error");
        } else {
          setError("Internal Server Error");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login</h2>
        <form className="login-form">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error ? <div style={{ color: "red" }}>{error}</div> : ""}
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
        <p>
          Not have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>

      <div className="or-divider">OR</div>

      <GoogleLogin />
    </div>
  );
};

export default Login;
