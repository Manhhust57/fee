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
                <a href="#">
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
        </div>

        <div className="footer-right">
          <div className="footer-right-title">
            <h3>HÌNH THỨC THANH TOÁN</h3>
          </div>
          <div className="footer-right-img ftr-2">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Logo_TPBank.svg/2560px-Logo_TPBank.svg.png"
              alt="tpbank"
              className="footer-right-img1"
            />
            <img
              src="https://i.ibb.co/8nrFMDmd/huong-dan-dang-ky-tai-khoan-paypal-1024x512-removebg-preview.png"
              alt="paypal"
              className="footer-right-img2"
            />
            <img
              src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png"
              alt="momo"
              className="footer-right-img3"
            />
            <img
              src="https://i.ibb.co/xqwC41Nm/tether-usdt-logo-png-seeklogo-323175-removebg-preview.png"
              alt="usdt"
              className="footer-right-img4"
            />
          </div>

          <p
            className="payment-note"
            style={{
              fontWeight: "bold",
              fontSize: "20px",
              color: "#1f2937",
              textAlign: "center",
              marginTop: "0px",
              marginBottom: "0px",
            }}
          >
            Đang chờ xác nhận từ Bộ Công Thương
          </p>
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
