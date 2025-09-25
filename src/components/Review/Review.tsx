import { useRef, useState, useEffect } from "react";
import "./Review.css";
import { Carousel, Button, Rate } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    {
      src: "https://i.ibb.co/7drwxYbK/35250.jpg",
      name: "Căn hộ 1",
      description: "Căn hộ sạch sẽ, tiện nghi",
      rating: 4.5,
      reviewer: "Nguyễn Văn An",
    },
    {
      src: "https://i.ibb.co/Lz1xDYbJ/dich-vu-skylake9.jpg",
      name: "Căn hộ 2",
      description: "Không gian thoáng mát, phù hợp gia đình",
      rating: 4.5,
      reviewer: "Trần Thị Bích",
    },
    {
      src: "https://i.ibb.co/bMq309YJ/z3726691497870-9b7733f818db1076cd9e16e45f434848.jpg",
      name: "Căn hộ 3",
      description: "Nội thất đẹp, vị trí thuận tiện",
      rating: 5.0,
      reviewer: "Lê Hoàng Minh",
    },
    {
      src: "https://i.ibb.co/DH128B0T/dich-vu-skylake5.jpg",
      name: "Căn hộ 4",
      description: "Giá cả hợp lý, phục vụ tận tình",
      rating: 4.5,
      reviewer: "Phạm Hồng Nhung",
    },
    {
      src: "https://i.ibb.co/sJyDQFGC/dich-vu-skylake6.webp",
      name: "Căn hộ 5",
      description: "An ninh tốt, gần trung tâm",
      rating: 5.0,
      reviewer: "Đỗ Thanh Tú",
    },
  ];
  const handleGoToEvent = () => {
    const eventName = images[currentIndex].name;
    navigate(`/event?name=${eventName}`);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current.next();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="event-wrapper1">
      <div className="event-container1">
        <div className="review-title">
          <h2>Đánh giá của khách hàng</h2>
          <p>Nhận xét của bạn sẽ giúp chúng tôi cải thiện tốt hơn</p>
        </div>

        <Carousel
          ref={carouselRef}
          slidesToShow={window.innerWidth <= 480 ? 1 : 2}
          centerMode={false}
          infinite={true}
          dots={true}
          beforeChange={(from, to) => setCurrentIndex(to)}
        >
          {images.map((item, index) => (
            <div key={index} className="event-slide1">
              <div className="event-image-wrapper1">
                <img
                  src={item.src}
                  alt={item.name}
                  className="event-image1"
                  onClick={handleGoToEvent}
                />
                <div className="event-description1">{item.description}</div>
                <div className="event-reviewer1">{item.reviewer}</div>
                <Rate
                  className="event-rating1"
                  allowHalf
                  disabled
                  defaultValue={item.rating}
                />
              </div>
            </div>
          ))}
        </Carousel>

        <Button
          type="primary"
          shape="circle"
          icon={<LeftOutlined />}
          onClick={() => carouselRef.current.prev()}
          className="nav-button1 nav-button-prev1"
        />

        <Button
          type="primary"
          shape="circle"
          icon={<RightOutlined />}
          onClick={() => carouselRef.current.next()}
          className="nav-button1 nav-button-next1"
        />
      </div>
    </div>
  );
};

export default Review;
