import React, { useState } from "react";
import styles from "../styles/login.module.css";
import cx from "classnames";
import db, { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { signIn } from "../redux/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoginWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider).then(async (result) => {
      let user = result.user;
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        let cart = [];
        if (!userSnapshot.exists()) {
          await setDoc(userRef, {
            id: user.uid,
            email: user.email,
            cart: [],
          });
        } else {
          const userData = userSnapshot.data();
          cart = userData.cart;
        }
        dispatch(
          signIn({
            user: { id: user.uid, email: user.email, cart: cart },
          })
        );
        navigate("/");
        toast("You have been successfully logged in");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
      setIsLoading(false);
    });
  };

  const userLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      const userRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userRef);
      let cart = [];
      if (!userSnapshot.exists()) {
        await setDoc(userRef, {
          id: user.uid,
          email: user.email,
          cart: [],
        });
      } else {
        const userData = userSnapshot.data();
        cart = userData.cart;
      }
      dispatch(
        signIn({
          user: { id: user.uid, email: user.email, cart: cart },
        })
      );
      toast("You have been successfully logged in");
    } catch (error) {
      toast(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };
  return (
    <>
      <h3 className={styles.loginHeader}>Sign In</h3>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="email"
          placeholder="Email"
          className={styles.loginInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className={styles.formButton}
          onClick={() => userLogin(email, password)}
        >
          {isLoading ? (
            <LoadingSpinner
              width="30"
              height="30"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          ) : (
            "Sign in"
          )}
        </button>
        <button
          className={cx(styles.formButton, styles.googleButton)}
          onClick={userLoginWithGoogle}
        >
          <i className="fa-brands fa-google"></i>{" "}
          <span>Sign in with Google</span>
        </button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Register
          </Link>{" "}
          now!
        </p>
      </form>
    </>
  );
}

export default SignIn;
