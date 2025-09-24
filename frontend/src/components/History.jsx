// import { useState, useEffect } from "react";
// import { FaHistory } from "react-icons/fa";

// function History() {
//   const [history, setHistory] = useState([]);

//   // داتا تجريبية لسجل التوصيات
//   useEffect(() => {
//     const savedHistory = [
//       { id: 1, title: "Recommended Product A", score: 0.92, date: "2025-09-10" },
//       { id: 2, title: "Recommended Product B", score: 0.87, date: "2025-09-12" },
//       { id: 3, title: "Recommended Product C", score: 0.81, date: "2025-09-15" },
//     ];
//     setHistory(savedHistory);
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center py-20 px-6">
//       {/* Logo + Title */}
//     <div className="flex items-center gap-3 mb-10">
//   <FaHistory className="text-4xl text-blue-600 dark:text-blue-400 drop-shadow-lg" />
//   <h1 className="text-4xl font-bold text-gray-800 dark:text-blue-400">
//     Your History
//   </h1>
// </div>

//       {/* History Cards */}
//       {history.length === 0 ? (
//         <p className="text-lg text-gray-600 dark:text-gray-400">
//           No history found yet.
//         </p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
//           {history.map((item) => (
//             <div
//               key={item.id}
//               className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
//             >
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
//                 {item.title}
//               </h2>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
//                 Confidence Score:{" "}
//                 <span className="font-medium text-blue-600 dark:text-blue-400">
//                   {(item.score * 100).toFixed(1)}%
//                 </span>
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Date: {item.date}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default History;
