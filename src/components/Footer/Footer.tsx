import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import "./Footer.css";
import LoginPopup from "../Login/LoginPopup";

const Footer: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="footer-wrapper">
      <div className="footer-main">
        <div className="footer-left">
          {/* Thêm phần THÔNG TIN LIÊN HỆ */}
          <div className="row">
            <div className="row-title">
              <h3>THÔNG TIN LIÊN HỆ</h3>
            </div>
            <div className="row-link">
              <div className="list-item contact-info">
                <div className="contact-item-with-icon">
                  <MapPin size={16} className="contact-icon" />
                  <span className="contact-label">Địa chỉ:</span>
                  <span className="contact-content">
                    Khu đô thị dịch vụ Hùng Thắng,
                    P. Hùng Thắng, Hạ Long,
                    Quảng Ninh,Việt Nam
                  </span>
                </div>
              </div>
              <div className="list-item contact-info">
                <div className="contact-item-with-icon">
                  <Phone size={16} className="contact-icon" />
                  <span className="contact-label">Điện thoại:</span>
                  <span className="contact-content">0384945614</span>
                </div>
              </div>
              <div className="list-item contact-info">
                <div className="contact-item-with-icon">
                  <Mail size={16} className="contact-icon" />
                  <span className="contact-label">Email:</span>
                  <span className="contact-content">
                    anstayresidence@gmail.com
                  </span>
                </div>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="row-title">
              <h3>LIÊN HỆ</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <Link to="/about-us">Về Chúng Tôi</Link>
              </div>
              <div className="list-item">
                <Link to="#">Sách Hướng Dẫn</Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="row-title">
              <h3>CHÍNH SÁCH</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <Link to="/chinh-sach-bao-mat">Chính Sách Bảo Mật</Link>
              </div>
              <div className="list-item">
                <Link to="/chuong-trinh-hop-tac">Chương Trình Hợp Tác</Link>
              </div>
              <div className="list-item">
                <Link to="/cham-soc-khach-hang">Chăm Sóc Khách Hàng</Link>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="row-title">
              <h3>THEO DÕI CHÚNG TÔI</h3>
            </div>
            <div className="row-link">
              <div className="list-item">
                <a href="https://www.facebook.com/Anstayalacarte">
                  <img
                    src="https://i.ibb.co/dst8XydC/Facebook-Logo-2019.png"
                    alt="facebook"
                    className="icon-fl"
                  />
                  Facebook
                </a>
              </div>
              <div className="list-item">
                <a
                  href="https://zalo.me/0384945614"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                    alt="zalo"
                    className="icon-fl"
                  />
                  Zalo
                </a>
              </div>
              
              <div className="list-item">
                <a href="https://www.youtube.com/@AnstayResidencebyALaCarte">
                  <img
                    src="pictures/youtube.png"
                    alt="Youtube"
                    className="icon-fl"
                  />
                  Youtube
                </a>
              </div>
              <div className="list-item">
                <a href="https://www.tiktok.com/@alacarte_by_anstay?is_from_webapp=1&sender_device=pc">
                  <img
                    src="pictures/tiktok.png"
                    alt="telegram"
                    className="icon-fl"
                  />
                  Tiktok
                </a>
              </div>
              <div className="list-item">
                <a href="https://www.instagram.com/alacarte_by_anstay/">
                  <img
                    src="pictures/instagram.png"
                    alt="telegram"
                    className="icon-fl"
                  />
                  Instagram
                </a>
              </div>
              <div className="list-item">
                <a href="https://www.threads.com/@alacarte_by_anstay?xmt=AQF0HBzzNiPUzwbVRTrHtNKV9ZcFakZI9z8EGQY7UVb6wTQ">
                  <img
                    src="pictures/threads.png"
                    alt="telegram"
                    className="icon-fl"
                  />
                  Threads
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.9798910304207!2d107.00014641103532!3d20.953322680596486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5fbce3525b65%3A0xeb9eed19f0f52778!2sAnstay%20Residence%20by%20A%20La%20Carte%20H%E1%BA%A1%20Long!5e0!3m2!1svi!2s!4v1758160741455!5m2!1svi!2s"
            width="700px"
            height="300px"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Cinema Location Map"
          ></iframe>
        </div>
      </div>

      <div className="footer-bottom">
        <div>CÔNG TY CỔ PHẦN ANSTAY VIỆT NAM</div>
        <div>
          Copyright 2025 © <span style={{ fontWeight: 600 }}>Anstay VN</span>{" "}
          All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
