import { useState } from "react";
import "./FloattingContactBt.css";
import Zalo from "../../assets/Icons/Zalocon.png";
import Mess from "../../assets/Icons/Mess.svg.webp";
import Chat from "../../assets/Icons/chat.png";
import ChatBox from "../ChatBox/ChatBox";

// Import WhatsApp icon hoặc dùng URL
const WhatsAppIcon = "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg";

const FloattingContactBt = () => {
  const [showChat, setShowChat] = useState(false);

  const contactLinks = [
    {
      href: "https://www.facebook.com/messages/t/110748268506858",
      icon: Mess,
      alt: "Messenger",
      label: "Chat Messenger (8h–21h)"
    },
    {
      href: "https://zalo.me/0916612772",
      icon: Zalo,
      alt: "Zalo",
      label: "Chat Zalo (8h–21h)"
    },
    {
      href: "https://wa.me/84916612772", // Định dạng đúng: https://wa.me/[country_code][phone_number]
      icon: WhatsAppIcon,
      alt: "WhatsApp",
      label: "Chat WhatsApp (8h–21h)"
    }
  ];

  return (
    <div className="floating-container">
      <div className="contact-options">
        {contactLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <img src={link.icon} alt={link.alt} />
            <span>{link.label}</span>
          </a>
        ))}

        {/* Uncomment nếu muốn dùng chat trực tiếp */}
        {/* <div 
          className="contact-item chat-toggle" 
          onClick={() => setShowChat(!showChat)}
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && setShowChat(!showChat)}
        >
          <img src={Chat} alt="Chat" />
          <span>Chat trực tiếp</span>
        </div> */}
      </div>

      {showChat && <ChatBox onClose={() => setShowChat(false)} />}
    </div>
  );
};

export default FloattingContactBt;