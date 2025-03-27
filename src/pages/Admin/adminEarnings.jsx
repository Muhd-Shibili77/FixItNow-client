import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Table from "../../components/table/Table";
import { useDispatch, useSelector } from "react-redux";

const adminEarnings = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
 const [searchTerm, setSearchTerm] = useState("");


  const colums = [
    { header: "Booking No", key: "bookingNo" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
    { header: "Amount", key: "phone" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Earnings" />
      <div className="flex-1 p-4 md:ml-12 transition-all duration-300">
        {loading ? (

          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
          </div>

        ) : error ? (

          <p className="text-red-500">{error}</p>
        ) : (

          <Table 
          colums={colums}
          totalPages={totalPages} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        page={page}
        setPage={setPage}  
          />

        )}
      </div>
    </div>
  );
};

export default adminEarnings;
