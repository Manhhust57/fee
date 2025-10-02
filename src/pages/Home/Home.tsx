import { useState, useEffect, useRef } from "react";
import { DatePicker, Button, Space, List } from "antd";
import { UserOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;

import "./Home.css";
import Contact from "../../components/Contact/Contact";

import Event from "../../components/Event/Event";
import Review from "../../components/Review/Review";
import Mapcty from "../../components/Mapcty/Mapcty";
import ScrollToTopButton from "../../components/ScrollToTopButton/ScrollToTopButton";
import Should from "../../components/Should/Should";
import Slide from "../../components/Slide/Slide";
import { T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";
import TopicBlog from "../../components/TopicBlog/TopicBlog";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [dates, setDates] = useState([dayjs(), dayjs().add(1, "day")]);
  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [nights, setNights] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateGuests = (type, value) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + value),
    }));
  };

  const handleDateChange = (value) => {
    if (value) {
      setDates([value, value.add(nights, "day")]);
    }
  };

  const handleNightChange = (value) => {
    setNights(value);
    setDates([dates[0], dates[0].add(value, "day")]);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchValue(suggestion.name);
    setShowSuggestions(false);
    // Chuyển hướng đến trang chi tiết
    navigate(`/search/${encodeURIComponent(suggestion.name)}`);
  };

  const suggestions = [
    { name: "Da Nang", country: "Vietnam", key: "2-1" },
    { name: "Da Lat", country: "Lam Dong Province, Vietnam", key: "2-2" },
    {
      name: "Vung Tau City",
      country: "Ba Ria - Vung Tau, Vietnam",
      key: "2-3",
    },
    { name: "Nha Trang", country: "Khanh Hoa, Vietnam", key: "2-4" },
    { name: "Bangkok", country: "Thailand", key: "2-5" },
    { name: "Singapore", country: "", key: "2-6" },
    { name: "Kuala Lumpur", country: "Malaysia", key: "2-7" },
  ];

  // Thêm hàm lọc suggestions
  const filteredSuggestions = suggestions.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.country.toLowerCase().includes(searchValue.toLowerCase())
  );

  const carouselItems = [
    {
      title: "Dominican Republic",
      description:
        "Your family adventure awaits at serene tropical beaches, spas and crystalline pools.",
      tags: ["Spa", "Family Travel", "Beach", "Pool"],
      image: "https://i.ibb.co/JR3qW1Qj/8.jpg",
    },
    {
      title: "Golf Resort",
      description:
        "Experience world-class golf courses surrounded by stunning landscapes.",
      tags: ["Golf", "Luxury", "Resort"],
      image: "https://i.ibb.co/JR3qW1Qj/8.jpg",
    },
    {
      title: "Luxury Poolside",
      description:
        "Relax in a private poolside cabana with first-class amenities.",
      tags: ["Luxury", "Relax", "Resort"],
      image: "https://i.ibb.co/JR3qW1Qj/8.jpg",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []); // This will run once when component mounts

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.scrollTo(0, 0); // Add this line to ensure scroll to top

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const guestMenu = (
    <div
      style={{
        padding: 16,
        width: 250,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        borderRadius: 4,
      }}
    >
      {["adults", "children", "rooms"].map((key, index) => {
        const [isHovered, setIsHovered] = useState(false);
        return (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              padding: "8px",
              transition: "background-color 0.3s",
              cursor: "pointer",
              backgroundColor: isHovered ? "#f5f5f5" : "transparent",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
          <Space>
            <UserOutlined />{" "}
            {key === "adults"
              ? "Người lớn"
              : key === "children"
              ? "Trẻ em"
              : "Phòng"}
          </Space>
          <Space>
            <Button
              icon={<MinusOutlined />}
              onClick={() => updateGuests(key, -1)}
              size="small"
              style={{ backgroundColor: "#f0f0f0" }}
            />
            <span style={{ margin: "0 12px" }}>{guests[key]}</span>
            <Button
              icon={<PlusOutlined />}
              onClick={() => updateGuests(key, 1)}
              size="small"
              style={{ backgroundColor: "#f0f0f0" }}
            />
                      </Space>
          </div>
        );
      })}
    </div>
  );
  const [scrolled, setScrolled] = useState(false);

  return (
    <div className="main-home">
      <Slide />
      {/* <TopicBlog />
      <Should /> */}
      <Event />
      <Review />
      <div style={{ marginTop: '20px' }}></div>
      
      
      <ScrollToTopButton showAt={1000} />
    </div>
  );
};

export default Home;
