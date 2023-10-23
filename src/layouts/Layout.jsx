import React, { useEffect } from "react";
import Header from "../components/Header";
import db, { auth } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signIn, setCart } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

function Layout({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const fetchCart = async (id) => {
    const userRef = doc(db, "users", id);
    try {
      const userSnapshot = await getDoc(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        const cart = userData.cart;
        return cart;
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(
          signIn({
            user: {
              id: user.uid,
              email: user.email,
            },
          })
        );
        const cart = await fetchCart(user.uid);
        dispatch(
          setCart({
            cart,
          })
        );
        navigate("/");
      } else {
        dispatch(
          setCart({
            cart: JSON.parse(localStorage.getItem("cart")) || [],
          })
        );
      }
      setIsLoading(false);
    });
  }, []);
  if (isLoading) {
    return (
      <>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "100px",
          }}
        >
          <LoadingSpinner
            width="100"
            height="100"
            colors={["#000", "#000", "#000", "000", "#000"]}
          />
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
