import React from "react";
import styles from "../styles/login.module.css";
import cx from "classnames";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { signIn } from "../redux/userSlice";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = () => {
    signInWithPopup(auth, provider).then((result) => {
      let user = result.user;
      dispatch(
        signIn({
          user: { email: user.email, provider: "google", password: "" },
        })
      );
      navigate("/");
    });
  };
  return (
    <>
      <h3 className={styles.loginHeader}>Sign In</h3>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input type="email" placeholder="Email" className={styles.loginInput} />
        <input
          type="password"
          placeholder="Password"
          className={styles.loginInput}
        />
        <button type="submit" className={styles.formButton}>
          Sign in
        </button>
        <button
          className={cx(styles.formButton, styles.googleButton)}
          onClick={userLogin}
        >
          <i className="fa-brands fa-google"></i>{" "}
          <span>Sign in with Google</span>
        </button>
      </form>
    </>
  );
}

export default SignIn;
