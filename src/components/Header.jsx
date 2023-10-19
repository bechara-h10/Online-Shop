import React, { useEffect } from "react";
import styles from "../styles/header.module.css";
import logoNoBackground from "../assets/logo-no-background.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut as setSignOut, signIn } from "../redux/userSlice";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

function Header() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogout = async () => {
    await signOut(auth);
    dispatch(setSignOut());
    navigate("/");
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          signIn({
            email: user.email,
            provider: "google",
            password: "",
          })
        );
        navigate("/");
      }
    });
  }, []);
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
            to={"/shop"}
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
  );
}

export default Header;
