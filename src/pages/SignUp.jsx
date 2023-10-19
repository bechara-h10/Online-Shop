import React from "react";
import styles from "../styles/login.module.css";

function SignUp() {
  return (
    <>
      <h3 className={styles.loginHeader}>Sign Up</h3>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.loginInput} />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className={styles.loginInput}
        />
        <button type="submit" className={styles.formButton}>
          Sign up
        </button>
      </form>
    </>
  );
}

export default SignUp;
