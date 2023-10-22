import React from "react";
import styles from "../styles/landingPage.module.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className={styles.container}>
      <section>
        <h1>Welcome to All Shop</h1>
        <p>
          All Shop is the place where you will find everything you need, from
          clothes, to electronics and even jewelery
        </p>
        <Link to="shop">
          <button className={styles.shopNowButton}>Shop now</button>
        </Link>
      </section>
    </div>
  );
}

export default LandingPage;
