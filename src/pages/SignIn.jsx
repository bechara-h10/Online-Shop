import React, { useState } from "react";
import styles from "../styles/login.module.css";
import cx from "classnames";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { signIn } from "../redux/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import LoadingSpinner from "../components/LoadingSpinner";
import toast, { Toaster } from "react-hot-toast";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLoginWithGoogle = () => {
    setIsLoading(true);
    signInWithPopup(auth, provider).then((result) => {
      let user = result.user;
      dispatch(
        signIn({
          user: { email: user.email },
        })
      );
      navigate("/");
      toast("You have been successfully logged in");
    });
  };

  const userLogin = async (email, password) => {
    setIsLoading(true);
    const user = await signInWithEmailAndPassword(auth, email, password);
    dispatch(
      signIn({
        user: { email: user.email },
      })
    );
    toast("You have been successfully logged in");
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
          {isLoading ? <LoadingSpinner /> : "Sign in"}
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
