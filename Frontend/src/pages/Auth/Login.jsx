import React, { useState } from "react";
import axios from "axios";
import logo from "../../images/logo.png";
import bg from "../../images/bg.png";

const Login = () => {
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { email, password });
      // handle successful login here
    } catch (error) {
      // handle error here
    }
  };

  return (
    <section style={styles.header}>
      <div
        style={styles.content}
        className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12 bg-cover bg-no-repeat bg-center bg-opacity-10">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-[#feee72] to-[#FCE000] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
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
                        autocomplete="off"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type="text"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#FCE000]"
                        placeholder="Email address"
                      />
                      <label
                        for="email"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-[#FCE000] peer-focus:text-sm">
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input
                        autocomplete="off"
                        id="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#FCE000]"
                        placeholder="Password"
                      />
                      <label
                        for="password"
                        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-[#FCE000] peer-focus:text-sm">
                        Password
                      </label>
                    </div>
                    <div className="relative">
                      <button type={"submit"} className="bg-[#FCE000] text-black rounded-md px-2 py-1 my-2">
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

export default Login;
