import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaStar, FaXing } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

const Menu = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessTokenFromLocalStorage();
    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <section className="grid-container container font-assistant my-5">
      {showModal ? (
        <>
          <div className="transition duration-300 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b-2 border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">KFC</h3>
                  <button
                    onClick={handleModalClose}
                    className="text-gray-600 transition duration-300 rounded-full hover:bg-gray-500 hover:text-white p-2">
                    <FaXing />
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col gap-3 text-xl">
                  <div className="text-start w-full pb-3 border-b-2 border-solid">
                    Ташкент, улица Лутфи, 21А <br /> Today to 23:30
                  </div>
                  <div className="text-start w-full pb-3 border-b-2 border-solid">
                    Fast food &#183; Burgers &#183; $
                  </div>

                  <div className="text-start w-full">
                    Contractor (seller) ООО "International Foodchain", 100011,
                    100011, Ташкент , ул.Навои, 39, INN 305131885
                    <br />
                    Business hours: from 10:00 to 23:45
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t-2 border-solid border-slate-200 rounded-b">
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
      <div className="menu">
        <Link
          to={"/"}
          className="rounded-xl shadow-xl px-5 py-3 w-44 border border-gray-300 flex flex-row gap-1 items-center text-center">
          <FaArrowLeft /> All restaurants
        </Link>
        <h4 className="font-bold text-black text-2xl mt-10">Menu</h4>
        <div className="flex flex-col gap-2 justify-start mt-5">
          <button className="rounded-xl px-5 py-3 w-44 border border-gray-300 hover:bg-gray-100 flex flex-row gap-1 items-center text-center">
            Burgers
          </button>
          <button className="rounded-xl px-5 py-3 w-44 border border-gray-300 hover:bg-gray-100 flex flex-row gap-1 items-center text-center">
            Others
          </button>
          <button className="rounded-xl px-5 py-3 w-44 border border-gray-300 hover:bg-gray-100 flex flex-row gap-1 items-center text-center">
            Chicken
          </button>
          <button className="rounded-xl px-5 py-3 w-44 border border-gray-300 hover:bg-gray-100 flex flex-row gap-1 items-center text-center">
            Twisters
          </button>
          <button className="rounded-xl px-5 py-3 w-44 border border-gray-300 hover:bg-gray-100 flex flex-row gap-1 items-center text-center">
            Drinks
          </button>
          <button className="rounded-xl px-5 py-3 w-44 border border-gray-300 hover:bg-gray-100 flex flex-row gap-1 items-center text-center">
            Coffee and Tea
          </button>
        </div>
      </div>
      <div className="main flex flex-col justify-start items-start">
        <div className="flex justify-center flex-col items-center">
          <div className="bg-transparent relative transition duration-500 rounded-lg">
            <img
              className="rounded-3xl w-[750px] h-96"
              src="https://eda.yandex/images/3538649/78264450c710e37688b9ead646630b42-1100x825.jpg"
              alt="food"
            />
            <div className="bg-gradient-to-bl from-transparent via-transparent to-black w-full h-full absolute bottom-0 left-0 opacity-70 rounded-3xl"></div>
            <div className="absolute top-44 left-10 text-5xl py-1 px-2 text-white font-bold">
              <span className="text-md">KFC</span>
            </div>
            <div className="absolute transition duration-300 flex flex-row gap-2 items-center bottom-20 left-12 p-2 font-bold bg-white hover:bg-opacity-90 bg-opacity-80 rounded-2xl">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="UiKitUiKitIcon_xl UiKitUiKitIcon_root h-7 w-7">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="m17.809 4.45.67-.27a1.554 1.554 0 0 0 .958-1.649l-3.061.54a2.787 2.787 0 1 0 1.433 1.379Zm-14.68 6.293a2.914 2.914 0 0 1 2.694-1.56c.476.019 1.04.028 1.663.039 1.253.02 2.742.045 4.216.155.293 3.884-.856 6.327-2.552 7.923l-.3 2.1-5.2-.3.85-6.4-1.951-.847.58-1.11ZM8.85 19.4 8.6 21c.444 0 1.416.011 2.587.024h.001c1.768.02 3.985.046 5.512.046.366-1.189.665-2.414.915-3.76l1.76 3.763c.613-.485.92-.727 1.115-1.024a2.2 2.2 0 0 0 .36-1.296c-.014-.355-.152-.72-.427-1.453l-2.062-5.473c-.037-.097-.061-.162-.088-.21a.736.736 0 0 0-.132-.251c-.856-1.052-2.78-1.575-4.932-1.842.368 4.38-1.125 7.824-4.359 9.876Z"
                  fill="currentColor"></path>
              </svg>
              <p className="flex flex-col items-start">
                <span className="font-bold text-md text-black">20-30</span>
                <span className="text-gray-700 text-sm font-thin">min</span>
              </p>
            </div>
            <div className="absolute transition duration-300 flex flex-row gap-2 items-center bottom-20 left-36 px-5 py-2 font-bold bg-white hover:bg-opacity-90 bg-opacity-80 rounded-2xl">
              <FaStar />
              <p className="flex flex-col items-start">
                <span className="font-bold text-md text-black">4.8</span>
                <span className="text-gray-700 text-sm font-thin">200+</span>
              </p>
            </div>
            <div
              onClick={handleButtonClick}
              className="absolute transition duration-300 flex flex-row gap-2 items-center bottom-20 left-60 py-2 px-3  font-bold bg-white hover:bg-opacity-90 cursor-pointer bg-opacity-80 rounded-2xl">
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="UiKitUiKitIcon_xl UiKitUiKitIcon_root  w-10 h-11">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="currentColor"
                  strokeWidth="2"></circle>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm.5 7a.5.5 0 0 1-.5-.5V10a.5.5 0 0 0-.5-.5H10v1h.5a.5.5 0 0 1 .5.5v3.5a.5.5 0 0 1-.5.5H10v1h4v-1h-.5Z"
                  fill="currentColor"></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="transition mt-10 w-[750px] duration-300 flex flex-row gap-2 items-center px-5 py-2 font-bold bg-[#5ac31a] hover:bg-opacity-30 bg-opacity-20 rounded-2xl">
          <svg
            width="48"
            height="47"
            viewBox="0 0 48 47"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.7594 41.5647H16.0891C16.4937 41.5647 16.7567 41.6457 17.04 41.9492L20.1153 45.0042C22.7656 47.6546 25.2339 47.6343 27.8641 45.0042L30.9394 41.9492C31.2226 41.6457 31.5059 41.5647 31.8903 41.5647H36.2199C39.9426 41.5647 41.7028 39.8046 41.7028 36.0616V31.732C41.7028 31.3476 41.8242 31.0644 42.1074 30.7811L45.1624 27.7058C47.8128 25.0757 47.7926 22.6074 45.1624 19.9772L42.1074 16.8817C41.8242 16.5985 41.7028 16.3355 41.7028 15.9511V11.6214C41.7028 7.89874 39.9628 6.11833 36.2199 6.11833H31.8903C31.5059 6.11833 31.2226 6.01717 30.9394 5.73392L27.8641 2.67889C25.2339 0.028504 22.7656 0.028504 20.1153 2.67889L17.04 5.73392C16.777 6.01717 16.4937 6.11833 16.0891 6.11833H11.7594C8.03676 6.11833 6.27658 7.85828 6.27658 11.6214V15.9511C6.27658 16.3355 6.17542 16.5985 5.89217 16.8817L2.83715 19.9772C0.186757 22.6074 0.206989 25.0757 2.83715 27.7058L5.89217 30.7811C6.17542 31.0644 6.27658 31.3476 6.27658 31.732V36.0616C6.27658 39.7843 8.03676 41.5647 11.7594 41.5647Z"
              fill="rgb(90, 195, 26)"></path>
          </svg>
          <div className="w-7 h-7 relative right-11">
            <img
              src="https://avatars.mds.yandex.net/get-bunker/128809/8a437d76ad8ef449df0d4a09b3d3fcc045abd915/orig"
              alt="courier"
            />
          </div>
          <p className="flex flex-col items-start relative right-7">
            <span className="font-bold text-md text-[#5ac31a]">
              Free Delivery
            </span>
            <span className="font-thin text-md text-[#5ac31a]">
              for any order from 10000 sum
            </span>
          </p>
        </div>
        <h4 className="my-5 w-full font-bold text-5xl text-black flex justify-start items-start text-start">
          Foods
        </h4>
        <div className="flex justify-start items-start flex-col">
          <div className="bg-transparent flex flex-row flex-wrap gap-3 justify-start items-center">
            <div className="container mx-auto p-3 bg-white w-60 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
              <img
                className="rounded-xl"
                src="https://eda.yandex/images/3472725/c6adfdd120e049be99fa7de6d558c0ad-216x188.jpeg"
                alt="food"
              />
              <div>
                <h6 className="text-3xl font-bold text-black">39 990 sum</h6>
                <p className="font-semibold text-xl text-black mb-5">
                  King-Hot-Dog
                </p>
                <span className="font-thin text-md text-gray-600">280 g</span>
                <div className="mt-3 text-xl font-bold flex flex-row justify-between items-center rounded-xl w-full border bg-gray-200 hover:bg-gray-100 text-center">
                  <button className="rounded-l-xl py-1 hover:bg-gray-400 w-10 h-full">
                    -
                  </button>
                  1
                  <button className="rounded-r-xl py-1 hover:bg-gray-400 w-10 h-full">
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="basket bg-transparent">
        <div className="mx-auto">
          <div className="mx-auto">
            <div className="rounded-3xl bg-white shadow-lg">
              <div className="px-4 py-6 sm:px-8 sm:py-10">
                <div className="flow-root">
                  <ul className="-my-8">
                    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div className="shrink-0 relative">
                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                          1
                        </span>
                        <img
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src="https://eda.yandex/images/3472725/c6adfdd120e049be99fa7de6d558c0ad-216x188.jpeg"
                          alt="food"
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">
                              King-Hot-Dog
                            </p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              280 g
                            </p>
                          </div>

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              39 990 sum
                            </p>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                            <svg
                              className="h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                                className=""></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                    <li className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
                      <div className="shrink-0 relative">
                        <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-white text-sm font-medium text-gray-500 shadow sm:-top-2 sm:-right-2">
                          1
                        </span>
                        <img
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=150&q=60"
                          alt=""
                        />
                      </div>

                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">
                              Nike Air Max 2019
                            </p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">
                              36EU - 4US
                            </p>
                          </div>

                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              $1259.00
                            </p>
                          </div>
                        </div>

                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            type="button"
                            className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                            <svg
                              className="block h-5 w-5"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                                className=""></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 space-y-3 border-t border-b py-8">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Subtotal</p>
                    <p className="text-lg font-semibold text-gray-900">$2399.00</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-400">Shipping</p>
                    <p className="text-lg font-semibold text-gray-900">$8.00</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Total</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    <span className="text-xs font-normal text-gray-400">USD</span>{" "}
                    2499.00
                  </p>
                </div>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    className="group inline-flex w-full items-center justify-center rounded-md bg-orange-500 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                    Place Order
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Menu;
