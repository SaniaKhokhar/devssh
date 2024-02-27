import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../Login/CustomizedInput";
import { toast } from "react-hot-toast";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import airobot from '../../Assest/airobot.jpg'
import '../Login/Signup.css'

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signed Up Successfully", { id: "signup" });
    } catch (error) {
      console.log(error);
      toast.error("Signing Up Failed", { id: "signup" });
    }
  };
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat");
    }
  }, [auth]);
  return (
    <Box className="signup-container">
      <Box className="img-container" padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img className='img-src' src={airobot} alt="Robot" style={{ width: "400px" }} />
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
          onSubmit={handleSubmit}
          className="signup-form"
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
              Signup
            </Typography>
            <CustomizedInput type="text" name="name" label="Name" />
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
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;

// import React, { useState } from 'react';
// import './Signup.css'; // Import your CSS file
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import UserProfile from './UserProfile';
// import GoogleLogin from './GoogleLogin';

// export default function Signup() {
//     const [username, setUsername] = useState('')
//     const [password, setPassword] = useState('')
//     const [email, setEmail] = useState('')
//     const [error, setError] = useState('')
//     // const [isError, setIsError] = useState(false)

//     const navigate = useNavigate()

//     const handleSignup = async () => {
//         // try {
//         //     await axios.post('http://localhost:6010/signup', {
//         //       username,
//         //       email,
//         //       password,
//         //     });
//         //     console.log('User created successfully');
//         //     navigate('/dashboard')
//         //   } catch (error) {
//         //     console.error('Error during signup:', error);
//         //   }

//         try {
//             const res = await axios.post('http://localhost:6010/signup', {
//                 username,
//                 email,
//                 password,
//             });

//             console.log('User created successfully', res);
//             window.localStorage.setItem("isAuthenticated", true);
//             if (res.status === 200 || res.status === 201) {
//                 setError("")

//                 UserProfile.setEmail(email)
//                 UserProfile.setUsername(username)
                
//                 navigate('/dashboard')
//             }
//             else if (res.message === 400) {
//                 console.log(res)
//                 setError(res.message)
//             }

//         } catch (error) {
//             if (error.response && error.response.status === 400) {
//                 setError(error.response.data.message)

//             }
//             console.error('Error during signup:', error.response.data.message);
//         }
//     };

//     return (
//         <>
//             <div className="signup-container">
//                 <div className="signup-form-container">
//                     <h2>Signup</h2>
//                     <form className="signup-form">
//                         <label htmlFor="username">Username:</label>
//                         <input
//                             type="text"
//                             id="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                         />

//                         <label htmlFor="email">Email:</label>
//                         <input
//                             type="email"
//                             id="email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />

//                         <label htmlFor="password">Password:</label>
//                         <input
//                             type="password"
//                             id="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />

//                         {error ? <div style={{ color: 'red' }}>{error}</div> : ""}

//                         <button type="button" onClick={handleSignup}>
//                             Signup
//                         </button>
//                     </form>
//                     <p>Already have an account? <Link to="/login">Login</Link></p>
//                 </div>

//                 <div className="or-divider">OR</div>

//                 <GoogleLogin />
//             </div>
//         </>
//     )
// }
