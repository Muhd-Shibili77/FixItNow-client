import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/SideBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ServiceButtonRight } from "../../components/button/ServiceButton";
import { FaSearch } from "react-icons/fa";
import Pagination from "../../components/pagination/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceDetails } from "../../redux/adminSlice";
import Button from "../../components/button/Button";
import axiosInstance from "../../services/AxiosInstance";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteService } from "../../redux/adminSlice";

const AdminServices = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [page, setPage] = useState(1);
  const [secondSearchTerm, setSecondSearchTerm] = useState(searchTerm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    image: null,
    preview: null,
    id: null,
    currentIcon: null
  });
  
  const { data, loading, error, totalPages } = useSelector(
    (state) => state.admin
  );

  useEffect(() => {
    dispatch(fetchServiceDetails({ searchTerm, page }));
  }, [dispatch, searchTerm, page]);

  // Refresh service list after updates
  const refreshServices = () => {
    dispatch(fetchServiceDetails({ searchTerm, page }));
  };

  const handleEdit = (service) => {
    setIsModalOpen(true);
    setIsEdit(true);
    setFormData({
      name: service.name,
      image: null,
      preview: service.icon, 
      id: service.id,
      currentIcon: service.icon
    });
  };
  
  const handleDelete = (service) => {
    confirmAlert({
      title: `Confirm ${service.isDelete ? "Restore" : "Delete"}`,
      message: `Are you sure you want to ${service.isDelete ? "Restore" : "Delete"} this service?`,
      buttons: [
        {
          label: "Yes",
          onClick: () =>
            dispatch(deleteService({serviceId: service.id, isDelete: service.isDelete}))
        },
        {
          label: "No",
        },
      ],
    });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      // Only upload to Cloudinary if there's a new image
      let iconUrl = formData.currentIcon;
      
      if (formData.image) {
        const uploadData = new FormData();
        uploadData.append("file", formData.image);
        
        try {
          const response = await axiosInstance.post("/service/upload", uploadData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          
          iconUrl = response.data.url;
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          toast.error("Error uploading image");
          setIsSubmitting(false);
          return;
        }
      }
      
      // Prepare data for service creation/update
      const serviceData = {
        name: formData.name,
        icon: iconUrl
      };
      
      // Determine endpoint based on whether we're editing or adding
      const endpoint = isEdit
        ? `/service/updateService?serviceId=${formData.id}`
        : "/service/addService";
      
      // Send the service data
      await axiosInstance.post(endpoint, serviceData);
      
      toast.success(isEdit ? "Service updated successfully!" : "Service added successfully!");
      
      // Reset form and close modal after a short delay
      setTimeout(() => {
        setFormData({ name: "", image: null, preview: null, id: null, currentIcon: null });
        setIsModalOpen(false);
        setIsEdit(false);
        refreshServices();
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200">
      <SideBar page="Services" />
      <div className="flex-1 p-4 md:ml-12 transition-all duration-300 sm:p-10">
        {/* Modal for adding/editing services */}
        {isModalOpen && (
          <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-transparent backdrop-blur-sm transition-all duration-300 ${
              isModalOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-80 pointer-events-none"
            }`}
          >
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
                onClick={() => {
                  setIsModalOpen(false);
                  setIsEdit(false);
                  setFormData({ name: "", image: null, preview: null, id: null, currentIcon: null });
                }}
                disabled={isSubmitting}
              >
                ✖
              </button>

              {/* Modal Title */}
              <h2 className="text-xl font-semibold text-center">
                {isEdit ? "Edit Service" : "Add Service"}
              </h2>

              <div className="flex justify-center items-center">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center gap-4 mb-8">
                      <label className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          name="image"
                          onChange={handleChange}
                          disabled={isSubmitting}
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
                      <h2 className="text-xl text-gray-800">Upload icon</h2>
                      
                    </div>

                    <div className="grid grid-cols-1 gap-6">
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
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    <div className="flex justify-center gap-3">
                      <Button
                        text={isSubmitting ? "Processing..." : (isEdit ? "Update" : "Add")}
                        color={isSubmitting ? "bg-gray-400" : "bg-indigo-400"}
                        hover={isSubmitting ? "bg-gray-400" : "bg-indigo-500"}
                        function={handleSubmit}
                        disabled={isSubmitting}
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


        <div className="flex items-center justify-between mb-8">
      
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
                  setSearchTerm(secondSearchTerm);
                }
              }}
            />
          </div>

        
          <button
            className="ml-4 bg-indigo-500 hover:bg-indigo-600 px-5 py-3 text-white font-semibold rounded-lg shadow-md transition cursor-pointer"
            onClick={() => {
              setIsModalOpen(true);
              setIsEdit(false);
              setFormData({ name: "", image: null, preview: null, id: null, currentIcon: null });
            }}
          >
            + Add Service
          </button>
        </div>

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
              data.map((service) => (
                <ServiceButtonRight
                  key={service.id}
                  image={service.icon}
                  name={service.name}
                  id={service.id}
                  isDelete={service.isDelete}
                  onEdit={() => handleEdit(service)}
                  onDelete={() => handleDelete(service)}
                  userType={"Admin"}
                />
              ))
            ) : (
              <h2 className="text-3xl font-bold text-center col-span-full text-red-500">
                No services available
              </h2>
            )}
          </div>
        )}

 
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