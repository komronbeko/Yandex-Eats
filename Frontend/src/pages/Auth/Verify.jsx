import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../images/logo.png";
import bg from "../../images/bg.png";
import { useNavigate } from "react-router-dom";
import {
  getAccessTokenFromLocalStorage,
  getCodeFromStorage,
  getEmailFromStorage,
  setAccessTokenToLocalStorage,
} from "../../utils/storage";

const Verify = () => {
  const styles = {
    header: {
      backgroundImage: `url(${bg})`,
      height: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    content: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessTokenFromLocalStorage();

    if (token) {
      return navigate("/");
    }
  }, [navigate]);

  const [verifyCode, setVerifyCode] = useState("");

  let notifySuccess = (note) => toast.success(note);
  let notifyError = (note) => toast.error(note);

  let message = (note, type) => {
    if (type === "success") {
      notifySuccess(note);
    } else {
      notifyError(note);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const code = getCodeFromStorage();
      const email = getEmailFromStorage();
      const response = await axios.post(
        "http://localhost:7777/auth/register/verify",
        {
          verifyCode,
          code,
          email,
        }
      );
      console.log(response);
      if (response.status >= 200 && response.status < 300) {
        setVerifyCode("");
        let messageFromBackend = response.data.message;
        message(messageFromBackend, "success");
        setAccessTokenToLocalStorage(response.data.token);
        navigate("/");
      }
    } catch (error) {
      message(error.response.data.message, "error");
    }
  };

  return (
    <section style={styles.header}>
      <div
        style={styles.content}
        className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-cover bg-no-repeat bg-center bg-opacity-10">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#feee72] to-yellow shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold">
                  <img src={logo} alt="logo" />
                </h1>
              </div>
              <div className="divide-y divide-gray-200">
                <form onSubmit={handleSubmit}>
                  <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                    <div className="relative">
                      <input
                        autoComplete="off"
                        id="verifyCode"
                        name="verifyCode"
                        value={verifyCode}
                        onChange={(e) => setVerifyCode(e.target.value)}
                        type="number"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-yellow"
                        placeholder="Password"
                      />
                      <label
                        htmlFor="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-yellow peer-focus:text-sm">
                        Verification Code
                      </label>
                    </div>
                    <div className="relative flex flex-row justify-start items-center gap-5">
                      <button
                        type={"submit"}
                        className="bg-yellow text-black rounded-md px-2 py-1 my-2">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Verify;
