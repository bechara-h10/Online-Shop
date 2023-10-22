import React from "react";
import styles from "../styles/checkCartButton.module.css";
import { Link } from "react-router-dom";

function CheckCartButton() {
  return (
    <Link to="cart">
      <button className={styles.checkCartButton}>
        <i className="fa-solid fa-cart-shopping"></i>
      </button>
    </Link>
  );
}

export default CheckCartButton;
