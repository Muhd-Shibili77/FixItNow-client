import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from '../../assets/boy.png'
import { fetchWorkerJob } from "../../redux/workerSlice";
import { updateJobStatus } from "../../redux/workerSlice";
const JobList = () => {
  const dispatch = useDispatch();
    const { job:works, loading, error } = useSelector((state) => state.worker);
    
    const worker = useSelector((state) => state.auth.loginWoker);
 
    const userId = worker?.userId;
    
    useEffect(()=>{
        if(userId){
            dispatch(fetchWorkerJob(userId))
        }
    },[dispatch,userId])

    const handleJobAction = (jobId, isAccepted) => {
     dispatch(updateJobStatus({ jobId, isAccepted }));
     dispatch(fetchWorkerJob(userId));

   };

      if (loading)
        return (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
          </div>
        );
      
      if (error)
        return <p className="text-red-500">Error: {error}</p>;
      
      if (!worker) return null;

  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray-200  rounded-xl shadow-md p-10">
          {works && works.length > 0 ? (
            works?.map((data) => (
              <div
              className={`p-4 rounded-xl shadow-md w-90 md:w-75  cursor-pointer flex flex-col gap-4 
                ${data.workStatus === 'Rejected' ? 'bg-red-300 text-white' : 'bg-white'}`}
              
                key={data.id}
              >
               
                <div className="flex items-center gap-4">
                
                  <div className="w-26 h-26 overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt="sample"
                      className="w-full h-full object-cover"
                    />
                  </div>

                 
                  <div className="flex flex-col flex-grow">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Name:</span> {data.userId.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Phone:</span> {data.address.phone}
                    </p>
                  </div>
                </div>
                {data.workStatus === 'Rejected' ? (
                    <h1 className="text-2xl font-bold text-black">Rejected</h1>
                ):(

data.isAccepted ? (
       
    <div className="grid grid-cols-2 gap-3">
      <div className="p-2 bg-gray-100 rounded-md text-center">
        <p className="text-xs font-bold text-gray-700">
          Estimate Time
        </p>
        <p className="text-sm text-gray-400">00:00</p>
      </div>
      <div className="p-2 bg-gray-100 rounded-md text-center">
        <p className="text-xs font-semibold text-gray-700">Work</p>
        <p className="text-sm">{data.workStatus}</p>
      </div>
      <div className="p-2 bg-gray-100 rounded-md text-center">
        <p className="text-xs font-semibold text-gray-700">
          Status
        </p>
        <p className="text-sm">{data.reachingStatus}</p>
      </div>
      <div className="p-2 bg-gray-100 rounded-md text-center">
        <p className="text-xs font-semibold text-gray-700">
          Amount
        </p>
        <p className="text-sm text-gray-400">INR 0.00</p>
      </div>
    </div>
    ) : (
        <div className="flex gap-2 mt-2">
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => handleJobAction(data.id, true)}
          >
            Accept
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => handleJobAction(data.id, false)}
          >
            Reject
          </button>
        </div>
        )

                )}
                
              </div>
            ))
          ) : (
            <h2 className="text-3xl font-bold text-center col-span-full text-red-500">
              No jobs available
            </h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobList;
