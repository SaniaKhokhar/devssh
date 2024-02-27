import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../Login/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../Login/Login.css'

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      console.log(auth?.user)
      toast.loading("Signing In", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed In Successfully", { id: "login" });
    } catch (error) {
      console.log(error);
      toast.error("Signing In Failed", { id: "login" });
    }
  };
  useEffect(() => {
    console.log(auth?.user)
    if (auth?.user) {
      return navigate("/");
    }
  }, [auth]);
  return (
    <Box className="login-container" >
      <Box className="img-container" mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" className='img-src' />
      </Box>
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
        
      >
        <form
        className="login-form"
          onSubmit={handleSubmit}
          
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4"
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />
            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#535C91",
                color: "white",
                ":hover": {
                  bgcolor: "#9290C3",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;

// import React, { useState } from "react";
// import "./Login.css";
// import { Link, useNavigate } from "react-router-dom";

// import axios from "axios";
// import UserProfile from "./UserProfile";
// import GoogleLogin from "./GoogleLogin";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     // try {
//     //     const response = await axios.post("http://localhost:6010/login", { email, password });
//     //     console.log(response.data);
//     //     navigate('/dashboard')
//     // } catch (error) {
//     //     console.error(error)
//     //     console.error(error.response.data.message);
//     // }

//     axios
//       .post("http://localhost:6010/login", { email, password })
//       .then((res) => {
//         window.localStorage.setItem("isAuthenticated", true);
//         console.log(res);
//         if (res.status === 200) {
//           setError("");
//           console.log(res);
//           UserProfile.setEmail(email);
//           UserProfile.setUsername(res.data.user.username);

//           navigate("/dashboard");
//           // this.setState({ success: true, error: false });
//           // this.props.history.push("/");
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);

//         if (error.response && error.response.data) {
//           setError(error.response.data.message || "Internal Server Error");
//         } else {
//           setError("Internal Server Error");
//         }
//       });
//   };

//   return (
//     <div className="login-container">
//       <div className="login-form-container">
//         <h2>Login</h2>
//         <form className="login-form">
//           <label htmlFor="email">Email:</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error ? <div style={{ color: "red" }}>{error}</div> : ""}
//           <button type="button" onClick={handleLogin}>
//             Login
//           </button>
//         </form>
//         <p>
//           Not have an account? <Link to="/signup">Signup</Link>
//         </p>
//       </div>

//       <div className="or-divider">OR</div>

//       <GoogleLogin />
//     </div>
//   );
// };

// export default Login;
