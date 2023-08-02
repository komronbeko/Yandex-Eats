import React from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {

  const url = useLocation().pathname;

  return (
    <footer className={`bg-blue-400 ${url === "/auth/login" ? "hidden" : " "}`}>
      Footer
    </footer>
  );
};

export default Footer;
