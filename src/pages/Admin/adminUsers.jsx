import React from 'react';
import SideBar from '../../components/sidebar/SideBar';
import Table from '../../components/table/Table';

const adminUsers = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
         <SideBar page="Users" />
    
    <div className="flex-1 p-4 md:ml-12 transition-all duration-300">
          <Table />
    </div>
  </div>
  )
}

export default adminUsers