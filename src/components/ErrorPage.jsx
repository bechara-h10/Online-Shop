import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/errorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <h1>Oh no, this route doesn't exist!</h1>
      <p>
        You can go back to the home page by clicking <Link to="/">here</Link>,
        though!
      </p>
    </div>
  );
}

export default ErrorPage;
