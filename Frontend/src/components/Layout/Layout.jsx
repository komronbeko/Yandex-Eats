import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export const Layout = ({ children }) => {
  const url = useLocation().pathname;
  // url === "/auth/login" ||
  //   url === "/auth/register" ||
  //   url === "/auth/register/verification";
  return (
    <>
      {url === "/auth/login" ||
      url === "/auth/register" ||
      url === "/auth/register/verification" ? (
        " "
      ) : (
        <Header />
      )}
      {children}
      <Footer />
    </>
  );
};
