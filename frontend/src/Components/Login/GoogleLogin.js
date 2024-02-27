import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';
export default function GoogleLogin() {
    const handleGoogleLogin = () => {
        window.open("http://localhost:5000/auth/google/callback", "_self")
    
        // console.log('Logging in with:', email, password);
      };
  return (
    <>
      <div className="google-signin-container">
        <p>sign in with Google:</p>
        <button className="google-signin-button" onClick={handleGoogleLogin}>
          <FontAwesomeIcon icon={faGoogle} className="google-icon" size="2x" />

          <div className="google-signin-text" >
            Sign in with Google
          </div>
        </button>
      </div>
    </>
  )
}
