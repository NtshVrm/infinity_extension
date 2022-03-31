import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import "./home.css";

export default function Home() {
  const nameInput = useRef("");
  const [userName, setUserName] = useState("");

  return (
    <div className="home-container banner">
      <div className="content">
        <p className="intro-text">Hey there! What's your name?</p>
        <input
          type="text"
          className="intro-input"
          ref={nameInput}
          onChange={() => setUserName(nameInput.current.value)}
        />
      </div>

      {userName !== "" ? (
        <button className="intro-button">
          <div className="icon">
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
          Get Started
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
