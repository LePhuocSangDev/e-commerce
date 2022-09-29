import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="app-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
