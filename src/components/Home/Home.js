import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";


import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-section  flexbox">
        <div className="home-heading ">
          <div>
            <img src="/logo.jpeg" alt="not found" />
          </div>
        </div>

        <div className="title-container">
          <h2 className="thai-lotto">
            Thai Lotto Tv
            {/* <span> Thai </span> <span style={{ color: "#f9b707" }}>Lotto</span> */}
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
