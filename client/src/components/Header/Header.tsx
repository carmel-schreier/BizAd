import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import Title from "../Title/Title";
import "./Header.css";
import LogOut from "../auth/LogOut";

class Header extends React.Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-dark">
          <div className="container-fluid">
            <ul className="navbar-nav flex-row">
              <Link to="/" className="navbar-brand flex-row d-flex me-5 ms-3">
                <i className="bi-bullseye me-2"></i>
                <div className="brand"> BizAd</div>
              </Link>
              <li className="nav-item me-3">
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink to="/services" className="nav-link">
                  Services
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink to="/about" className="nav-link">
                  About
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav flex-row d-flex">
              <li className="nav-item me-3">
                <NavLink to="/signUp" className="nav-link">
                  Sign Up
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink to="/login" className="nav-link">
                  Login
                </NavLink>
              </li>
              <li className="nav-item me-5">{<LogOut />}</li>
            </ul>
          </div>
        </nav>
      </>
    );
  }
}

export default Header;
