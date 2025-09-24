import { FaRobot } from "react-icons/fa";

function About() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 max-w-3xl text-center">
        
        {/* Logo inside circle */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-100 dark:bg-gray-700 rounded-full shadow-md">
            <FaRobot className="text-5xl text-blue-600 dark:text-blue-400 drop-shadow-lg" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
          About Movie Recommender 
        </h1>

       {/* Paragraphs */}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          <span className="font-semibold">Movie Recommender</span> is an AI-powered
          recommendation system designed to help users discover the most
          relevant and personalized results.  
       
        </p>

       <p className="text-md text-gray-600 dark:text-gray-400">
  You can search by providing <span className="font-semibold">text</span> (such
  as a movie title or a short description), or by uploading an
  <span className="font-semibold"> image</span> (like a movie poster).  
  The system will recommend the closest matching movies and display their key
  details.  
  Our goal is to make finding the perfect movie simple, smart, and interactive.
</p>
      </div>
    </div>
  );
}

export default About;
