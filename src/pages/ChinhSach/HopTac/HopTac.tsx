import React from "react";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import "./HopTac.css";

export default function HopTac() {
  return (
    <>
      <Header />
      <div className="partner-container">
        <h1>Chương Trình Hợp Tác</h1>

        <section>
          <h2>1. Trở thành đối tác của Anstay</h2>
          <p>
            Anstay chào đón tất cả cá nhân và tổ chức mong muốn hợp tác cùng
            chúng tôi trong lĩnh vực lưu trú, dịch vụ và du lịch. Dù bạn là chủ
            nhà có phòng trống, đại lý du lịch, hay đơn vị cung ứng dịch vụ dọn
            phòng – chúng tôi đều có mô hình phù hợp.
          </p>
          <p>
            Mục tiêu của Anstay là xây dựng một hệ sinh thái lưu trú chuyên
            nghiệp, thân thiện, và hiệu quả cho cả đối tác lẫn khách hàng.
          </p>
        </section>

        <section>
          <h2>2. Quyền lợi dành cho đối tác</h2>
          <ul>
            <li>Miễn phí đăng ký và đăng phòng lên nền tảng Anstay.</li>
            <li>
              Thiết kế hình ảnh, video quảng bá chuyên nghiệp cho đối tác.
            </li>
            <li>
              Tiếp cận khách hàng từ kênh nội địa (Zalo, Facebook, TikTok) đến
              quốc tế (Airbnb, Booking...).
            </li>
            <li>
              Bảng điều khiển quản lý booking, doanh thu minh bạch theo thời
              gian thực.
            </li>
            <li>Chính sách ưu đãi cho đối tác có hiệu suất cao.</li>
          </ul>
        </section>

        <section>
          <h2>3. Đối tượng hợp tác</h2>
          <ul>
            <li>Chủ căn hộ dịch vụ, villa, homestay muốn cho thuê ngắn hạn.</li>
            <li>Cộng tác viên môi giới bất động sản du lịch.</li>
            <li>Đơn vị dịch vụ: dọn dẹp, lễ tân, bảo trì phòng.</li>
            <li>Doanh nghiệp lữ hành muốn mở rộng mạng lưới phòng lưu trú.</li>
          </ul>
        </section>

        <section>
          <h2>4. Quy trình hợp tác</h2>
          <ol>
            <li>
              Đăng ký thông tin đối tác tại website hoặc liên hệ trực tiếp với
              bộ phận CSHT.
            </li>
            <li>
              Đội ngũ Anstay tư vấn mô hình hợp tác phù hợp với đối tượng và khu
              vực.
            </li>
            <li>Thống nhất chính sách và ký kết thoả thuận điện tử.</li>
            <li>Đưa tài sản lên nền tảng và triển khai truyền thông.</li>
            <li>Theo dõi kết quả qua dashboard quản trị đối tác.</li>
          </ol>
        </section>

        <section>
          <h2>5. Liên hệ hợp tác</h2>
          <ul>
            <li>
              Hotline hợp tác: <strong>(+84) 384945614</strong>
            </li>
            <li>
              Zalo CSHT: <strong>(+84) 384945614</strong>
            </li>
            <li>
              Email: <strong>anstayresidence1@gmail.com</strong>
            </li>
            <li>
              Liên hệ Page chúng tôi:{" "}
              <a
                href="https://www.facebook.com/Anstayalacarte/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong>À La Carte Halong Bay Managed by Anstay </strong>
              </a>
            </li>
          </ul>
        </section>
      </div>
      <Footer />
    </>
  );
}
