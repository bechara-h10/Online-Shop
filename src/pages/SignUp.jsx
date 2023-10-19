import React, { useState } from "react";
import styles from "../styles/login.module.css";
import { Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import db, { auth } from "../firebase";
import LoadingSpinner from "../components/LoadingSpinner";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const signUp = async (email, password) => {
    try {
      setErrorMessage("");
      setIsLoading(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;
      console.log(user);
      await createFirestoreUser(user.uid, email);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error);
    }
  };

  const createFirestoreUser = async (uid, email) => {
    try {
      const userRef = doc(db, "users", uid);
      await setDoc(userRef, {
        email: email,
        cart: [],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h3 className={styles.loginHeader}>Sign Up</h3>
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
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.loginInput}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <span className={styles.error}>{errorMessage}</span>
        <button
          type="submit"
          className={styles.formButton}
          disabled={
            email && password && confirmPassword && password === confirmPassword
              ? false
              : true
          }
          onClick={() => signUp(email, password)}
        >
          {isLoading ? <LoadingSpinner /> : "Sign up"}
        </button>
        <p>
          Have an account?{" "}
          <Link to="/login" className={styles.link}>
            Login
          </Link>{" "}
          here!
        </p>
      </form>
    </>
  );
}

export default SignUp;
