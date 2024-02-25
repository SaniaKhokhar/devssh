import React, { useEffect, useState } from "react";
import axios from 'axios'
// import Button from "./Button";
import "./Feedback.css"
import FeedbackItem from "./FeedbackItem";
import FeedbackFormPopup from "./FeedbackFormPopup";
import FeedbackItemPopup from "./FeedbackItemPopup";

const Feedback = () => {
    const [showFeedbackPopupForm, setShowFeedbackPopupForm] = useState(false);
    const [showFeedbackPopupItem, setShowFeedbackPopupItem] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
      axios.get("/api/feedback/feedback").then((res) => {
        setFeedbacks(res.data);
      });
    }, []);

    function openFeedbackPopupForm() {
        setShowFeedbackPopupForm(true);
    }
    function openFeedbackPopupItem(feedback) {
      console.log(feedback)
        setShowFeedbackPopupItem(feedback);
    }

    return (
      <div className="feedback-container">
        <main className="feedback">
          <div className="feedbackpageTitle">
            <h1>Feedback </h1>
            <p style={{textopacity:"90", textslate:"700"}}>Help us decide !!!</p>
          </div>
          <div className="feedbackbox">
            {/* <div className="grow"></div> */}
            <div>
              <button className="suggestion-button" primary onClick={openFeedbackPopupForm}>
                Make a suggestion
              </button>
            </div>
          </div>
          <div style={{paddingLeft: "1rem",paddingRight: "1rem"}}>
            {feedbacks.map((feedback) => (
              // eslint-disable-next-line react/jsx-key
              <FeedbackItem
                {...feedback}
                onOpen={() => openFeedbackPopupItem(feedback)}
              />
            ))}
    
          </div>
          {showFeedbackPopupForm && (
            <FeedbackFormPopup setShow={setShowFeedbackPopupForm} />
          )}
          {showFeedbackPopupItem && (
            <FeedbackItemPopup
              {...showFeedbackPopupItem}
              setShow={setShowFeedbackPopupItem}
            />
          )}
        </main>
        </div>
      );
}

export default Feedback;