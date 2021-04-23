import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import coronavirus from "./image/coronavirus.png";
import { Avatar } from "@material-ui/core";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  const closeMobileMenu = () => {
    setClick(false);
  };

  const [sidebar, setSidebar] = useState(false);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <>
      {/* navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo-icon">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <Avatar
                className="navbar-logo-img"
                src={coronavirus}
                alt="covid"
              />
              <span style={{ marginLeft: "0.5rem" }} className="nav-head">
                COVID-19 TRACKER
              </span>
            </Link>
          </div>
          {/* </div> */}
          <div className="menu-icon" onClick={handleClick}>
            {click ? (
              <AiOutlineClose className="fa-bars" />
            ) : (
              <FaBars className="fa-bars" />
            )}
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                activeClassName="nav-links-active"
                exact
                to="/"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                World
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                activeClassName="nav-links-active"
                exact
                to="/india"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                India
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
