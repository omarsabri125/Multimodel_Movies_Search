import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHome, FaMoon, FaSun, FaHistory, FaRobot } from "react-icons/fa";

function Navbar({ onToggleTheme, isLoggedIn, setIsLoggedIn }) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode(!darkMode);
    if (onToggleTheme) onToggleTheme(!darkMode);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    alert("You have logged out!");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow-md px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-bold text-xl">
        <FaRobot className="text-2xl" />
        <span>Movie Recommender</span>
      </div>

      {/* Menu */}
      <div className="flex items-center gap-6 text-gray-700 dark:text-gray-200 text-base font-medium">
        <Link to="/" className="flex items-center gap-2 hover:text-blue-500 transition">
          <FaHome className="text-lg" />
          <span>Home</span>
        </Link>

        <button
          onClick={handleThemeToggle}
          className="flex items-center gap-2 hover:text-yellow-500 transition"
        >
          {darkMode ? <FaSun className="text-lg" /> : <FaMoon className="text-lg" />}
          <span>{darkMode ? "Light" : "Dark"}</span>
        </button>

        {/* <Link to="/history" className="flex items-center gap-2 hover:text-green-500 transition">
          <FaHistory className="text-lg" />
          <span>History</span>
        </Link> */}

        {/* Auth Section */}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            >
              Signup
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
