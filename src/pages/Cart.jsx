import React from "react";
import styles from "../styles/cart.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useDispatch } from "react-redux";
import { setCart } from "../redux/userSlice";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";

function Cart() {
  const cart = useSelector((state) => state.user.cart);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price * currentValue.quantity;
  }, 0);
  const proceedToCheckout = async () => {
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      const userRef = doc(db, "users", user.id);
      try {
        await setDoc(userRef, { cart: [] }, { merge: true });
      } catch (error) {
        console.log(error);
      }
    }
    dispatch(setCart({ cart: [] }));
  };
  return (
    <main className={styles.container}>
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <h3>Your cart is empty</h3>
          <Link to="/shop">
            <button className={styles.shopNowButton}>Shop now</button>
          </Link>
        </div>
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
              <p>${totalPrice}</p>
            </div>
            <button
              className={styles.checkoutButton}
              onClick={() => proceedToCheckout()}
            >
              Proceed to checkout
            </button>
          </section>
        </>
      )}
    </main>
  );
}

export default Cart;
