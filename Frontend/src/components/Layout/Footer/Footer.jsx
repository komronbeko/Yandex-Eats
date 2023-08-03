import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../images/logo1.png";

const Footer = () => {
  const url = useLocation().pathname;

  return (
    <footer
      className={`bg-white font-assistant ${
        url === "/auth/login" ||
        url === "/auth/register" ||
        url === "/auth/register/verification"
          ? "hidden"
          : " "
      }`}>
      <div className=" bg-gray-100">
        <div className="max-w-2xl mx-auto text-white py-10">
          <div className="text-center">
            <img
              src={logo}
              alt="logo"
              className="flex justify-center items-center mx-auto my-0"
            />
            <h3 className="text-3xl mb-3 text-yellow">
              Even easier in the app
            </h3>
            <div className="flex justify-center my-10">
              <div className="flex items-center border cursor-pointer transition duration-300 hover:bg-gray-300 border-gray-900 rounded-lg px-4 py-2 w-52 mx-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888857.png"
                  className="w-7 md:w-8"
                  alt="Google Play"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-900">Download on </p>
                  <p className="text-sm md:text-base text-gray-900">
                    {" "}
                    Google Play Store{" "}
                  </p>
                </div>
              </div>
              <div className="flex items-center border cursor-pointer transition duration-300 hover:bg-gray-300 border-gray-900 rounded-lg px-4 py-2 w-44 mx-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/888/888841.png"
                  className="w-7 md:w-8"
                  alt="Apple Store"
                />
                <div className="text-left ml-3">
                  <p className="text-xs text-gray-900">Download on </p>
                  <p className="text-sm md:text-base text-gray-900">
                    {" "}
                    Apple Store{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-28 flex flex-col md:flex-row md:justify-between items-center text-sm text-gray-400">
            <p className="order-2 md:order-1 mt-8 md:mt-0">
              {" "}
              &copy;2018–2023 Yandex Eats LLC
            </p>
            <div className="order-1 md:order-2">
              <span className="px-2">About us</span>
              <span className="px-2 border-l border-l-yellow">Contact us</span>
              <span className="px-2 border-l border-l-yellow">
                Privacy Policy
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
