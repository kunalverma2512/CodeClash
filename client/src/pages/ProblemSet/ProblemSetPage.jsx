// src/pages/ProblemSetPage.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/ProblemSet/SearchBar";
import ProblemList from "../../components/ProblemSet/ProblemList";
import Pagination from "../../components/ProblemSet/Pagination";
import LoadingScreen from "../../components/UI/LoadingScreen";
import { fetchCodeforcesProblems } from "../../services/api";

const ProblemSetPage = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isProblemsArrived, setIsProblemArrived] = useState(false);

  const PAGE_SIZE = 40;

  useEffect(() => {
    const fetchProblems = async () => {
      const allProblems = await fetchCodeforcesProblems();
      setProblems(allProblems);
      setIsProblemArrived(true);
      setTotalPages(Math.ceil(allProblems.length / PAGE_SIZE));
    };
    fetchProblems();
  }, []);

  const handleSearch = (query) => {
    const q = query.toLowerCase().trim();
    if (q === "") {
      setFilteredProblems([]);
      setCurrentPage(1);
      setTotalPages(Math.ceil(problems.length / PAGE_SIZE));
      return;
    }

    const filtered = problems.filter((problem) => {
      const nameMatch = problem.name?.toLowerCase().includes(q);
      const tagMatch = problem.tags?.some((tag) => tag.toLowerCase().includes(q));
      const ratingMatch = problem.rating?.toString().includes(q);
      return nameMatch || tagMatch || ratingMatch;
    });

    setFilteredProblems(filtered);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
  };

  const displayedProblems = (filteredProblems.length > 0 ? filteredProblems : problems).slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-100">
          Codeforces Problem Set
        </h1>

        <SearchBar onSearch={handleSearch} />

        {isProblemsArrived ? (
          <ProblemList problems={displayedProblems} />
        ) : (
          <LoadingScreen />
        )}

        {isProblemsArrived && displayedProblems.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No problems found. Please try a different search.
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </main>
  );
};

export default ProblemSetPage;









































// import React, { useEffect, useState } from "react";
// import SearchBar from "../../components/ProblemSet/SearchBar";
// import { fetchCodeforcesProblems } from "../../utils/fetchCodeforcesAPI";
// import ProblemList from "../../components/ProblemSet/ProblemList";
// import Pagination from "../../components/ProblemSet/Pagination";
// import LoadingScreen from "../../components/UI/LoadingScreen";

// const ProblemSetPage = () => {
//   const [problems, setProblems] = useState([]);
//   const [filteredProblems, setFilteredProblems] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [isProblemsArrived, setIsProblemArrived] = useState(false);

//   useEffect(() => {
//     const fetchProblem = async () => {
//       const response = await fetchCodeforcesProblems(currentPage);
//       if (response) {
//         setIsProblemArrived(true);
//       }
//       setProblems(response.problems);
//       setTotalPages(Math.ceil(response.count / 40));
//     };
//     fetchProblem();
//   }, [currentPage]);

//   const handleSearch = (query) => {
//     console.log(query);
    
//     if (query.trim() === "") {
//       setFilteredProblems([]);
//       return;
//     }
//     const filtered = problems.filter((problem) => {
//       return problem.name.toLowerCase().includes(query.toLowerCase());
//     });
//     setFilteredProblems(filtered);
    
    
    
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <h1 className="text-5xl text-center p-2">Problem Set</h1>
//       <SearchBar onSearch={handleSearch} />
//       {isProblemsArrived ? (
//         <ProblemList
//           problems={filteredProblems.length > 0 ? filteredProblems : problems}
//         />
//       ) : (
//         <LoadingScreen />
//       )}

//       {filteredProblems.length === 0 && problems.length === 0 && (
//         <div className="text-center text-gray-500 absolute inset-0 flex items-center justify-center">
//           No problems found. Please try a different search.
//         </div>
//       )}

//       <Pagination
//         currentPage={currentPage}
//         totalPages={totalPages}
//         onPageChange={(page) => {
//           setCurrentPage(page);
//           setIsProblemArrived(false);
//         }}
//       />
//     </div>
//   );
// };

// export default ProblemSetPage;
