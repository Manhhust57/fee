import React, { useEffect, useRef, useState } from 'react';
import "./TopicBlog.css";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    color: string;
    image: string;
    isActive: boolean;
    sortOrder: number;
    createdAt: string;
    updatedAt: string;
    postsCount: number;
}

const TopicBlog: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
      const carouselRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/v1/CategoryBlog')
            .then(res => res.json())
            .then(data => setCategories(data))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;

    

  return (
    <div className="event-wrapper">
      <div className="event-container">
        <div className="event-title-main">
          <h2>Chủ đề blog nổi bật</h2>
          <p>Một số chủ đề blog nổi bật mà bạn có thể tham khảo</p>
        </div>

        <Carousel
          ref={carouselRef}
          slidesToShow={window.innerWidth <= 480 ? 1 : 3} // Show 1 image for max-width 480px
          centerMode={false}
          infinite={true}
          dots={true}
          beforeChange={(from, to) => setCurrentIndex(to)}
        >
          {categories.map(category => (
            
            <div  className="event-slide">
              <img
                      src={category.image}
                      alt={category.name}
                className="event-image"
              />
                <h3 className="topic-title">{category.name}</h3>
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

export default TopicBlog;
