import { Layout } from "./components";
import { HomePage, LoginPage, RegisterPage, VerificationPage, MenuPage, AllRestaurants } from "./pages";
import { Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/register/verification" element={<VerificationPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/restaurants" element={<AllRestaurants />} />
        </Routes>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default App;
