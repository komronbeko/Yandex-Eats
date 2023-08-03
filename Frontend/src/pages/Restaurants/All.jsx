import React, { useEffect, useState } from "react";
import { FaCarAlt, FaStar } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

const RestaurantsAll = () => {
  const navigate = useNavigate();

  const token = getAccessTokenFromLocalStorage();

  useEffect(() => {
    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:7777/restaurants", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data.data;
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in kilometers
    const dLat = deg2rad(lat2 - lat1); // Convert latitude difference to radians
    const dLon = deg2rad(lon2 - lon1); // Convert longitude difference to radians
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    const res = distance.toFixed(0);
    if (res < 10) {
      return "20-30";
    } else {
      return "50-60";
    }
  }

  // Function to convert degrees to radians
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const TooltipItem = ({ children, position }) => {
    return (
      <div className="bg-gray-200 transition duration-200 hover:bg-gray-300 w-[7.7rem] text-center rounded-full ml-2">
        <div className="mb-14">
          <div className="group relative inline-block">
            <button className="bg-primary inline-flex rounded py-2 px-[18px] text-base font-semibold text-black">
              {children}
            </button>
            <div className="text-start absolute top-full left-1/2 z-20 mt-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-white py-[6px] px-4 text-sm text-black shadow-xl opacity-0 group-hover:opacity-100 ">
              <span className="absolute top-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-white"></span>
              <p className="font-bold">Free Delivery</p>
              <p>for any order from 10000 sum</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-white font-assistant container">
      <hr className="mb-10"/>
      <Link to={"/"} className="rounded-xl bg-gray-200 hover:bg-gray-300 transition duration-300 ml-5 px-5 py-3 text-center">{"< "}Restaurants Near</Link>
      <div className="flex flex-row items-center justify-between mt-10 px-5">
        <h2 className="font-bold text-5xl">All Restaurants</h2>
      </div>
      {data.length > 0 && (
        <div className="flex px-5 justify-start gap-10 items-center">
          {data.map((restaurant) => (
            <Link to={"/menu"} key={restaurant.id}>
              <div className="flex justify-start">
                <div className="w-80 h-96 py-5">
                  <div className="bg-transparent relative transition duration-500 rounded-lg">
                    <img
                      className="rounded-3xl w-80 h-48 hover:brightness-105"
                      src="https://eda.yandex/images/3538649/78264450c710e37688b9ead646630b42-450x300.jpg"
                      alt="food"
                    />
                    <div className="p-1 max-h-20 rounded-lg bg-white">
                      <h1 className="text-black font-bold text-2xl mb-3 hover:cursor-pointer">
                        {restaurant.name}
                      </h1>
                      <p className="text-black font-bold flex flex-row items-center gap-1 tracking-wide">
                        <FaStar className="text-yellow" /> 4.8{" "}
                        {restaurant.rating} Good (200+) <span>$</span>
                        <span>$</span>
                        <span className="text-gray-400">$</span>
                      </p>
                      <div className="-mt-3">
                        <div className="rounded-full bg-[#9cdd73] w-7 h-7 relative top-5">
                          <img
                            src="https://avatars.mds.yandex.net/get-bunker/128809/8a437d76ad8ef449df0d4a09b3d3fcc045abd915/orig"
                            alt="courier"
                          />
                        </div>
                        <div>
                          <TooltipItem position="bottom">
                            Free Delivery
                          </TooltipItem>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 py-1 px-2 font-bold bg-[#FAE098CC] bg-opacity-10 rounded-full">
                      <span className="text-md">Free Delivery</span>
                    </div>
                    <div className="absolute top-40 right-0 py-1 px-2 font-bold bg-[#00000099] bg-opacity-10 rounded-tl-3xl rounded-br-3xl">
                      <span className="text-md text-white flex flex-row items-center gap-1">
                        <FaCarAlt />{" "}
                        {calculateDistance(
                          location.latitude,
                          location.longitude,
                          restaurant.latitude,
                          restaurant.longitude
                        )}{" "}
                        min
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
};

export default RestaurantsAll;
