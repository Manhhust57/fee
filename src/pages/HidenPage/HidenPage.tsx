import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./HidenPage.css";
import HidenEn from "../../components/TestPage/English/HidenEn";
import HidenViet from "../../components/TestPage/Vietnam/Hiden";

const HidenPage = () => {
  const location = useLocation();
  const [qrCode, setQrCode] = useState("");
  const apartment = location.state?.apartment || "";
  const [Clicked, setClicked] = useState(true);
  const [language, setLanguage] = useState<"vi" | "en">("vi");

  useEffect(() => {
    if (apartment) {
      const qrData = `${apartment}`;
      setQrCode(qrData);
    }
  }, [apartment]);

  useEffect(() => {
    return () => {
      setQrCode("");
    };
  }, []);

  const handleClick = () => {
    setClicked(!Clicked);
  };

  return (
    <div className="tab-hiden">
      <div className="tab-hiden__language">
        <button
          onClick={() => {
            setLanguage("vi");
            handleClick();
          }}
          className={Clicked ? "active1" : ""}
        >
          <img
            src="https://hatscripts.github.io/circle-flags/flags/vn.svg"
            width="24"
          />
          <span>Tiếng Việt</span>
        </button>
        <button
          onClick={() => {
            setLanguage("en");
            handleClick();
          }}
          className={!Clicked ? "active1" : ""}
        >
          <img
            src="https://hatscripts.github.io/circle-flags/flags/gb.svg"
            width="24"
          />
          <span>English</span>
        </button>
      </div>
      {language === "vi" ? <HidenViet /> : <HidenEn />}
    </div>
  );
};

export default HidenPage;
