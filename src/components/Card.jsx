import React, { useState } from "react";
import styles from "../styles/card.module.css";
import db from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setCart } from "../redux/userSlice";

function Card({ id, title, price, image, count, cart }) {
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const user = useSelector((state) => state.user.user);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const dispatch = useDispatch();
  const addItemToCart = async () => {
    if (!isAuthenticated) {
      const existingCartItemIndex = cart.findIndex((item) => item.id === id);
      if (existingCartItemIndex === -1) {
        const updatedCart = [...cart, { id: id, quantity: 1, price: price }];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        dispatch(
          setCart({
            cart: updatedCart,
          })
        );
        return;
      }
    }
    const userRef = doc(db, "users", user.id);
    try {
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const currentCart = userData.cart;
        const existingCartItemIndex = currentCart.findIndex(
          (item) => item.id === id
        );
        if (existingCartItemIndex === -1) {
          currentCart.push({ id: id, quantity: 1, price: price });
        }
        await setDoc(userRef, { cart: currentCart }, { merge: true });
        dispatch(
          setCart({
            cart: currentCart,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modifyItemQuantity = async (id, quantity) => {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: quantity,
      };

      if (!isAuthenticated) {
        // Update the local storage cart
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        const userRef = doc(db, "users", user.id);
        try {
          await setDoc(userRef, { cart: updatedCart }, { merge: true });
          dispatch(
            setCart({
              cart: updatedCart,
            })
          );
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  useEffect(() => {
    if (cart.map((item) => item.id).includes(id)) {
      setIsAdded(true);
      setQuantity(cart.find((item) => item.id === id).quantity);
    }
  }, []);

  return (
    <div className={styles.card}>
      <section className={styles.topSection}>
        <div className={styles.cardImage}>
          <img src={image} alt={title} />
        </div>
      </section>
      <section className={styles.bottomSection}>
        <div className={styles.cardDescription}>
          <p className={styles.description}>{title}</p>
          <p className={styles.price}>{price}$</p>
        </div>
        <div className={styles.userInteractions}>
          {!isAdded && (
            <button
              className={styles.addButton}
              onClick={() => {
                addItemToCart();
                setIsAdded(true);
                setQuantity(1);
              }}
            >
              <i className="fa-solid fa-cart-plus"></i> Add to cart{" "}
            </button>
          )}
          {isAdded && (
            <>
              <button
                className={styles.minusButton}
                disabled={quantity <= 1}
                onClick={() => {
                  setQuantity((quantity) => {
                    modifyItemQuantity(id, quantity - 1);
                    return quantity - 1;
                  });
                }}
              >
                <i className="fa-solid fa-minus"></i>
              </button>
              <span>{quantity}</span>
              <button
                className={styles.plusButton}
                disabled={quantity === count}
                onClick={() => {
                  setQuantity((quantity) => {
                    modifyItemQuantity(id, quantity + 1);
                    return quantity + 1;
                  });
                }}
              >
                <i className="fa-solid fa-plus"></i>
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default Card;
