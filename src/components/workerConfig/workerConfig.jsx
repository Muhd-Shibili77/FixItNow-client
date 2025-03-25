import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../button/Button";
import axios from "axios";
import { useNavigate,useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { loginWoker, unSetUser } from "../../redux/authSlice";
import { fetchFullService } from "../../redux/workerSlice";
import axiosInstance from "../../services/AxiosInstance";

function workerConfig() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { email, name } = state || {};
  const isGoogleRegistration = state ? true : false
  const { services:data, loading, error } = useSelector((state) => state.worker);
  const worker = useSelector((state) => state.auth.user || {});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name:  worker.Username || name || '',
    service: "",
    experience: "",
    phone: "",
    about: "",
    image: null,
    preview: null,
  });

  useEffect(() => {
   
    dispatch(fetchFullService());
  }, [dispatch]);

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

    const formDataToSend = new FormData();
    formDataToSend.append("service", formData.service);
    formDataToSend.append("experience", formData.experience);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("about", formData.about);

   
    if(formData.image){
      const imageFormData = new FormData();
      imageFormData.append("file", formData.image)
      try {
        const response = await axiosInstance.post('/user/upload',imageFormData,{
          headers: { "Content-Type": "multipart/form-data" },
        })
        
        formDataToSend.append("image", response.data.url);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error( "Error uploading file:",error);
        return;
     }
    }

    
    
   

    if(isGoogleRegistration){

      formDataToSend.append("username", name);
      formDataToSend.append("email", email);
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/google/register-worker",formDataToSend,
          {
            headers: { "Content-Type": "multipart/form-data" },
          });

        const Token = response?.data?.Token;

      localStorage.setItem("token", Token);

      toast.success("Worker registered with google  successfully!");
      dispatch(unSetUser());
      dispatch(loginWoker({ loginWoker: email }));

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } catch (error) {
          toast.error(error.response?.data?.message || "Something went wrong"); 
      }
      return;
    }

    formDataToSend.append("username", worker.Username);
    formDataToSend.append("email", worker.Email);
    formDataToSend.append("password", worker.Password);
    formDataToSend.append("conformpassword", worker.ConformPassword);

    try {
     

      const response = await axios.post(
        "http://localhost:3000/auth/worker-register",formDataToSend,{
          headers: { "Content-Type": "multipart/form-data" },
        });

      const Token = response?.data?.Token;

      localStorage.setItem("token", Token);

      toast.success("Worker registered successfully!");
      dispatch(unSetUser());
      dispatch(loginWoker({ loginWoker: worker.Email }));

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
      </div>
    );
  
  if (error)
    return <p className="text-red-500">Errorrr: {error}</p>;
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200 ">
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
                <span className="text-gray-500 absolute text-sm">Preview</span>
              )}
            </label>
            <h2 className="text-xl  text-gray-800">Upload your photo</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
              >
                <option>Select Role</option>
                <option value="">Select Role</option>
                {data?.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-5 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Years of experience
              </label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              About
            </label>
            <textarea
              rows="4"
              name="about"
              value={formData.about}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
            ></textarea>
          </div>
          <div className="flex justify-center gap-3">
            <Button
              text="submit"
              color="bg-indigo-400"
              hover="bg-indigo-500"
              function={handleSubmit}
            />
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
}

export default workerConfig;
