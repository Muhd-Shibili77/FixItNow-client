import React, { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");


  

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search. . ."
        className="px-4 py-2 w-60 rounded-lg border border-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
      >
        Search
      </button>
    </div>
  );
};

export default SearchFilter;
