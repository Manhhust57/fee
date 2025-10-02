import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-main">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <img 
                src="https://i.ibb.co/35SyTcnX/Anstay.png" 
                alt="ANSTAY Logo" 
                className="logo-image"
              />
            </div>
          </div>

          {/* All Content Below Logo */}
          <div className="footer-content-below">
            {/* Left Side - 3 Columns */}
            <div className="footer-left-columns">
              {/* First Column */}
              <div className="footer-column">
                <h3>THÔNG TIN LIÊN HỆ</h3>
                <ul>
                  <li className="address-item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>Địa chỉ: Khu đô thị dịch vụ Hùng Thắng, P. Hùng Thắng, Hạ Long, Quảng Ninh, Việt Nam</span>
                  </li>
                  <li>
                    <i className="bi bi-telephone-fill"></i>
                    <span>Điện thoại: 0384945614</span>
                  </li>
                  <li>
                    <i className="bi bi-envelope-fill"></i>
                    <span>Email: anstayresidence@gmail.com</span>
                  </li>
                </ul>
              </div>

              {/* Second Column */}
              <div className="footer-column">
                <h3>LIÊN HỆ</h3>
                <ul>
                  <li><Link to="/about-us">Về Chúng Tôi</Link></li>
                  <li><Link to="#">Sách Hướng Dẫn</Link></li>
                </ul>
                
                <h3>CHÍNH SÁCH</h3>
                <ul>
                  <li><Link to="/chinh-sach-bao-mat">Chính Sách Bảo Mật</Link></li>
                  <li><Link to="/chuong-trinh-hop-tac">Chương Trình Hợp Tác</Link></li>
                  <li><Link to="/cham-soc-khach-hang">Chăm Sóc Khách Hàng</Link></li>
                </ul>
              </div>

              {/* Third Column - Social Media */}
              <div className="footer-column">
                <h3>THEO DÕI CHÚNG TÔI</h3>
                <div className="social-icons">
                  <a href="https://www.facebook.com/AnstayVN" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://i.ibb.co/dst8XydC/Facebook-Logo-2019.png"
                      alt="facebook"
                      className="icon-fl"
                    />
                    Facebook
                  </a>
                  <a href="https://zalo.me/0916612772" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/2048px-Icon_of_Zalo.svg.png"
                      alt="zalo"
                      className="icon-fl"
                    />
                    Zalo
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <img
                      src="https://i.ibb.co/zhkk3H5Y/1.jpg"
                      alt="telegram"
                      className="icon-fl"
                    />
                    Telegram
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side - Map */}
            <div className="footer-right-section">
              <div className="footer-column">
                <h3>VỊ TRÍ KHÁCH SẠN</h3>
                <div className="footer-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1682.0659207198582!2d107.00167477091655!3d20.953556018500294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314a5fbce3525b65%3A0xeb9eed19f0f52778!2sAnstay%20Residence%20by%20A%20La%20Carte%20H%E1%BA%A1%20Long!5e0!3m2!1svi!2s!4v1759199492442!5m2!1svi!2s"
                    width="300"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hotel Location Map"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <div className="copyright">
            CÔNG TY CỔ PHẦN ANSTAY VIỆT NAM
          </div>
          <div className="footer-links">
            Copyright 2025 © <span style={{ fontWeight: 600 }}>Anstay VN</span> All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
