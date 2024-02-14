import React, { useState } from 'react';
import './Signup.css'; // Import your CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserProfile from './UserProfile';
import GoogleLogin from './GoogleLogin';

export default function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    // const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    const handleSignup = async () => {
        // try {
        //     await axios.post('http://localhost:6010/signup', {
        //       username,
        //       email,
        //       password,
        //     });
        //     console.log('User created successfully');
        //     navigate('/dashboard')
        //   } catch (error) {
        //     console.error('Error during signup:', error);
        //   }

        try {
            const res = await axios.post('http://localhost:6010/signup', {
                username,
                email,
                password,
            });

            console.log('User created successfully', res);
            window.localStorage.setItem("isAuthenticated", true);
            if (res.status === 200 || res.status === 201) {
                setError("")

                UserProfile.setEmail(email)
                UserProfile.setUsername(username)
                
                navigate('/dashboard')
            }
            else if (res.message === 400) {
                console.log(res)
                setError(res.message)
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message)

            }
            console.error('Error during signup:', error.response.data.message);
        }
    };

    return (
        <>
            <div className="signup-container">
                <div className="signup-form-container">
                    <h2>Signup</h2>
                    <form className="signup-form">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

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

                        {error ? <div style={{ color: 'red' }}>{error}</div> : ""}

                        <button type="button" onClick={handleSignup}>
                            Signup
                        </button>
                    </form>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>

                <div className="or-divider">OR</div>

                <GoogleLogin />
            </div>
        </>
    )
}
