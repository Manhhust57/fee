import React from "react";
import "./Slide.css";
import img1 from "../../assets/Images/N009584.jpg";
import BoxSearch from "../BoxSearch/BoxSearch";

const Slide = () => {
  return (
    <div className="slider-container">
      <div className="slider-image">
        <video
          src="/videos/anstay.mp4"  // Không cần 'public/'
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="slider-video"
          
        />
      </div>
      
      <div className="slider-dark-overlay">
        <div className="slider-overlay">
          <p className="slider-subtitle">Chào Mừng Bạn Đến Với ANSTAY</p>
          <h1 className="slider-title">Dù hành trình ở đâu, tinh tế và giá trị xứng đáng vẫn theo chân bạn.</h1>
          {/* <div className="slider-buttons">
            <button className="btn primary">Xem Căn Hộ →</button>
          </div> */}
        </div>

        {/* Thanh tìm kiếm được đặt ở giữa */}
        <div className="slider-search-container">
          <div className="search-title">
            <a href="/booking" className="btn-booking">
               Đặt phòng Tại đây
            </a>
          </div>
          {/* <BoxSearch /> */}
        </div>



      </div>
    </div>
  );
};

export default Slide;
