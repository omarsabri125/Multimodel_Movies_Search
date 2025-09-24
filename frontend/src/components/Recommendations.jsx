import { useState } from "react";
import { FaRobot } from "react-icons/fa";

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [image, setImage] = useState(null);

  // ✅ State للمودال
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // API بالنص
  const fetchByText = async (text) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/search_by_text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.results)) return data.results;
      return [];
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      return [];
    }
  };

  // API بالصورة
  const fetchByImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("image_file", imageFile);

      const response = await fetch("http://127.0.0.1:8000/api/v1/search_by_image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("API request failed");

      const data = await response.json();
      if (Array.isArray(data.respone)) return data.respone; 
      return [];
    } catch (error) {
      console.error("Error fetching recommendations by image:", error);
      return [];
    }
  };

 const fetchAnalysis = async (base64Image) => {
  try {
    // نحول Base64 ل Blob
    const byteCharacters = atob(base64Image);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/jpeg" });

    // نعمل ملف وهمي من الـ Blob
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    // نجهز الفورم داتا بنفس الاسم اللي الباك مستنيه
    const formData = new FormData();
    formData.append("image_file", file);

    const response = await fetch("http://127.0.0.1:8000/api/v1/analysis", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("API request failed");
    const data = await response.json();

    setAnalysisResult(data.respone);
    setIsModalOpen(true);
  } catch (error) {
    console.error("Error fetching analysis:", error);
  }
};


  // معالجة البحث
  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = [];
    if (image) {
      data = await fetchByImage(image);
    } else if (query.trim() !== "") {
      data = await fetchByText(query);
    } else {
      setLoading(false);
      return;
    }

    setRecommendations(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Logo + Title */}
      <div className="flex flex-col items-center mb-10">
        <FaRobot className="text-5xl text-blue-600 dark:text-blue-400 drop-shadow-lg mb-3" />
        <h1 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
          AI Recommendation System
        </h1>
      </div>

      {/* Search Bar + Upload */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 mb-10"
      >
        <input
          type="text"
          placeholder="Enter your search text..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setImage(null); }}
          className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => { setImage(e.target.files[0]); setQuery(""); }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Search
        </button>
      </form>

      {/* المحتوى */}
      {loading ? (
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading recommendations...</p>
      ) : recommendations.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {recommendations.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              {item.poster_path && (
                <img
                  src={`data:image/jpeg;base64,${item.poster_path}`}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {item.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
                {item.overview || "No description available."}
              </p>
              <button
                onClick={() => fetchAnalysis(item.poster_path)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                View More
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No results yet. Try searching.</p>
      )}

      {/* ✅ Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-3/4 max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              Image Analysis
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {analysisResult}
            </p>
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recommendations;
