import React from "react";
import styles from "../styles/cart.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function Cart() {
  const cart = useSelector((state) => state.user.cart);
  return (
    <main className={styles.container}>
      {cart.length === 0 ? (
        <>
          <h3>Your cart is empty</h3>
          <Link to="/shop">
            <button className={styles.shopNowButton}>Shop now</button>
          </Link>
        </>
      ) : (
        <>
          <section className={styles.leftSection}>
            <div className={styles.totalItems}>
              <p>Your shopping cart </p>
              <p>{cart.length > 1 ? `${cart.length} items` : `1 item`}</p>
            </div>
            <div className={styles.itemsContainer}>
              {cart.map((item) => {
                return (
                  <CartItem
                    id={item.id}
                    quantity={item.quantity}
                    key={item.id}
                  />
                );
              })}
            </div>
          </section>
          <section className={styles.rightSection}>
            <div className={styles.totalAmmount}>
              <p>Estimated total</p>
              <p>{cart.reduce((total, currentValue, index) => {})}</p>
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Cart;
