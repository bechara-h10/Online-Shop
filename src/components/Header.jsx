import React from "react";
import styles from "../styles/header.module.css";
import logoNoBackground from "../assets/logo-no-background.svg";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logoNoBackground} alt="All-Shop logo" />
        <span>All-Shop</span>
      </div>
      <ul className={styles.pagesList}>
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) => {
              return isActive ? styles.activeLink : styles.link;
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/login"}
            className={({ isActive }) => {
              return isActive ? styles.activeLink : styles.link;
            }}
          >
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/signup"}
            className={({ isActive }) => {
              return isActive ? styles.activeLink : styles.link;
            }}
          >
            About
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
