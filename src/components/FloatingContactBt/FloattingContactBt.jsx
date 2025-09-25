import React, { useState } from "react";
import "./FloattingContactBt.css";
import Zalo from "../../assets/Icons/Zalocon.png";
import Mess from "../../assets/Icons/Mess.svg.webp";
import Chat from "../../assets/Icons/chat.png";
import ChatBox from "../ChatBox/ChatBox";
const FloattingContactBt = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="floating-container">
      <div className="contact-options">
        <a
          href="https://www.facebook.com/messages/t/101129677941229"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item"
        >
          <img src={Mess} alt="Messenger" />
          <span>Chat Messenger (8h–21h)</span>
        </a>
        <a
          href="https://zalo.me/0916612772"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-item"
        >
          <img src={Zalo} alt="Zalo" />
          <span>Chat Zalo (8h–21h)</span>
        </a>
        {/* <div className="contact-item chat-toggle" onClick={() => setShowChat(!showChat)}>
          <img src={Chat} alt="Call" />
          <span>Chat trực tiếp</span>
        </div> */}
      </div>
      {showChat && <ChatBox onClose={() => setShowChat(false)} />}
    </div>
  );
};
export default FloattingContactBt;
