import { Layout } from "./components";
import { HomePage } from "./pages";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/about" element={<AboutPage />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/contact" element={<Contact />} /> */}
        </Routes>
      </Layout>
    </>
  );
};

export default App;
