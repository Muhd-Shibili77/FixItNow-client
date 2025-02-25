import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-l-lg bg-indigo-300 text-indigo-800 font-semibold hover:bg-indigo-400 transition 
          ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 mx-1 rounded-md font-semibold ${
              currentPage === page
                ? "bg-indigo-600 text-white"
                : "bg-indigo-200 text-indigo-800 hover:bg-indigo-400 transition"
            }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-r-lg bg-indigo-300 text-indigo-800 font-semibold hover:bg-indigo-400 transition 
          ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
