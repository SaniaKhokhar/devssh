import Popup from "./Popup";
// import Button from "./Button";
import { useState } from "react";
import axios from "axios";
import "./Feedback.css";
import Button from "./Button";

export default function FeedbackFormPopup({ setShow }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleCreatePostButtonClick(ev) {
    console.log("button")
    ev.preventDefault();
    axios
      .post("/api/feedback/feedback", { title, description })
      .then((res) => {
        console.log(res);
        setShow(false);
        window.location.reload()
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <Popup setShow={setShow} title={"Make a suggestion"}>
      <form className="p-8">
        <label className="dtitle">Title</label>
        <input
          className="titletextbox"
          type="text"
          placeholder="A short, descriptive title"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label className="ddescription">Details</label>
        <textarea
          className="descriptiontextbox"
          placeholder="Please include any details"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <div style={{display:"flex", justifyContent: "flex-end"}}>
          <button onClick={handleCreatePostButtonClick}>
            Send Feedback
          </button>
        </div>
      </form>
    </Popup>
  );
}
