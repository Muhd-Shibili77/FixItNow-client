import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Table from "../../components/table/Table";
import { useSelector, useDispatch } from "react-redux";
import { fetchFullWorkers,toggleBlockWorker } from "../../redux/adminSlice";

const AdminWorkers = () => {
  const dispatch = useDispatch();
  const { workers, error, loading,totalPages } = useSelector((state) => state.admin);
  
  const [searchTerm,setSearchTerm]=useState('')
  const [page,setPage]=useState(1)
  

  useEffect(() => {
    dispatch(fetchFullWorkers({searchTerm,page}));
  }, [dispatch,page,searchTerm]);


  const colums = [
    { header: "Workername", key: "name" },
    { header: "Service", key: "service" , render:(item)=>item.service?.name || "N/A" },
    { header: "Experience", key: "experience" },
    { header: "Phone", key: "phone" },
    { header: "Profit", key: "profit" },
  ];

  const actions = (item)=>{
    if(item.isBlock){
      return[
        {
          label:"Unblock",
          onClick:()=>dispatch(toggleBlockWorker({workerId:item.id,isBlocked:item.isBlock})),
          bgColor:'bg-green-600',
        }
      ]
    }else{
      return[
        {
          label:"Block",
          onClick:()=>dispatch(toggleBlockWorker({workerId:item.id,isBlocked:item.isBlock})),
          bgColor:'bg-red-600'
        }
      ]
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Workers" />

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
          data={workers} 
          actions={actions} 
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

export default AdminWorkers;
