import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const url = useLocation().pathname;

  return (
    <header
      className={`bg-red-400 ${
        url === "/auth/login" ||
        url === "/auth/register" ||
        url === "/auth/register/verification"
          ? "hidden"
          : " "
      }`}>
      header
    </header>
  );
};

export default Header;
