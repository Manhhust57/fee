import { useState, useEffect, useContext, useRef, useCallback } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { CircleHelp, Earth, UserRound } from "lucide-react";
import { DownOutlined } from "@ant-design/icons";
import LoginPopup from "../Login/LoginPopup";
import { AuthContext } from "../../Context/AuthContext";

interface User {
  fullName: string;
  [key: string]: any;
}

interface Apartment {
  id: number;
  name: string;
}

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const location = useLocation();

  // Refs
  const navRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // States
  const [showPopup, setShowPopup] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [navActive, setNavActive] = useState(false);
  const [userMenuActive, setUserMenuActive] = useState(false);

  // Guard clause
  if (!auth) return null;

  // Lấy thông tin user từ localStorage
  const getUserFromStorage = useCallback((): User | null => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }, []);

  // Effect: Load user data
  useEffect(() => {
    const checkUserLogin = () => {
      const userData = getUserFromStorage();
      setLoggedInUser(userData);
    };

    checkUserLogin();

    // Lắng nghe sự thay đổi localStorage
    window.addEventListener("storage", checkUserLogin);
    return () => window.removeEventListener("storage", checkUserLogin);
  }, [auth.user, getUserFromStorage]);

  // Effect: Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        navRef.current?.contains(target) ||
        hamburgerRef.current?.contains(target) ||
        userMenuRef.current?.contains(target)
      ) {
        return;
      }

      setNavActive(false);
      setUserMenuActive(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handlers
  const handleLogout = useCallback(() => {
    auth.logout();
    setLoggedInUser(null);
    setUserMenuActive(false);
  }, [auth]);

  const handleLoginSuccess = useCallback((fullname: string) => {
    const userData = getUserFromStorage();
    setLoggedInUser(userData);
    setShowPopup(false);
  }, [getUserFromStorage]);

  const toggleNav = useCallback(() => {
    setNavActive(prev => !prev);
  }, []);

  const toggleUserMenu = useCallback(() => {
    setUserMenuActive(prev => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setNavActive(false);
  }, []);

  const openLoginPopup = useCallback(() => {
    setShowPopup(true);
    setNavActive(false);
  }, []);

  // Navigation links
  const navLinks = [
    { to: "/booking", label: "Đặt Phòng" },
    { to: "/about", label: "Thông tin về chúng tôi" },
    { to: "/policy", label: "Chính Sách" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <>
      <header className="header">
        {navActive && (
          <div
            className="header-nav-overlay active"
            onClick={closeNav}
            aria-hidden="true"
          />
        )}

        <div className="header-container">
          {/* Logo */}
          <div className="header-logo-container">
            <Link to="/">
              <img
                src="https://i.ibb.co/35SyTcnX/Anstay.png"
                alt="Anstay Logo"
                className="header1-logo"
              />
            </Link>
          </div>

          {/* Hamburger Menu */}
          <div
            className="hamburger"
            onClick={toggleNav}
            ref={hamburgerRef}
            role="button"
            aria-label="Toggle navigation"
            aria-expanded={navActive}
          >
            <div />
            <div />
            <div />
          </div>

          {/* Navigation */}
          <div
            className={`header-nav-container ${navActive ? "active" : ""}`}
            ref={navRef}
          >
            {/* Header Select */}
            <div className="header-select">
              <div className="select-nav">
                <CircleHelp size={18} className="header-icon" />
                <Link to="/contact">Liên Hệ</Link>
              </div>

              <div className="select-nav">
                <Earth size={18} className="header-icon" />
                <Link to="">Ngôn Ngữ</Link>
              </div>

              {/* User Menu */}
              <div
                className={`user-menu ${userMenuActive ? "active" : ""}`}
                ref={userMenuRef}
              >
                {loggedInUser ? (
                  <div>
                    <div className="user-info" onClick={toggleUserMenu}>
                      <UserRound size={18} className="header-icon" />
                      <span className="user-fullname">
                        {loggedInUser.fullName}
                      </span>
                      <DownOutlined />
                    </div>

                    {userMenuActive && (
                      <div className="dropdown">
                        <Link to="/dashbroad">
                          <button className="btn-login information-btn">
                            Thông tin cá nhân
                          </button>
                        </Link>
                        <Link to="/bloguser">
                          <button className="btn-login information-btn">
                            Viết Blog
                          </button>
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="btn-login logout-btn"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button className="btn-login" onClick={openLoginPopup}>
                    Đăng nhập
                  </button>
                )}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="header-nav">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={closeNav}
                  className={location.pathname === to ? "active" : ""}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Login Popup */}
      {showPopup && (
        <LoginPopup
          onClose={() => setShowPopup(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </>
  );
};

export default Header;