import React, { useState } from "react";
import styles from "../styles/header.module.css";
import logoNoBackground from "../assets/logo-no-background.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/userSlice";
import { signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "../firebase";
import { Toaster } from "react-hot-toast";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.user.cart);
  const userLogout = async () => {
    if (isAuthenticated) {
      firebaseSignOut(auth).finally(() => {
        dispatch(signOut());
      });
    }
  };

  return (
    <div>
      <Toaster />
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
              to={"/shop"}
              className={({ isActive }) => {
                return isActive ? styles.activeLink : styles.link;
              }}
            >
              Shop
            </NavLink>
          </li>
          <li>
            {isAuthenticated && (
              <button className={styles.loginButton} onClick={userLogout}>
                Logout <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            )}
            {!isAuthenticated && (
              <button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </li>
          <li>
            <NavLink to={"/cart"} className={styles.link}>
              <span className={styles.cartLogo}>
                {cart.length !== 0 ? (
                  <span className={styles.numberOfItems}>{cart.length}</span>
                ) : (
                  ""
                )}
                <i className="fa-solid fa-bag-shopping"></i>
              </span>
            </NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default Header;
