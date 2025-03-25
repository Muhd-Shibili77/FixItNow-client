import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import Table from "../../components/table/Table";
import { fetchFullBookings, toggleCancelBooking } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const AdminBookings = () => {
  const dispatch = useDispatch();
  const { bookings, error, loading, totalPages } = useSelector(
    (state) => state.admin
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null); // To store the selected booking for the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchFullBookings({ searchTerm, page }));
  }, [dispatch, page, searchTerm]);

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

  const colums = [
    { header: "Booking no", key: "bookingNo" },
    {
      header: "Worker name",
      key: "workerId",
      render: (item) => item.workerId?.username || "N/A",
    },
    {
      header: "User name",
      key: "userId",
      render: (item) => item.userId?.username || "N/A",
    },
    {
      header: "Status",
      key: "workStatus",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-lg text-center ${getStatusColor(
            item.workStatus
          )}`}
        >
          {item.workStatus}
        </span>
      ),
    },
    { header: "Amount(INR)", key: "amount" },
  ];

  const actions = (item) => {
    if (
      item.workStatus === "Cancelled" ||
      item.workStatus === "Completed" ||
      item.workStatus === "In Progress" ||
      item.workStatus === "Rejected"
    ) {
      return [
        {
          label: "Details",
          onClick: () => {
            setSelectedBooking(item);
            setIsModalOpen(true);
          },
          bgColor: "bg-blue-400",
        },
      ];
    } else {
      return [
        {
          label: "Cancel",
          onClick: () => {
            confirmAlert({
              title: "Confirm Cancellation",
              message: "Are you sure you want to cancel this booking?",
              buttons: [
                {
                  label: "Yes",
                  onClick: () =>
                    dispatch(toggleCancelBooking({ bookingId: item.id })),
                },
                {
                  label: "No",
                },
              ],
            });
          },
          bgColor: "bg-red-500",
        },
        {
          label: "Details",
          onClick: () => {
            setSelectedBooking(item);
            setIsModalOpen(true);
          },
          bgColor: "bg-blue-400",
        },
      ];
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedBooking(null); // Clear the selected booking
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Booking" />
      <div className="flex-1 p-4 md:ml-12 transition-all duration-300">
        {/* _____________modal start_________________ */}

        {isModalOpen && selectedBooking && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm transition-all duration-300 ${
              isModalOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-80 pointer-events-none"
            }`}
            onClick={closeModal}
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
              {/* Close Button (X) in the top-right corner */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
                onClick={closeModal}
              >
                ✖
              </button>

              {/* Modal Title */}
              <h2 className="text-xl font-semibold text-center">
                Booking Details
              </h2>
              <h4 className="text-md font-light text-center">
                <strong>BK No:</strong> {selectedBooking.bookingNo}
              </h4>
              <h4 className="text-md font-light mb-4 text-center">
                <strong>Date:</strong> {selectedBooking.placedAt}
              </h4>

              {/* Booking Details Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <p>
                    <strong>Worker Name:</strong>{" "}
                    {selectedBooking.workerId?.username || "N/A"}
                  </p>
                  <p>
                    <strong>Worker Phone:</strong>{" "}
                    {selectedBooking.workerId?.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Work Status:</strong> {selectedBooking.workStatus}
                  </p>
                  <p>
                    <strong>Reaching Status:</strong>{" "}
                    {selectedBooking.reachingStatus}
                  </p>

                  <p>
                    <strong>Amount:</strong> {selectedBooking.amount} INR
                  </p>
                </div>

                <div className="flex flex-col items-start text-left space-y-2">
                  <p>
                    <strong>User Name:</strong>{" "}
                    {selectedBooking.userId?.username || "N/A"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {selectedBooking.address?.city || "N/A"}
                  </p>
                  <p>
                    <strong>Booking Type:</strong>{" "}
                    {selectedBooking.bookingType || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* _____________modal end_______________ */}

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
            data={bookings}
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

export default AdminBookings;
