import React, { useEffect } from 'react';
import SideBar from '../../components/sidebar/SideBar';
import LineChart from '../../components/chart/LineChart';
import { fetchDashBoardDetails } from '../../redux/adminSlice';
import { useDispatch,useSelector } from 'react-redux';

function AdminDashboard() {
  const dispatch = useDispatch()
  const { dash } = useSelector((state)=>state.admin)
  

  useEffect(()=>{
    dispatch(fetchDashBoardDetails())
  },[dispatch])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Dashboard" />
      
      <div className="flex-1 p-4 md:ml-12 transition-all duration-300 mt-5">
        {/* Cards Section */}
        <div className="flex flex-wrap gap-7 mb-7">
         
            <div className="bg-white w-[17rem] h-[10rem] rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              <h1 className="font-bold text-lg text-gray-800">Total Services</h1>
              <h2 className="font-medium text-lg text-gray-500 mt-2">{dash?.totalServices || '0'}</h2>
            </div>
            <div className="bg-white w-[17rem] h-[10rem] rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              <h1 className="font-bold text-lg text-gray-800">Today Services</h1>
              <h2 className="font-medium text-lg text-gray-500 mt-2">{dash?.todayServices || '0'}</h2>
            </div>
            <div className="bg-white w-[17rem] h-[10rem] rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              <h1 className="font-bold text-lg text-gray-800">Service Completed</h1>
              <h2 className="font-medium text-lg text-gray-500 mt-2">{dash?.serviceCompleted || '0'}</h2>
            </div>
            <div className="bg-white w-[17rem] h-[10rem] rounded-lg shadow-md flex flex-col items-center justify-center p-4">
              <h1 className="font-bold text-lg text-gray-800">Service Pending</h1>
              <h2 className="font-medium text-lg text-gray-500 mt-2">{dash?.servicePending || '0'}</h2>
            </div>
        </div>

        {/* Line Chart */}
        <div className="flex gap-15">
          <div className="bg-white p-10 rounded-lg shadow-md w-218 ">
            <LineChart />
          </div>
          <div className="flex flex-col gap-5">
              <div  className="bg-white w-[15rem] h-[9rem] rounded-lg shadow-md flex flex-col items-center justify-center p-3">
                <h1 className="font-bold text-lg text-gray-800">Yearly Breakup</h1>
                <h2 className="font-medium text-lg text-gray-500 mt-2">INR {dash?.yearlyBreakup?.toFixed(2) || 0.00}</h2>
              </div>
              <div  className="bg-white w-[15rem] h-[9rem] rounded-lg shadow-md flex flex-col items-center justify-center p-3">
                <h1 className="font-bold text-lg text-gray-800">Monthly Earnings</h1>
                <h2 className="font-medium text-lg text-gray-500 mt-2">INR {dash?.monthly?.toFixed(2) || 0.00}</h2>
              </div>
              <div  className="bg-white w-[15rem] h-[9rem] rounded-lg shadow-md flex flex-col items-center justify-center p-3">
                <h2 className="font-bold text-lg text-gray-800">Todays Earnings</h2>
                <h3 className="font-medium text-lg text-gray-500 mt-2">INR {dash?.todays?.toFixed(2) || 0.00}</h3>
              </div>
              
          </div>

        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;
