import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import Pagination from '../pagination/Pagination';

const Table = ({colums,data,actions,totalPages, searchTerm, setSearchTerm, page,setPage}) => {
  
  const [inputValue,setInputValue] = useState(searchTerm)
  
  

  return (
    <div className="flex-1 p-4 sm:p-6">
      {/* Search Bar */}
      <div className="relative w-full mb-7">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 p-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
          value={inputValue}
          onChange={(e)=>setInputValue(e.target.value)}
          onKeyDown={(e)=>{
            if(e.key === 'Enter'){
              setSearchTerm(inputValue)
              setPage(1)
            }
          }}
        />
      </div>

      {/* Table Wrapper */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-gray-700 bg-gray-200">
              {colums.map((items,index)=>(
                <th key={index} className="p-3 text-left text-sm sm:text-base whitespace-nowrap">{items.header}</th>
              ))}
               {actions && actions.length > 0 && <th className="p-3 text-left text-sm sm:text-base whitespace-nowrap">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {/* Sample User Row */}
            {data.length > 0 ? (
                data.map((items,Rowindex)=>(
                  <tr key={Rowindex} className="bg-blue-100 border-b text-sm sm:text-base">

                    {colums.map((col,Colindex)=>(
                      <td key={Colindex} className="p-3 text-left">
                        {col.render ? col.render(items) : items[col.key] || 'Nil'}
                      </td>
                    ))}

                    <td className="p-3 flex space-x-2">
                      {actions(items).map((action,actionIndex)=>(
                        <button key={actionIndex} className={`${action.bgColor} text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg cursor-pointer`} onClick={()=>action.onClick(items)}>{action.label}</button>
                      ))}
                    </td>
                  </tr>
                ))  
            ):(
              <tr>
                <td colSpan={colums.length + 1} className="p-5 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}  
            
          </tbody>
        </table>
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>    
  );
};

export default Table;
