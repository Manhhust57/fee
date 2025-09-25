import React from "react";
import "./AboutUs.css";
import { Link } from "react-router-dom";
import { CircleChevronRight } from "lucide-react";

const AboutUs = () => {
  const items = [
    {
      title: "Anstay",
      image: "https://crm.flesta.vn//uploads/about_us/ISN-JUTEC.png",
      link: "/about-us/company",
    },
    {
      title: "Nhóm Công Ty",
      image: "https://crm.flesta.vn//uploads/about_us/Group-Companies.png",
      link: "/about-us/groupcompany",
    },
    {
      title: "Văn Hoá Công Ty",
      image:
        "https://crm.flesta.vn//uploads/about_us/1654495624-629d99883bc28.jpg",
      link: "/about-us/culture",
    },
    {
      title: "Câu chuyện Anstay",
      image: "https://crm.flesta.vn//uploads/about_us/Contact-Us.png",
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
