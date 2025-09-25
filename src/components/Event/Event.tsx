import React from "react";
import "./Event.css";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Event = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      src: "https://i.ibb.co/mrmyMtyc/anh1.jpg",
      name: "Event1",
    },
    {
      src: "https://i.ibb.co/KjM89qjR/anh2.jpg",
      name: "Event2",
    },
    {
      src: "https://i.ibb.co/4nmTSH2q/anh3.jpg",
      name: "Event3",
    },
    {
      src: "https://i.ibb.co/rCwRNT8/anh4.jpg",
      name: "Event4",
    }, // xóa dấu phẩy thừa
  ];

  const handleGoToEvent = () => {
    const eventName = images[currentIndex].name;
    navigate("/tour");
  };

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <div className="event-title-main">
          <h2>Sự kiện nổi bật</h2>
          <p>Một số sự kiện nổi bật mà bạn có thể tham khảo</p>
        </div>

        <Carousel
          ref={carouselRef}
          slidesToShow={window.innerWidth <= 480 ? 1 : 3} // Show 1 image for max-width 480px
          centerMode={false}
          infinite={true}
          dots={true}
          beforeChange={(from, to) => setCurrentIndex(to)}
        >
          {images.map((item, index) => (
            <div key={index} className="event-slide">
              <img
                src={item.src}
                alt={item.name}
                className="event-image"
                onClick={handleGoToEvent}
              />
            </div>
          ))}
        </Carousel>

        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef.current.prev()}
          className="nav-button nav-button-prev"
        />

        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current.next()}
          className="nav-button nav-button-next"
        />
      </div>
    </div>
  );
};

export default Event;
