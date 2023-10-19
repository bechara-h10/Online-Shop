import React from "react";
import Header from "../components/Header";

function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
