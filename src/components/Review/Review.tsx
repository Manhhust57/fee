import { useRef, useState, useEffect } from "react";
import { Carousel, Rate } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Review.css";

interface ReviewItem {
  src: string;
  name: string;
  description: string;
  rating: number;
  reviewer: string;
  location: string;
}

const Review: React.FC = () => {
  const carouselRef = useRef<any>(null);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // 3 màu xanh lặp lại
  const bgColors = ["#68b5cfff", "#036b90ff", "#0736aeff"];

  const getBgColor = (index: number): string => {
    return bgColors[index % bgColors.length];
  };

  const reviews: ReviewItem[] = [
    {
      src: "https://i.ibb.co/7drwxYbK/35250.jpg",
      name: "Căn hộ 1",
      description:
        "Phòng siêu rộng, sạch sẽ, thiết bị tiêu chuẩn cao. Chăn nệm ấm êm sạch sẽ. View đẹp, wifi mạnh. Vị trí ổn ở khu Hùng Thắng.",
      rating: 4.5,
      reviewer: "Lim A",
      location: "Hạ Long"
    },
    {
      src: "https://i.ibb.co/Lz1xDYbJ/dich-vu-skylake9.jpg",
      name: "Căn hộ 2",
      description:
        "Trải nghiệm rất vui và thú vị. Phòng đẹp, đầy đủ tiện nghi như bếp, máy giặt sấy. View city khá xinh, ban công rộng, thoải mái.",
      rating: 4.5,
      reviewer: "Huyền Ngô",
      location: "Hải Phòng"
    },
    {
      src: "https://i.ibb.co/bMq309YJ/z3726691497870-9b7733f818db1076cd9e16e45f434848.jpg",
      name: "Căn hộ 3",
      description:
        "Đặt phòng nhanh gọn nhẹ. Chỗ ở tiện nghi, thoải mái. Mình đặt lại 3 lần rồi, rất hài lòng với dịch vụ.",
      rating: 5.0,
      reviewer: "Hạnh Chi",
      location: "Bắc Ninh"
    },
    {
      src: "https://i.ibb.co/DH128B0T/dich-vu-skylake5.jpg",
      name: "Căn hộ 4",
      description:
        "Giá cả hợp lý, phục vụ tận tình. Căn hộ sạch sẽ, view đẹp. Nhân viên nhiệt tình và chu đáo.",
      rating: 4.5,
      reviewer: "Phạm Hồng Nhung",
      location: "Hạ Long"
    },
    {
      src: "https://i.ibb.co/sJyDQFGC/dich-vu-skylake6.webp",
      name: "Căn hộ 5",
      description:
        "Nội thất bài trí đẹp, view biển tuyệt. Giường êm, phòng tắm rộng rãi, tiện nghi, thang máy riêng tư, bàn ghế rượu vang các thứ đều có, máy giặt, sấy,…",
      rating: 5.0,
      reviewer: "Đỗ Thanh Tú",
      location: "Hà Nội"
    },
    {
      src: "https://i.ibb.co/sJyDQFGC/dich-vu-skylake6.webp",
      name: "Căn hộ 6",
      description:
        "An ninh tốt, gần trung tâm. Vị trí thuận tiện đi lại. Căn hộ có đầy đủ tiện nghi cần thiết.",
      rating: 5.0,
      reviewer: "Đỗ Thanh Tú",
      location: "Hồ Chí Minh"
    },
  ];

  const handleGoToEvent = (index: number): void => {
    const eventName = reviews[index].name;
    navigate(`/event?name=${encodeURIComponent(eventName)}`);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      carouselRef.current?.next();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="review-section">
      <div className="review-container">

        <div className="review-header">
          <h2>Đánh giá của khách hàng</h2>
          <p>Nhưng đừng chỉ tin vào lời chúng tôi - hãy xem những gì khách hàng của chúng tôi nói.</p>
        </div>

        <div className="review-carousel-wrapper">
          <Carousel
            ref={carouselRef}
            slidesToShow={window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 2 : 3}
            centerMode={false}
            infinite={true}
            dots={true}
            autoplay={false}
            beforeChange={(from: number, to: number) => setCurrentIndex(to)}
          >
            {reviews.map((item, index) => (
              <div key={index} className="review-item">
                <div
                  className="review-quote-card"
                  style={{ backgroundColor: getBgColor(index) }}
                >
                  <div className="quote-content">
                    <p className="quote-text">"{item.description}"</p>

                    <div className="quote-footer">
                      <Rate
                        disabled
                        allowHalf
                        value={item.rating}
                        className="quote-rating"
                      />
                      <div className="quote-author">
                        <span className="author-name">{item.reviewer}</span>
                        <span className="author-location">{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>

          <button
            className="carousel-nav carousel-nav-prev"
            onClick={() => carouselRef.current?.prev()}
            aria-label="Previous"
          >
            <LeftOutlined />
          </button>

          <button
            className="carousel-nav carousel-nav-next"
            onClick={() => carouselRef.current?.next()}
            aria-label="Next"
          >
            <RightOutlined />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Review;