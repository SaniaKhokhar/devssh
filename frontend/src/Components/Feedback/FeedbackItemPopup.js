import Button from "./Button";
import FeedbackItemPopupComments from "./FeedbackItemPopupComments";
import Popup from "./Popup";
import './Feedback.css';
import { useEffect } from "react";
import axios from "axios";

export default function FeedbackItemPopup({_id,title,description,setShow,votesCount}){
    function updateVote(){    
        axios.post("/api/feedback/vote",{_id}).then((res) => {
            window.location.reload()
        });
    }
    return(
        <Popup title={'Confirm your vote!'} setShow={setShow}>
            <div style={{padding: "2rem",paddingBottom: "0.5rem"}}>
                <h2 className="feedbackitempopupdescription">{title}</h2>
                <p className="feedbackitempopupdescription">{description}</p>
            </div>
            <div className="upvotepop">
                <Button primary onClick={updateVote} >
                    <span className="feedbackitemupvote"></span>
                    Upvote {votesCount}
                </Button>
            </div>
        </Popup>
    )
}