import React from 'react';
import { FaSearch } from "react-icons/fa";

const Table = () => {
  return (
    <div className="flex-1 p-4 sm:p-6">
      {/* Search Bar */}
      <div className="relative w-full mb-7">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 p-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
        />
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-gray-700 bg-gray-200">
              <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">User Name</th>
              <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">Email</th>
              <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">Phone</th>
              <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample User Row */}
            <tr className="bg-blue-100 border-b text-sm sm:text-base">
              <td className="p-3">John Doe</td>
              <td className="p-3">john@example.com</td>
              <td className="p-3">+123456789</td>
              <td className="p-3">
                <button className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded">Block</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>    
  );
};

export default Table;
