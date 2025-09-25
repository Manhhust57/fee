import React from "react";

import "./AboutGCP.css";
const AboutGCP = () => {
  const companyInfo = {
    name: "Công ty Anstay VN",
    established: "2016",
    business: "Bất động sản, Tour, Căn hộ",
    headquarters: "Hà Nội",
    offices: "Hà Nội",
    website: "anstay.com.vn",
  };
  return (
    <>
      <div className="aboutgcp">
        <div className="banner">
          <div className="banner-img1">
            <img
              src="https://crm.flesta.vn//uploads/about_us/Group-Companies.png"
              alt=""
            />
            <div className="banner-desg">Nhóm công ty</div>
          </div>
        </div>
        <div className="company-card">
          <div className="header1">
            <h2 className="title">{companyInfo.name}</h2>
          </div>
          <div className="info-grid">
            <div className="label">
              <div>Thành lập :</div>
              <div>{companyInfo.established}</div>
            </div>{" "}
            <div className="label">
              <div>Kinh doanh :</div>
              <div>{companyInfo.business}</div>
            </div>{" "}
            <div className="label">
              <div>Trụ sở chính :</div>
              <div>{companyInfo.headquarters}</div>{" "}
            </div>{" "}
            <div className="label">
              <div>Văn phòng kinh doanh :</div>
              <div className="bold">{companyInfo.offices}</div>
            </div>{" "}
          </div>
        </div>
      </div>
      <div className="company-info">
        {/* Tiêu đề */}
        <h2 className="title">THÔNG TIN CHUNG CỦA ANSTAY VN</h2>

        {/* Nội dung */}
        <p>
          Với gần 10 năm kinh nghiệm, <strong>ANSTAY VN</strong> tự hào là đơn
          vị hàng đầu trong lĩnh vực cung cấp dịch vụ{" "}
          <strong>tour du lịch, căn hộ cho thuê và bất động sản</strong> dành
          cho khách hàng cao cấp, bao gồm cả khách hàng trong nước và du khách
          quốc tế.
        </p>

        <p>Trụ sở chính tại Hà Nội cùng chi nhánh tại Hạ Long.</p>

        <p>
          Đầu tư và phát triển thương hiệu <strong>Bất động sản</strong> và đại
          lý <strong>Du lịch</strong>.
        </p>

        <p>
          Tour du lịch trọn gói dành riêng cho khách hàng trong nước và quốc tế.
        </p>

        <p>
          Hệ thống chăm sóc khách hàng chuyên biệt, đường dây nóng{" "}
          <strong>24/7</strong> đảm bảo sự hài lòng tối đa.
        </p>

        <p>
          Đội ngũ nhân sự chất lượng cao, thành thạo nhiều ngôn ngữ, am hiểu văn
          hóa và thị trường bất động sản Việt Nam.
        </p>

        <p>
          Mô hình quản lý hiện đại, dịch vụ chuyên nghiệp, trang thiết bị cao
          cấp đáp ứng mọi tiêu chuẩn khắt khe của khách hàng.
        </p>

        <p>
          Kinh nghiệm quản lý và môi giới độc quyền tại các dự án cao cấp như{" "}
          <strong>
            Vinhomes Skylake, Vinhomes Dcapitale, The Matrix One,...
          </strong>
          , cùng nhiều căn hộ tại hệ thống <strong>A La Carte (Hạ Long)</strong>
          .
        </p>

        <p>
          Với sứ mệnh mang lại trải nghiệm sống và du lịch hoàn hảo, ANSTAY VN
          không ngừng nâng cao chất lượng dịch vụ, mở rộng mạng lưới và tối ưu
          hóa mọi nhu cầu của khách hàng.
        </p>

        <p>
          Chúng tôi cam kết mang đến sự tin tưởng, chuyên nghiệp và tận tâm
          trong từng dịch vụ.
        </p>
      </div>
    </>
  );
};

export default AboutGCP;
