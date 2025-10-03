import React from "react";
import "./Event.css";
import { Carousel, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// const Event = () => {
//   const carouselRef = useRef(null);
//   const navigate = useNavigate();
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const images = [
//     {
//       src: "https://i.ibb.co/mrmyMtyc/anh1.jpg",
//       name: "Event1",
//     },
//     {
//       src: "https://i.ibb.co/KjM89qjR/anh2.jpg",
//       name: "Event2",
//     },
//     {
//       src: "https://i.ibb.co/4nmTSH2q/anh3.jpg",
//       name: "Event3",
//     },
//     {
//       src: "https://i.ibb.co/rCwRNT8/anh4.jpg",
//       name: "Event4",
//     }, // xóa dấu phẩy thừa
//   ];

//   const handleGoToEvent = () => {
//     const eventName = images[currentIndex].name;
//     navigate("/tour");
//   };

//   return (
//     <div className="event-wrapper">
//       <div className="event-container">
//         <div className="event-title-main">
//           <h2>Sự kiện nổi bật</h2>
//           <p>Một số sự kiện nổi bật mà bạn có thể tham khảo</p>
//         </div>

//         <Carousel
//           ref={carouselRef}
//           slidesToShow={window.innerWidth <= 480 ? 1 : 3} // Show 1 image for max-width 480px
//           centerMode={false}
//           infinite={true}
//           dots={true}
//           autoplay={true} 
//           autoplaySpeed={2000}
//           beforeChange={(from, to) => setCurrentIndex(to)}
//         >
//           {images.map((item, index) => (
//             <div key={index} className="event-slide">
//               <img
//                 src={item.src}
//                 alt={item.name}
//                 className="event-image"
//                 onClick={handleGoToEvent}
//               />
//             </div>
//           ))}
//         </Carousel>

//         <Button
//           type="primary"
//           shape="circle"
//           icon={<LeftOutlined />}
//           onClick={() => carouselRef.current.prev()}
//           className="nav-button nav-button-prev"
//         />

//         <Button
//           type="primary"
//           shape="circle"
//           icon={<RightOutlined />}
//           onClick={() => carouselRef.current.next()}
//           className="nav-button nav-button-next"
//         />
//       </div>
//     </div>
//   );
// };
const Event = () => {
  const destinations = [
    {
      id: 1,
      city: "Quầy Bar",
      image: "pictures/anh2.jpg",
      alt: "Chỗ ở sang trọng ở London với nội thất hiện đại"
    },
    {
      id: 2,
      city: "Dù lượn",
      image: "pictures/anh5.png",
      alt: "Hồ bơi trên sân thượng Los Angeles với tầm nhìn thành phố"
    },
    {
      id: 3,
      city: "Pháo Hoa ",
      image: "pictures/anh8.jpg",
      alt: "Khu vực hồ bơi khách sạn sang trọng Dubai"
    },
    {
      id: 4,
      city: "Nhạc Nước",
      image: "pictures/anh6.jpg",
      alt: "Nhac nước với tầm nhìn đường chân trời"
    },
    {
      id: 5,
      city: "Hang động",
      image: "pictures/anh3.jpg",
      alt: "Mặt tiền khách sạn boutique Montreal"
    }
  ];

  return (
    <div className="luxury-accommodations">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="main-title">
          Sự kiện nổi bật
        </h1>
        
      </div>

      {/* Grid Layout */}
      <div className="destinations-grid">
        {/* London - Top Left */}
        <div className="destination-card">
          <div className="image-container">
            <img
              src={destinations[0].image}
              alt={destinations[0].alt}
              className="destination-image"
            />
          </div>
          <h3 className="city-name">
            {destinations[0].city}
          </h3>
        </div>

        {/* New York City - Center Large */}
        <div className="destination-card large-card">
          <div className="image-container large-image">
            <img
              src={destinations[3].image}
              alt={destinations[3].alt}
              className="destination-image"
            />
            <div className="image-overlay"></div>
          </div>
          <h3 className="city-name">
            {destinations[3].city}
          </h3>
        </div>

        {/* Los Angeles - Top Right */}
        <div className="destination-card">
          <div className="image-container">
            <img
              src={destinations[1].image}
              alt={destinations[1].alt}
              className="destination-image"
            />
            <div className="image-overlay"></div>
          </div>
          <h3 className="city-name">
            {destinations[1].city}
          </h3>
        </div>

        {/* Dubai - Bottom Left */}
        <div className="destination-card">
          <div className="image-container">
            <img
              src={destinations[2].image}
              alt={destinations[2].alt}
              className="destination-image"
            />
            <div className="image-overlay"></div>
          </div>
          <h3 className="city-name">
            {destinations[2].city}
          </h3>
        </div>

        {/* Montreal - Bottom Right */}
        <div className="destination-card">
          <div className="image-container">
            <img
              src={destinations[4].image}
              alt={destinations[4].alt}
              className="destination-image"
            />
            <div className="image-overlay"></div>
          </div>
          <h3 className="city-name">
            {destinations[4].city}
          </h3>
        </div>
      </div>

      {/* View All Button */}
      
    </div>
  );
};


export default Event;
