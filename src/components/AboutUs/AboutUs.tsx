import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { CircleChevronRight } from "lucide-react";

const AboutUs = () => {
  const items = [
    {
      title: "Anstay",
      image: "/pictures/aboutUs1.png",
      link: "/about-us/company",
    },
    {
      title: "Nhóm Công Ty",
      image: "/pictures/aboutUs2.png",
      link: "/about-us/groupcompany",
    },
    {
      title: "Văn Hoá Công Ty",
      image:
        "/pictures/aboutUs3.png",
      link: "/about-us/culture",
    },
    {
      title: "Câu chuyện Anstay",
      image: "/pictures/aboutUs4.png",
      link: "/about-us/our-story",
    },
  ];

  return (
    <div className="container-about-us">
      {items.map((item, index) => (
        <Link to={item.link} className="item">
          <img src={item.image} alt="" />
          <div className="description">
            <div className="des-title">{item.title}</div>
            <div className="des-icon">
              <CircleChevronRight size={30} color="white" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};
export default AboutUs;
