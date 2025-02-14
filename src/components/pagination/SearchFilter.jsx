import React, { useState } from "react";

const SearchFilter = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Men's Clothing", "Women's Clothing", "Electronics", "Books"];

  const handleSearch = () => {
    onSearch(searchTerm, category);
  };

  return (
    <div className="flex items-center justify-center mt-6 space-x-2">
      

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search services..."
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
