import React from "react";
import { FcHome } from "react-icons/fc";
import { FaVideo } from "react-icons/fa";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="nav-container">
      <nav>
        <div className="nav-wrapper">
          <ul id="nav-mobile" className="centre">
            <li>
              <Link to="/">
                <FcHome />
              </Link>
            </li>
            <li>
              <Link to="/drawerdetail">
                <FaVideo />
              </Link>
            </li>
            <li>
              <Link to="/admin">
                <AiFillHeart />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
