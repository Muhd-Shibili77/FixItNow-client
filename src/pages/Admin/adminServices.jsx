import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServiceButtonRight } from "../../components/button/ServiceButton";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Pagination from "../../components/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceDetails } from "../../redux/adminSlice";
import Button from "../../components/button/Button";
import axiosInstance from "../../services/AxiosInstance";

const AdminServices = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, SetIsModalOpen] = useState(false);
  const [isEdit,setIsEdit] =useState(false)
  const [secondSearchTerm, setSecondSearchTerm] = useState(searchTerm);
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    preview: null,
  });

  const handleEdit =(service)=>{
    
     SetIsModalOpen(true)
     setIsEdit(true)
  }

  const handleChange = (e) => {
    if (e.target.name === "image") {
      const file = e.target.files[0];
      if (file) {
        setFormData({
          ...formData,
          image: file,
          preview: URL.createObjectURL(file),
        });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const { data, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchServiceDetails({ searchTerm, page }));
  }, [dispatch, searchTerm, page]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axiosInstance.post(
        "/service/addService",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("service added successfully!");
      
      setTimeout(() => {
        setFormData({
          name: "",
          image: null,
          preview: null,
        });
        SetIsModalOpen(false);
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };


  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Services" />
      <div className="flex-1 p-4 md:ml-12 transition-all duration-300 sm:p-10">

        {/* _____________modal start_________________ */}

        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm transition-all duration-300 ${
              isModalOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-80 pointer-events-none"
            }`}
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
              {/* Close Button (X) in the top-right corner */}
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
                onClick={() => {
                  SetIsModalOpen(false)
                  setIsEdit(false)
                }}
              >
                ✖
              </button>

              {/* Modal Title */}
              <h2 className="text-xl font-semibold text-center">{isEdit?'Edit Service':'Add Service'}</h2>

              <div className="flex justify-center items-center ">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
                  <form className="space-y-6">
                    <div className="flex flex-col items-center gap-4 mb-8">
                      <label className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          name="image"
                          onChange={handleChange}
                        />
                        {formData.preview ? (
                          <img
                            src={formData.preview}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-full border"
                          />
                        ) : (
                          <span className="text-gray-500 absolute text-sm">
                            Preview
                          </span>
                        )}
                      </label>
                      <h2 className="text-xl  text-gray-800">Upload icon</h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-1  gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
                        />
                      </div>
                    </div>

                    <div className="flex justify-center gap-3">
                      
                      <Button
                        text={isEdit ? 'Submit':'Add'}
                        color="bg-indigo-400"
                        hover="bg-indigo-500"
                        function={handleSubmit}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar
            />
          </div>
        )}

        {/* _____________modal end_______________ */}

        {/* Search Bar and Add Service Button */}
        <div className="flex items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-3/5 lg:w-4/5">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 p-3 rounded-lg bg-white border border-gray-300 focus:outline-none"
              value={secondSearchTerm}
              onChange={(e) => setSecondSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setSearchTerm(e.target.value);
                }
              }}
            />
          </div>

          {/* Add Service Button - Placed on the Right */}
          <button
            className="ml-4 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 text-white font-semibold rounded-lg shadow-md transition cursor-pointer"
            onClick={() => SetIsModalOpen(true)}
          >
            + Add Service
          </button>
        </div>

        {/* Conditional Rendering for Loading, Error, and Data */}
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mb-10">
            {data && data.length > 0 ? (
              data?.map((service) => (
                <ServiceButtonRight
                  key={service.id}
                  image={service.icon}
                  name={service.name}
                  id={service.id}
                  handleFunction={handleEdit}
                />
              ))
            ) : (
              <h2 className="text-3xl font-bold text-center col-span-full text-red-500">
                No services available
              </h2>
            )}
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default AdminServices;
