import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/cartItem.module.css";
import { doc, setDoc } from "firebase/firestore";
import db from "../firebase";
import { setCart } from "../redux/userSlice";

function CartItem({ id, quantity }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const cart = useSelector((state) => state.user.cart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((json) => {
        setTitle(json.title);
        setImage(json.image);
        setPrice(json.price);
      });
  }, [quantity]);

  const modifyItemQuantity = async (id, quantity) => {
    const itemIndex = cart.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[itemIndex] = {
        ...updatedCart[itemIndex],
        quantity: quantity,
      };

      if (!isAuthenticated) {
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

  const removeItem = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    if (!isAuthenticated) {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch(
        setCart({
          cart: updatedCart,
        })
      );
    } else {
      try {
        const userRef = doc(db, "users", user.id);
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemImage}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.itemInfo}>
        <div className={styles.itemTitle}>
          <p>{title}</p>
        </div>
        <div className={styles.userInteractions}>
          <div className={styles.buttonContainer}>
            <button
              className={styles.minusButton}
              disabled={itemQuantity <= 1}
              onClick={() => {
                setItemQuantity(() => {
                  modifyItemQuantity(id, itemQuantity - 1);
                  return itemQuantity - 1;
                });
              }}
            >
              <i className="fa fa-solid fa-minus"></i>
            </button>
            <p className={styles.itemQuantity}>{itemQuantity}</p>
            <button
              className={styles.plusButton}
              onClick={() => {
                setItemQuantity(() => {
                  modifyItemQuantity(id, itemQuantity + 1);
                  return itemQuantity + 1;
                });
              }}
            >
              <i className="fa fa-solid fa-plus"></i>
            </button>
          </div>
          <div className={styles.itemPrice}>
            <p>${price * itemQuantity}</p>
          </div>
          <button
            className={styles.removeButton}
            onClick={() => removeItem(id)}
          >
            Remove <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
