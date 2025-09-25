import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import FloattingContactBt from "../components/FloatingContactBt/FloattingContactBt";
import "./MainLayout.css";
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <FloattingContactBt/>
    </div>
  );
};

export default MainLayout;
