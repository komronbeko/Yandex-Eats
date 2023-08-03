import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessTokenFromLocalStorage } from "../../utils/storage";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getAccessTokenFromLocalStorage();

    if (!token) {
      return navigate("/auth/login");
    }
  }, [navigate]);

  return (
    <div id="demo">
      Main Page
    </div>
  );
};

export default Home;
