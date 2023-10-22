import React from "react";
import styles from "../styles/card.module.css";

function Card() {
  return (
    <div className={styles.card}>
      <section className={styles.topSection}>
        <div className={styles.cardImage}>
          <img
            src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
            alt=""
          />
        </div>
      </section>
      <section className={styles.bottomSection}>
        <div className={styles.cardDescription}>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            nam.
          </p>
          <p className={styles.price}>100$</p>
        </div>
        <div className={styles.userInteractions}>
          <button className={styles.addButton}>
            <i className="fa-solid fa-cart-plus"></i> Add to cart
          </button>
          {/* <button className={styles.minusButton}>
          <i className="fa-solid fa-plus"></i>
        </button>
        <span>0</span>
        <button className={styles.plusButton}>
          <i className="fa-solid fa-minus"></i>
        </button> */}
        </div>
      </section>
    </div>
  );
}

export default Card;
