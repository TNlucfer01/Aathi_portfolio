import About from "../pages/About";
import HomePage from "../pages/Homepage";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Projects from "../pages/Project";
import Footer from "./Footer";
import Skills from "../pages/Serivices";
function IndexRouter() {
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/contact" element={<Footer />} /> */}
        </Route>
      </Routes>
    </>
  );
  //footer
}

export default IndexRouter;
