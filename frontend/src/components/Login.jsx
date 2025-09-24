import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition">
      <form
        onSubmit={handleLogin}
        className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96"
      >
        {/* Dark/Light Mode Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-xl text-gray-600 dark:text-gray-300"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Login
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
