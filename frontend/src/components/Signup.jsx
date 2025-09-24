import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

function Signup() {
  const [fullName, setFullName] = useState("");
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

  const handleSignup = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find((u) => u.username === username);
    if (userExists) {
      alert("User already exists!");
      return;
    }

    users.push({ fullName, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! You can now login.");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen 
                    bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 transition">
      <form
        onSubmit={handleSignup}
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
          Sign Up
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

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
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
