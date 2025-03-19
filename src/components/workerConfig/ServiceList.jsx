import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import image from "../../assets/boy.png";
import {
  fetchWorkerJob,
  updateJobStatus,
  toggleReachStatus,
  toggleWorkStatus,
  updateAmount,
} from "../../redux/workerSlice";
import { TbBrandCashapp } from "react-icons/tb";
import { IoLocationOutline } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { useNavigate } from "react-router";


const JobList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [openedWorkDropdownId, setOpenedWorkDropdownId] = useState(null);
  const [openedReachDropdownId, setOpenedReachDropdownId] = useState(null);
  const [isAmountModal, setIsAmountModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [amount, setAmount] = useState(0);
  const { job: works, loading, error } = useSelector((state) => state.worker);

  const worker = useSelector((state) => state.auth.loginWoker);

  const userId = worker?.userId;

  useEffect(() => {
    if (userId) {
      dispatch(fetchWorkerJob(userId));
    }
  }, [dispatch, userId]);

  const handleJobAction = (jobId, isAccepted) => {
    dispatch(updateJobStatus({ jobId, isAccepted }));
  };
  const handleReachStatus = (bookingId, reachStatus) => {
    dispatch(toggleReachStatus({ bookingId, reachStatus }));
    setTimeout(() => {
      setOpenedReachDropdownId(null);
    }, 1000);
  };
  const handleWorkStatus = (bookingId, workStatus) => {
    dispatch(toggleWorkStatus({ bookingId, workStatus }));
    setTimeout(() => {
      setOpenedWorkDropdownId(null);
    }, 1000);
  };

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setIsAmountModal(true);
  };
  const handleCloseModal = () => {
    setSelectedBooking(null);
    setAmount(0);
    setIsAmountModal(false);
  };

  const handleSetAmount = (bookingId) => {
    if (amount === 0) {
      return;
    }
    console.log(amount);
    dispatch(updateAmount({ bookingId, amount }));
    setTimeout(() => {
      handleCloseModal();
    }, 1000);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;

  const getStatusColor = (status) => {
    switch (status) {
      case "Requested":
        return "bg-orange-500 text-white";
      case "Pending":
        return "bg-amber-400 text-white";
      case "In Progress":
        return "bg-blue-500 text-white";
      case "Completed":
        return "bg-green-500 text-white";
      case "Rejected":
        return "bg-red-600 text-white";
      case "Cancelled":
        return "bg-red-400 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getReachingStatusColor = (status) => {
    switch (status) {
      case "notStarted":
        return "bg-gray-400 text-white";
      case "onTheWay":
        return "bg-yellow-500 text-black";
      case "arrived":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const workerStatus = ["Pending", "In Progress", "Completed", "Cancelled"];
  const reachingStatus = ["notStarted", "onTheWay", "arrived"];



  const handleTrack = (bookingId)=>{
      navigate(`/track/${bookingId}`)
  }
  return (
    <section className="py-12 bg-transparent">
      <div className="max-w-7xl mx-auto   px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 bg-gray-200  mt-25 rounded-xl shadow-md p-10 ">
          {works && works.length > 0 ? (
            works?.map((data) => (
              <div
                className={`p-4 rounded-xl shadow-md w-90 md:w-85  flex flex-col gap-4 bg-white transition-all duration-300 hover:shadow-lg hover:scale-102`}
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
                      <span className="font-semibold">Name:</span>{" "}
                      {data?.userId?.username}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Phone:</span>{" "}
                      {data?.address?.phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Place:</span>{" "}
                      {data?.address?.city},{data?.address?.state}
                    </p>
                    {data.bookingType === "schedule" && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Scheduled:</span>{" "}
                        {new Date(data.date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                {data.workStatus === "Rejected" ? (
                  <h1 className="text-2xl font-medium text-black bg-red-500 rounded-4xl w-45 ml-10   flex items-center justify-center mt-9">
                    <span
                      className={`text-sm px-3 py-1 rounded-lg cursor-default bg-red-500}`}
                    >
                      Rejected
                    </span>
                  </h1>
                ) : data.isAccepted ? (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2 bg-gray-100 rounded-md text-center">
                      <p className="text-xs font-bold text-gray-700">
                        Booking No
                      </p>
                      <p className="text-sm text-gray-400">{data.bookingNo}</p>
                    </div>

                    <div className="relative inline-block text-center">
                      <div className="p-2 bg-gray-100 rounded-md">
                        <p className="text-xs font-semibold text-gray-700">
                          Work
                        </p>
                        <span
                          className={`text-sm px-3 py-1 rounded-lg cursor-pointer ${getStatusColor(
                            data.workStatus
                          )}`}
                          onClick={() =>{
                            setOpenedWorkDropdownId(
                              openedWorkDropdownId === data.id ? null : data.id
                            )
                            setOpenedReachDropdownId(null)
                          }}
                        >
                          {data.workStatus}
                        </span>
                      </div>

                      {openedWorkDropdownId == data.id && !data.paymentStatus ? (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-32 z-10">
                          {workerStatus
                            .filter((status) => status !== data.workStatus)
                            .map((status, index) => (
                              <div
                                key={index}
                                className={`px-3 py-2 text-sm hover:bg-gray-200  cursor-pointer`}
                              >
                                <span
                                  className={`text-sm px-3 py-1 rounded-lg  ${getStatusColor(
                                    status
                                  )}`}
                                  onClick={() =>
                                    handleWorkStatus(data.id, status)
                                  }
                                >
                                  {status}
                                </span>
                              </div>
                            ))}
                        </div>
                      ):(null)}
                    </div>

                    <div className="relative inline-block text-center">
                      <div className="p-2 bg-gray-100 rounded-md">
                        <p className="text-xs font-semibold text-gray-700">
                          Status
                        </p>
                        <span
                          className={`text-sm px-3 py-1 rounded-lg cursor-pointer ${getReachingStatusColor(
                            data.reachingStatus
                          )}`}
                          onClick={() =>{
                            setOpenedReachDropdownId(
                              openedReachDropdownId === data.id ? null : data.id
                            )
                            setOpenedWorkDropdownId(null)
                          }} 
                        >
                          {data.reachingStatus}
                        </span>
                      </div>

                    {openedReachDropdownId === data.id && !data.paymentStatus ? (
                        <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg w-32 z-10">
                          {reachingStatus
                            .filter((status) => status !== data.reachingStatus)
                            .map((status, index) => (
                              <div
                                key={index}
                                className={`px-3 py-2 text-sm hover:bg-gray-200  cursor-pointer`}
                              >
                                <span
                                  className={`text-sm px-3 py-1 rounded-lg  ${getReachingStatusColor(
                                    status
                                  )}`}
                                  onClick={() =>
                                    handleReachStatus(data.id, status)
                                  }
                                >
                                  {status}
                                </span>
                              </div>
                            ))}
                        </div>
                      ):(null)}
                    </div>

                    <div className="p-2 bg-gray-100 rounded-md text-center">
                      <p className="text-xs font-semibold text-gray-700">
                        Amount
                      </p>
                      <p className="text-sm flex justify-center text-gray-400">
                        INR {data.amount == null ? "0.00" : data.amount}
                        {data.paymentStatus==true ? <IoCheckmarkDoneCircle size={20} className="text-green-700" /> : null}
                      </p>
                    </div>

                    {data.workStatus === "Completed" &&
                    data.reachingStatus === "arrived" &&
                    data.amount == null ? (
                      <button
                        className="bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer ml-20 w-25 flex justify-center py-1"
                        onClick={() => handleOpenModal(data)}
                      >
                        <TbBrandCashapp size={22} />
                        Amount
                      </button>
                    ) : data.reachingStatus !== "arrived" &&
                      data.workStatus !== "Cancelled" ? (
                      <button className="bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer ml-25 w-25 flex justify-center py-1"
                      onClick={()=>handleTrack(data.id)}
                      >
                        <IoLocationOutline size={22} />
                        Track
                      </button>
                    ) : null}
                  </div>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
                      onClick={() => handleJobAction(data.id, true)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer"
                      onClick={() => handleJobAction(data.id, false)}
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <h2 className="text-2xl font-bold text-center col-span-full text-gray-700 ">
              No job requests available at the moment.
            </h2>
          )}
        </div>

        {isAmountModal && selectedBooking && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm transition-all duration-300 ${
              isAmountModal
                ? "opacity-100 scale-100"
                : "opacity-0 scale-80 pointer-events-none"
            }`}
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
              {/* Close Button (X) in the top-right corner */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
                onClick={handleCloseModal}
              >
                ✖
              </button>

              {/* Modal Title */}
              <h2 className="text-xl font-semibold text-center">
                Amount Details
              </h2>

              {selectedBooking && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">Work Status:</p>
                      <p>{selectedBooking.workStatus}</p>
                    </div>
                    <div>
                      <p className="font-medium">Reaching Status:</p>
                      <p>{selectedBooking.reachingStatus}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block font-medium mb-2">
                      Enter Amount (INR):
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                        placeholder="Enter amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </label>
                  </div>

                  <button
                    className="w-full bg-indigo-400 text-white py-2 rounded-md hover:bg-indigo-500"
                    onClick={() => handleSetAmount(selectedBooking.id)}
                  >
                    Submit Amount
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobList;
