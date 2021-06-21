import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";

import logo from "../videos/logo.png";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-section">
        <div className="home-heading">
          <div>
            <img src={logo} alt="not found" />
          </div>
        </div>

        <div className="title-container">
          <h2>
            <span> Thai </span> <span style={{ color: "#f9b707" }}>Lotto</span>
          </h2>
        </div>
        <div className="notify">
          <IoNotifications className="notify-icon" />
        </div>
      </div>
    </div>
  );
};
export default Home;
