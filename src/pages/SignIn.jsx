import React from "react";
import styles from "../styles/login.module.css";
import cx from "classnames";

function SignIn() {
  return (
    <>
      <h3 className={styles.loginHeader}>Sign In</h3>
      <form className={styles.form}>
        <input type="email" placeholder="Email" className={styles.loginInput} />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
        />
        <button type="submit" className={styles.formButton}>
          Sign in
        </button>
        <button className={cx(styles.formButton, styles.googleButton)}>
          <i className="fa-brands fa-google"></i>{" "}
          <span>Sign in with Google</span>
        </button>
      </form>
    </>
  );
}

export default SignIn;
