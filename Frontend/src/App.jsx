import { Layout } from "./components";
import { HomePage, LoginPage } from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
