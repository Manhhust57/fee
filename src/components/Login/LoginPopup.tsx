import { useState, useContext } from "react";
import "./LoginPopup.css"; // Import file CSS
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoginPopupProps {
  onClose: () => void;
  onLoginSuccess: (fullname: string) => void;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  phone?: string;
  password?: string;
  avatar?: string | null;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  verified?: boolean;
}

console.log("✅ ENV:", import.meta.env.VITE_API_URL);

const API_URL = import.meta.env.VITE_API_URL ;
const LoginPopup: React.FC<LoginPopupProps> = ({ onClose, onLoginSuccess }) => {
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const auth = useContext(AuthContext);

  // const handleSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.get("https://anstay.com.vn/api/users");
  //     const users: User[] = response.data;
     
  //     const user = users.find(
  //       (u) => u.email === email && u.password === password
  //     );

  //     if (user && user.role === "USER") {
  //       const userData = {
  //         id: user.id,
  //         fullName: user.fullName,
  //         email: user.email,
  //         role: user.role,
  //       };

  //       if (auth) {
  //         auth.login(userData);
  //         onLoginSuccess(userData.fullName);
  //         // Dispatch custom event
  //         window.dispatchEvent(new Event("userLogin"));
  //         toast.success("🎉 Đăng nhập thành công!", {
  //           position: "top-right",
  //           autoClose: 3000,
  //         });
  //         setTimeout(() => onClose(), 1000);
  //       }
  //     } else {
  //       toast.error("❌ Sai email hoặc mật khẩu hoặc không có quyền truy cập!");
  //     }
  //   } catch (error) {
  //     toast.error("❌ Có lỗi xảy ra khi đăng nhập!");
  //     console.error(error);
  //   }
  // };
  const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });

    const { success, data } = response.data;

    if (success && data) {
      const userData: User = {
        id: data.id,
        fullName: data.name,
        email: data.email,
        role: data.role || "USER", // nếu BE chưa trả role thì FE gán mặc định
      };

      auth?.login(userData);

      toast.success("🎉 Đăng nhập thành công!");
      setTimeout(() => onClose(), 1000);
    } else {
      toast.error("❌ Sai email hoặc mật khẩu!");
    }
  } catch (error) {
    toast.error("❌ Có lỗi xảy ra khi đăng nhập!");
    console.error(error);
  }
  };
  // const handleRegisterSubmit = async (event: React.FormEvent) => {
  //   event.preventDefault();

  //   if (registerData.password !== registerData.confirmPassword) {
  //     toast.error("❌ Mật khẩu xác nhận không khớp!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   try {
  //     // Check for existing users
  //     const existingUsers = await axios.get("https://anstay.com.vn/api/users");
  //     const users: User[] = existingUsers.data;

  //     const existingEmail = users.find(
  //       (user) => user.email === registerData.email
  //     );
  //     const existingPhone = users.find(
  //       (user) => user.phone === registerData.phone
  //     );

  //     if (existingEmail && existingPhone) {
  //       toast.error("❌ Email và số điện thoại đã được sử dụng!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //       return;
  //     }

  //     if (existingEmail) {
  //       toast.error("❌ Email đã được sử dụng!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //       return;
  //     }

  //     if (existingPhone) {
  //       toast.error("❌ Số điện thoại đã được sử dụng!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //       return;
  //     }

  //     // If no duplicates, proceed with registration
  //     const response = await axios.post(
  //       "https://anstay.com.vn/api/users/create",
  //       {
  //         fullName: registerData.fullName,
  //         email: registerData.email,
  //         phone: registerData.phone,
  //         password: registerData.password,
  //       }
  //     );

  //     if (response.status === 200 || response.status === 201) {
  //       toast.success("🎉 Đăng ký thành công!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //       });
  //       setShowRegister(false);
  //     }
  //   } catch (error) {
  //     toast.error("❌ Có lỗi xảy ra khi đăng ký!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     console.error(error);
  //   }
  // };
const handleRegisterSubmit = async (event: React.FormEvent) => {
  event.preventDefault();

  if (registerData.password !== registerData.confirmPassword) {
    toast.error("❌ Mật khẩu xác nhận không khớp!", {
      position: "top-right",
      autoClose: 3000,
    });
    return;
  }

  try {
    const response = await axios.post(
      `${API_URL}/auth/register`,
      {
        name: registerData.fullName,
        email: registerData.email,
        phoneNumber: registerData.phone,
        password: registerData.password,
      }
    );

    if (response.status === 200 || response.status === 201) {
      toast.success("🎉 Đăng ký thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowRegister(false);
    }
  } catch (error: any) {
    if (error.response?.status === 409) {
      toast.error("❌ Email hoặc số điện thoại đã tồn tại!", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.error("❌ Có lỗi xảy ra khi đăng ký!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
    console.error(error);
  }
};
  const handleForgotPasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Yêu cầu đặt lại mật khẩu đã được gửi!"); // Xử lý quên mật khẩu tại đây
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <ToastContainer />
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <div className="popup-header">
          <img
            src="https://i.ibb.co/35SyTcnX/Anstay.png"
            alt="logo"
            className="header-logo"
          />
          <h2>
            {showRegister
              ? "Đăng ký"
              : showForgotPassword
              ? "Quên mật khẩu"
              : "Đăng nhập"}
          </h2>
        </div>

        {!showRegister && !showForgotPassword ? (
          <form className="popup-form" onSubmit={handleSubmit}>
            <label>Email *</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email"
              required
            />

            <label>Mật khẩu *</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />

            <div className="options">
              <div className="option-child">
                <label>
                  <input type="checkbox" /> {" Ghi nhớ tài khoản "}
                </label>
              </div>
              <div className="option-child">
                <label>Quên mật khẩu?</label>
                <a href="#" onClick={() => setShowForgotPassword(true)}>
                  Click vô đây
                </a>
              </div>
            </div>

            <button type="submit" className="login-btn">
              Đăng nhập
            </button>
            <div className="register-text">
              Bạn chưa có tài khoản?{" "}
              <a href="#" onClick={() => setShowRegister(true)}>
                Đăng ký
              </a>
            </div>
          </form>
        ) : showRegister ? (
          <form className="popup-form" onSubmit={handleRegisterSubmit}>
            <label>Tên người dùng *</label>
            <input
              type="text"
              placeholder="Nhập tên người dùng"
              required
              value={registerData.fullName}
              onChange={(e) =>
                setRegisterData({ ...registerData, fullName: e.target.value })
              }
            />

            <label>Email *</label>
            <input
              type="email"
              placeholder="Nhập email"
              required
              value={registerData.email}
              onChange={(e) =>
                setRegisterData({ ...registerData, email: e.target.value })
              }
            />

            <label>Số điện thoại *</label>
            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              required
              value={registerData.phone}
              onChange={(e) =>
                setRegisterData({ ...registerData, phone: e.target.value })
              }
            />

            <label>Mật khẩu *</label>
            <input
              type="password"
              placeholder="Nhập mật khẩu"
              required
              value={registerData.password}
              onChange={(e) =>
                setRegisterData({ ...registerData, password: e.target.value })
              }
            />

            <label>Xác nhận mật khẩu *</label>
            <input
              type="password"
              placeholder="Xác nhận mật khẩu"
              required
              value={registerData.confirmPassword}
              onChange={(e) =>
                setRegisterData({
                  ...registerData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <button type="submit" className="login-btn">
              Đăng ký
            </button>
            <div className="register-text">
              Bạn đã có tài khoản?{" "}
              <a href="#" onClick={() => setShowRegister(false)}>
                Đăng nhập
              </a>
            </div>
          </form>
        ) : (
          <form className="popup-form" onSubmit={handleForgotPasswordSubmit}>
            <label>Email *</label>
            <input type="email" placeholder="Nhập email" required />

            <button type="submit" className="login-btn">
              Gửi đi
            </button>
            <div className="register-text">
              <a href="#" onClick={() => setShowForgotPassword(false)}>
                Quay lại
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
