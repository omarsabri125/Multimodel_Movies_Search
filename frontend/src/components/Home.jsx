import { FaRobot } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition duration-300">
      {/* Title with Logo */}
      <div className="flex items-center gap-3 mb-6">
        <FaRobot className="text-5xl text-blue-600 dark:text-blue-400 drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100">
          Movie Recommender
        </h1>
      </div>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl text-center mb-10 leading-relaxed">
        Discover smart, personalized recommendations powered by{" "}
        <span className="font-semibold text-blue-600 dark:text-blue-400">
          AI technology
        </span>
        .  
        Get what you need faster, easier, and more efficiently 🤖
      </p>

      {/* Main CTA Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => navigate("/recommendations")}
          className="px-6 py-3 bg-blue-600 text-white text-lg rounded-xl shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Get Started
        </button>

        <button
          onClick={() => navigate("/about")}
          className="px-6 py-3 bg-gray-200 text-gray-800 text-lg rounded-xl shadow-md hover:bg-gray-300 transition dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Learn More
        </button>
      </div>

      {/* Auth Buttons
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="px-5 py-2 bg-green-600 text-white text-sm rounded-lg shadow-md hover:bg-green-700 transition dark:bg-green-500 dark:hover:bg-green-600"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/signup")}
          className="px-5 py-2 bg-purple-600 text-white text-sm rounded-lg shadow-md hover:bg-purple-700 transition dark:bg-purple-500 dark:hover:bg-purple-600"
        >
          Sign Up
        </button>
      </div> */}
    </section>
  );
}

export default Home;
