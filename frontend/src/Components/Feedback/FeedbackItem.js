import Popup from "./Popup";
import { useState } from "react";
import Button from "./Button";
import "./Feedback.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from "axios";

export default function FeedbackItem({
  _id,
  onOpen,
  title,
  description,
  votesCount,
}) {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const isLoggedIn = true;

  function handleVoteButtonClick(ev) {

    ev.stopPropagation(); // only vote button is clicked not the whole feedback item, else popup of feedback will be open
    // ev.PreventDefault() // prevent reload of page on clicking vote button

    axios.post("/api/feedback/vote", { _id }).then((res) => {
      window.location.reload()
      // axios.get("/api/feedback/feedback")
    });
    setShowLoginPopup(true);
  }
  return (
    <a href="" onClick={(e) => {
      e.preventDefault();
      onOpen();
    }}
      className="feedbackcard"
    >
      <div style={{ flexGrow: "1" }}>
        <h2 style={{ fontWeight: "bold" }}>{title}</h2>
        <p style={{ fontSize: "0.875rem", color: "#2d3740" }}>{description}</p>
      </div>
      <div>
        {showLoginPopup && (
          <Popup
            title={"Confirm your vote!"}
          // narrow
          // setShow={setShowLoginPopup}
          >
            <div style={{ padding: "1rem" }}>login button</div>
          </Popup>
        )}
        <Button
          onClick={handleVoteButtonClick}
          className="voteButton"
        >
          {/* <span className="triangle-vote-up"></span> */}
          {/* <FontAwesomeIcon icon="fa-sharp fa-regular fa-triangle" /> */}
          {votesCount || "0"}
        </Button>

      </div>
    </a>
  );
}
//flex : used for upvote to adjust according to button
//      for
