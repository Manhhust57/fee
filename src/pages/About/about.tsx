// About.tsx - Trang giới thiệu
import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

interface AboutProps {
    className?: string;
}

const About: React.FC<AboutProps> = ({ className }) => {
    const amenities = [
        { icon: 'bi-wifi', name: 'Internet tốc độ cao' },
        { icon: 'bi-headset', name: 'Lễ tân 24/7' },
        { icon: 'bi-slash-circle', name: 'Phòng không hút thuốc' },
        { icon: 'bi-bell', name: 'Dịch vụ hỗ trợ khách' },
        { icon: 'bi-building', name: 'Thang máy' },
        { icon: 'bi-snow3', name: 'Điều hòa không khí' },
        { icon: 'bi-car-front', name: 'Đỗ xe ngoài trời miễn phí' },
        { icon: 'bi-shield-lock', name: 'An ninh 24/7' },
        { icon: 'bi-translate', name: 'Nhân viên song ngữ, đa ngôn ngữ' },
        { icon: 'bi-alarm', name: 'Dịch vụ báo thức' },
        { icon: 'bi-lightning-charge', name: 'Điện 220V' },
        { icon: 'bi-thermometer-half', name: 'Khu vực công cộng có điều hòa' },
        { icon: 'bi-geo-alt', name: 'Vị trí sát biển' },
        { icon: 'bi-wind', name: 'Máy sấy tóc' },
        { icon: 'bi-badge-wc', name: 'Nhà vệ sinh riêng' },
        { icon: 'bi-slash-circle', name: 'Khu vực công cộng đều không hút thuốc' }
    ];

    return (
        <div className={`about-container ${className || ''}`}>
            <div className="about-content">
                {/* Header */}
                <header className="about-header">
                    <h1>À La Carte Ha Long Bay</h1>
                    <div className="header-badges">
                        <div className="brand-badge">
                            <i className="bi bi-shield-check"></i>
                            <span>By managed Anstay</span>
                        </div>
                        <div className="location-badge">
                            <i className="bi bi-geo-alt"></i>
                            <span>Vịnh Hạ Long, Quảng Ninh</span>
                        </div>
                    </div>
                </header>

                {/* Hero Image
                <div className="hero-section">
                    <div className="hero-image">
                        <img src="https://cdn.tripspoint.com/uploads/photos/426/halong-bay-tour_mpTU2.jpeg" alt="À La Carte Ha Long Bay"  />
                        <div className="hero-overlay">
                            <div className="hero-content">
                                <h2>Trải nghiệm tuyệt vời tại Vịnh Hạ Long</h2>
                                <p>Chỉ cách bãi biển vài bước chân</p>
                            </div>
                        </div>
                    </div>
                </div> */}

                {/* Introduction Section */}
                <section className="intro-section">
                    <div className="section-header">
                        <h2>
                            <i className="bi bi-info-circle section-icon" />
                            Giới thiệu
                        </h2>
                    </div>

                    <div className="intro-content">
                        <p className="intro-text">
                            Nằm bên bờ <strong>Vịnh Hạ Long xinh đẹp</strong>, À La Carte Ha Long Bay By managed Anstay
                            là lựa chọn tiết kiệm dành cho du khách có nhiều lịch trình và mong muốn cá nhân hóa trải nghiệm tại Hạ Long.
                        </p>

                        {/* highlight removed per request */}
                    </div>
                </section>

                {/* Amenities Section */}
                <section className="amenities-section">
                    <div className="section-header">
                        <h2>
                            <i className="bi bi-stars section-icon" />
                            Tiện ích
                        </h2>
                        <p className="section-subtitle">Đầy đủ tiện nghi cho kỳ nghỉ hoàn hảo</p>
                    </div>

                    <div className="amenities-grid">
                        {amenities.map((amenity, index) => (
                            <div key={index} className="amenity-card">
                                <div className="amenity-icon"><i className={`bi ${amenity.icon}`} /></div>
                                <div className="amenity-name">{amenity.name}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon"><i className="bi bi-water" /></div>
                            <h3>Vị trí tuyệt vời</h3>
                            <p>Sát bờ Vịnh Hạ Long, dễ dàng khám phá các điểm du lịch nổi tiếng</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><i className="bi bi-cash-coin" /></div>
                            <h3>Giá cả hợp lý</h3>
                            <p>Lựa chọn tiết kiệm cho du khách có ngân sách hạn chế</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><i className="bi bi-house-door" /></div>
                            <h3>Căn hộ dịch vụ</h3>
                            <p>Không gian riêng tư như ở nhà với đầy đủ tiện nghi cần thiết</p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon"><i className="bi bi-person-check" /></div>
                            <h3>Trải nghiệm cá nhân hóa</h3>
                            <p>Linh hoạt theo lịch trình và sở thích cá nhân của từng khách hàng</p>
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                {/* <section className="contact-info-section">
                    <div className="contact-card">
                        <h3>
                            <span className="contact-icon">📍</span>
                            Thông tin liên hệ
                        </h3>
                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-label">Địa chỉ:</span>
                                <span>Lô đất H30–H33, Bán đảo số 2, Khu đô thị dịch vụ Hùng Thắng, P. Hùng Thắng, Hạ Long, Quảng Ninh</span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Điện thoại:</span>
                                <span>
                                    <a href="tel:+842033559555">+84 20 3355 9555</a> |
                                    <a href="tel:+84835643388">+84 835 643 388</a>
                                </span>
                            </div>
                            <div className="contact-item">
                                <span className="contact-label">Email:</span>
                                <span>
                                    <a href="mailto:info@alacartehalongbay.com">info@alacartehalongbay.com</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </section> */}

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="cta-content">
                        <h2>Sẵn sàng trải nghiệm Hạ Long?</h2>
                        <p>Đặt phòng ngay hôm nay để có giá tốt nhất</p>
                        <div className="cta-buttons">
                            <Link to="/booking" className="cta-button primary">
                                <i className="bi bi-building-check" />
                                Đặt phòng ngay
                            </Link>
                            <Link to="/contact" className="cta-button secondary">
                                <i className="bi bi-telephone-outbound" />
                                Liên hệ tư vấn
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;