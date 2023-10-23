import React, { useEffect } from "react";
import styles from "../styles/header.module.css";
import logoNoBackground from "../assets/logo-no-background.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCart, signOut as setSignOut, signIn } from "../redux/userSlice";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import db, { auth } from "../firebase";
import { Toaster } from "react-hot-toast";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = async () => {
    await signOut(auth);
    dispatch(setSignOut());
  };
  return (
    <>
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
            {isAuthenticated ? (
              <button className={styles.loginButton} onClick={userLogout}>
                Logout <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            ) : (
              <button
                className={styles.loginButton}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </header>
    </>
  );
}

export default Header;
