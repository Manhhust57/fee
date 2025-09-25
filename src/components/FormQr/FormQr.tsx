import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormQr.css";
import Notification from "../Notification/Notification";

const SHEET_API_URL =
  "https://script.google.com/macros/s/AKfycbzLY4ndgNSjQXwoq7xTdwZCgjHr1J2NSVCATORS8dOXSrnckk48BisZ3eHHxNGvt2hT/exec";

const FormQr = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    apartment: "",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    apartment: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "apartment") {
      const firstChar = value.charAt(0);
      if (value && !/^[A-Za-z]/.test(value)) {
        setErrors((prev) => ({
          ...prev,
          apartment:
            "Căn hộ phải bắt đầu bằng chữ cái / Apartment must start with a letter",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          apartment: "",
        }));
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      fullName: formData.fullName.trim()
        ? ""
        : "Vui lòng nhập họ và tên / Please enter your full name",
      email: !formData.email.trim()
        ? "Vui lòng nhập email / Please enter your email"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Email không hợp lệ / Invalid email format"
        : "",
      phoneNumber: !formData.phoneNumber.trim()
        ? "Vui lòng nhập số điện thoại / Please enter your phone number"
        : "",
      apartment: !formData.apartment.trim()
        ? "Vui lòng nhập số căn hộ / Please enter apartment number"
        : !/^[A-Za-z]/.test(formData.apartment)
        ? "Căn hộ phải bắt đầu bằng chữ cái / Apartment must start with a letter"
        : "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      setNotification({
        show: true,
        message:
          "Vui lòng điền đầy đủ thông tin / Please fill in all required information",
        type: "error",
      });
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      apartment: formData.apartment,
    };

    try {
      sessionStorage.setItem("user_fullName", formData.fullName);
      sessionStorage.setItem("user_email", formData.email);
      sessionStorage.setItem("user_phoneNumber", formData.phoneNumber);
      sessionStorage.setItem("user_apartment", formData.apartment);
      setTimeout(() => {
        navigate(`/hiden-page/${formData.apartment}`);
      }, 100);

      // Send data after navigation starts
      fetch(SHEET_API_URL.trim(), {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch((error) => {
        console.error("Lỗi khi gửi:", error);
      });
    } catch (error) {
      console.error("Lỗi khi gửi:", error);
      setNotification({
        show: true,
        message:
          "Có lỗi xảy ra khi gửi thông tin. Xin vui lòng thử lại sau hoặc liên hệ với chúng tôi qua số điện thoại. / An error occurred. Please try again later or contact us by phone.",
        type: "error",
      });
    }
  };

  return (
    <div className="form-page-background">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type as "success" | "error"}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      )}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-header">
            <h1 className="form-titleqr">Thông tin khách hàng</h1>
            <h3>Customer Information</h3>
            <div className="form-divider" />
            <div className="form-description">
              <p className="light-text">
                Vui lòng điền thông tin để chúng tôi hỗ trợ bạn tour hoặc căn hộ
                nhanh chóng và chính xác.
              </p>
              <p className="light-text">
                Please fill in the information so we can assist you with tours
                or apartments quickly and accurately.
              </p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="fullName">
              Họ và tên / Full Name: <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            {errors.fullName && (
              <span className="error-message">{errors.fullName}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">
              Email / Email Address: <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phoneNumber">
              Số điện thoại / Phone Number/We Chat:
              <span className="required">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <span className="error-message">{errors.phoneNumber}</span>
            )}
          </div>
          <div className="form-field">
            <label htmlFor="apartment">
              Căn hộ đang lưu trú / Apartment currently staying:
              <span className="required">*</span>
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Vui lòng nhập đúng toà A hoặc B (VD B516, B1002...)
              </p>
              <p style={{ fontSize: "10px", fontStyle: "italic" }}>
                Please enter a valid block A or B (e.g., B516, B1002...)
              </p>
            </label>
            <input
              type="text"
              id="apartment"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              required
            />
            {errors.apartment && (
              <span className="error-message">{errors.apartment}</span>
            )}
          </div>

          <button type="submit" className="submit-button">
            Gửi / Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormQr;
