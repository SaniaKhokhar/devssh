import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from 'react-simple-star-rating'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import UserProfile from '../Login/UserProfile';

export default function ReviewToast() {

    const [rating, setRating] = useState(0)
    const [chatEnded, setChatEnded] = useState(false)

    const [userdata, setUserdata] = useState({})

    const arr = ["worst", "bad", "average", "good", "awesome"]
    const location = useLocation()
    const prevPathRef = useRef('')

    const getUser = async () => {
        try {
            const response = await axios.get("http://localhost:6010/login/success", { withCredentials: true })
            // const response = await axios.get("http://localhost:6010/api/getDetails", { withCredentials: true })
            console.log(response)
            setUserdata(response.data.user)

        }
        catch (error) {
            // navigate("/login")
            console.log(error)
        }
    }

    let userId = null
    const getReview = () => {
        getUser()
        userId = userdata.email ? userdata.email : UserProfile.getEmail()
        if (userId) {
            axios.post("/api/review/get", { userId })
            .then(response => {
                console.log("got review")
                console.log(response.data.rate)
                setRating(response.data.rate)

            })
            .catch(error => {
                setRating(0)
                console.log("Error while getting review: ", error)
            })
        }
        
    }

    const handleRating = (rate) => {
        setRating(rate)
        axios.post("/api/review/add", { rate, userId })
            .then(response => {
                console.log("Review added successfully!");

            })
            .catch(error => {
                console.error("Error adding review:", error);
            });
    }

    const handleReset = () => {

        setRating(0)
    }

    const notify = () => {
        if (userId && chatEnded && prevPathRef.current.includes('/Chat/') && location.pathname === '/') {
            toast(
                // "🦄 Wow so easy!"
                <div>
                    <small>Rate your Experience</small><br />
                    <Rating onClick={handleRating}
                        initialValue={rating}
                        tooltipArray={arr}
                        showTooltip
                        tooltipDefaultText='.....'
                    />


                </div>

            );

        }
        else {
            setChatEnded(true);
        }

    }

    useEffect(() => {
        getReview()
        notify()
        prevPathRef.current = location.pathname
    }, [location.pathname, chatEnded])

    return (
        <>
            <button onClick={notify}>Notify!</button>
            <ToastContainer position="bottom-right" autoClose={5000} theme="dark" />

        </>
    )
}
