import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Recommendations from "./components/Recommendations"; 
// import History from "./components/History";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("loggedInUser")
  );

  const location = useLocation();

  // اختفاء Navbar في صفحات Login و Signup
  const showNavbar = !["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {showNavbar && (
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;

