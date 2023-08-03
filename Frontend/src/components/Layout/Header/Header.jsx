import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../images/logo1.png";
import { FaLanguage } from "react-icons/fa";

const Header = () => {
  const url = useLocation().pathname;

  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null,
          });
        },
        (error) => {
          setLocation({
            latitude: null,
            longitude: null,
            error: "Geolocation is not supported by this browser.",
          });
        }
      );
    } else {
      setLocation({
        latitude: null,
        longitude: null,
        error: "Geolocation is not supported by this browser.",
      });
    }
  }, []);

  const [address, setAddress] = useState(null);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          let fullAddress = data.display_name;
          let splitAddress = fullAddress.split(",");
          let firstTwoWords = splitAddress[0] + "," + splitAddress[1];
          setAddress(firstTwoWords);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [location]);

  let notifySuccess = (note) => toast.success(note);
  let notifyError = (note) => toast.error(note);

  let message = (note, type) => {
    if (type === "success") {
      notifySuccess(note);
    } else {
      notifyError(note);
    }
  };

  if (location.longitude) {
    message(location.error, "error");
  }

  return (
    <header
      className={`bg-white font-assistant mx-auto my-0 flex justify-center items-center ${
        url === "/auth/login" ||
        url === "/auth/register" ||
        url === "/auth/register/verification"
          ? "hidden"
          : " "
      }`}>
      <nav className="flex flex-row items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <div className="w-full sm:max-w-xl">
          <div className="overflow-hidden z-0 rounded-md relative p-3">
            <form className="relative flex z-50 bg-transparent rounded-xl">
              <input
                type="text"
                placeholder="Search for restaurants, food or prod..."
                className="rounded-xl border-2 border-yellow flex-1 px-3 py-3 w-96 text-gray-700 outline-yellow"
              />
              <button className="relative right-[6.9rem] bg-yellow text-black rounded-r-xl font-semibold w-40 px-8 py-3 focus:opacity-80 focus:outline-none">
                Search
              </button>
            </form>
          </div>
        </div>
        {location.error ? (
          " "
        ) : (
          <div className="relative right-24 rounded-xl bg-[#5c5a571a] hover:bg-[#302f2f1a] cursor-pointer text-center text-[#21201F] font-bold flex items-center justify-center w-40 h-12 py-6">
            {address}
          </div>
        )}
        <div className="flex flex-row gap-5 items-center ml-96 pl-20">
          <div className="flex flex-col items-center cursor-pointer">
            <FaLanguage />
            English
          </div>
          <div className="w-10 h-10 rounded-full">
            <img
              src="https://avatars.mds.yandex.net/get-yapic/0/0-0/normal"
              alt="avatar"
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
