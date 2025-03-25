import React, { useEffect,useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Table from "../../components/table/Table";
import { fetchFullUsers,toggleBlockUser } from "../../redux/adminSlice";
import { useDispatch,useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const adminUsers = () => {
  const dispatch = useDispatch()
  const {users,error,loading,totalPages} = useSelector((state)=>state.admin)
  const [searchTerm, setSearchTerm] = useState("");
  const [page,setPage] = useState(1)

  

  useEffect(()=>{
    dispatch(fetchFullUsers({searchTerm,page}))
  },[dispatch,page,searchTerm])

  const colums = [
    { header: "Username", key: "username" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone" },
  ];
 

  const actions = (item)=>{
    if(item.isBlock){
      return[
        {
          label:"Unblock",
          onClick:()=>{
            confirmAlert({
              title:'Confrim unblock',
              message:'Are you sure you want to unblock this user?',
              buttons:[
                {
                  label:'Yes',
                  onClick:()=>dispatch(toggleBlockUser({ userId: item.id, isBlocked: item.isBlock }))
                },
                {
                  label:'No'
                }
              ]
            })
          },
          bgColor:'bg-green-600',
        }
      ]
    }else{
      return[
        {
          label:"Block",
          onClick:()=>{
            confirmAlert({
              title:'Confrim block',
              message:'Are you sure you want to block this user?',
              buttons:[
                {
                  label:'Yes',
                  onClick:()=>dispatch(toggleBlockUser({ userId: item.id, isBlocked: item.isBlock }))
                },
                {
                  label:'No'
                }
              ]
            })
          },
          bgColor:'bg-red-600'
        }
      ]
    }
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Users" />

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
           data={users} 
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

export default adminUsers;
