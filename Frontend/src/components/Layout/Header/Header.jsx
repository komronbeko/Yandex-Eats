import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../images/logo1.png";
import { FaXing } from "react-icons/fa";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import { getAccessTokenFromLocalStorage } from "../../../utils/storage";

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
  const [fullAddress, setFullAddress] = useState(null);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          let fullAddress = data.display_name;
          setFullAddress(fullAddress);
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

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const [user, setUser] = useState([]);

  const token = getAccessTokenFromLocalStorage();
  const fetchData = async (token) => {
    try {
      console.log(token);
      const response = await axios.get("http://localhost:7777/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(token);
  }, []);

  return (
    <header
      className={`bg-white font-assistant mx-auto my-0 flex justify-center items-center ${
        url === "/auth/login" ||
        url === "/auth/register" ||
        url === "/auth/register/verification"
          ? "hidden"
          : " "
      }`}>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">My Profile</h3>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                    <FaXing />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-row gap-10 text-xl">
                  <div className="flex flex-col text-start items-start gap-5 w-60">
                    <h5 className="font-bold">Name: </h5>
                    <h5 className="font-bold">Email: </h5>
                    <h5 className="font-bold">Phone Number: </h5>
                    <h5 className="font-bold">Address: </h5>
                  </div>
                  <div className="flex flex-col text-start items-start gap-5">
                    <span>{user.name}</span>
                    <span>{user.email}</span>
                    <span>{user.phone_number}</span>
                    <span>{fullAddress}</span>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-black bg-yellow rounded-xl font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleModalClose}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      <nav className="flex flex-row items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" />
        </Link>
        <div
          className={`w-full sm:max-w-xl `}>
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
          <div className="relative right-24 rounded-xl transition duration-300 bg-[#5c5a571a] hover:bg-[#302f2f1a] cursor-pointer text-center text-[#21201F] font-bold flex items-center justify-center w-40 h-12 px-2 py-6">
            {address}
          </div>
        )}
        <div className="flex flex-row gap-5 items-center ml-96 pl-20">
          <div className="flex flex-col items-center cursor-pointer">
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="UiKitUiKitIcon_m UiKitUiKitIcon_root">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 2c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10Zm.002 18a.21.21 0 0 0 .077-.024c.06-.027.164-.089.303-.22.288-.27.638-.755.976-1.506.584-1.297 1.013-3.128 1.118-5.25h-4.952c.105 2.122.534 3.953 1.118 5.25.338.75.688 1.236.976 1.507.139.13.243.192.303.22.05.022.072.023.078.023h.003Zm-3.024-.59c-.804-1.62-1.343-3.876-1.456-6.41h-3.46a8.009 8.009 0 0 0 4.916 6.41ZM4.562 11h3.46c.113-2.534.652-4.79 1.456-6.41A8.008 8.008 0 0 0 4.562 11Zm10.96 8.41A8.008 8.008 0 0 0 20.438 13h-3.46c-.113 2.534-.652 4.79-1.456 6.41ZM20.438 11a8.008 8.008 0 0 0-4.916-6.41c.804 1.62 1.343 3.876 1.456 6.41h3.46Zm-7.94-7a.211.211 0 0 0-.077.024c-.06.027-.164.089-.303.22-.288.27-.638.755-.976 1.506-.584 1.297-1.013 3.128-1.118 5.25h4.952c-.105-2.122-.534-3.953-1.118-5.25-.338-.75-.688-1.236-.976-1.507a1.176 1.176 0 0 0-.303-.22.206.206 0 0 0-.078-.023h-.003Z"
                fill="currentColor"></path>
            </svg>
            English
          </div>
          <Menu>
            <MenuHandler>
              <Avatar
                variant="circular"
                alt="tania andrew"
                className="cursor-pointer"
                src="https://avatars.mds.yandex.net/get-yapic/0/0-0/normal"
              />
            </MenuHandler>
            <MenuList>
              <MenuItem
                className="flex items-center gap-2"
                onClick={handleButtonClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  My Profile
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Edit Profile
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Inbox
                </Typography>
              </MenuItem>
              <MenuItem className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Help
                </Typography>
              </MenuItem>
              <hr className="my-2 border-blue-gray-50" />
              <MenuItem
                className="flex items-center gap-2 "
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Sign Out
                </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </nav>
    </header>
  );
};

export default Header;
