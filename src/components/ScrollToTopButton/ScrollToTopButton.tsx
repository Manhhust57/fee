import { useEffect, useState } from "react";
import "./ScrollToTopButton.css";
import { UpOutlined } from "@ant-design/icons";

const ScrollToTopButton = ({ showAt = 500 }) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > showAt);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAt]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`scroll-to-top ${showScroll ? "visible" : "hidden"}`}
      onClick={handleScrollToTop}
    >
      <UpOutlined className="scroll-icon" />
    </div>
  );
};

export default ScrollToTopButton;
