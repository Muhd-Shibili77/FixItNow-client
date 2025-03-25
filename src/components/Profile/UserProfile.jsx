import React, { useEffect, useState } from 'react';
import { UserRound, Mail, Phone, Lock, PenLine, Check, X, Camera, ArrowLeft } from 'lucide-react';
import Image from '../../assets/boy.png'
import { useDispatch,useSelector } from 'react-redux';
import { fetchUserData,startEditing,cancelEditing,updateEditField,updateUserData } from '../../redux/userSlice';
import axiosInstance from '../../services/AxiosInstance';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserProfile = ({userId}) => {

  const dispatch = useDispatch()
  const {userData, editFormData,loading,error} = useSelector((state)=>state.user)
 
 
  useEffect(()=>{
    if(userId){
      dispatch(fetchUserData({userId}))
    }
  },[dispatch,userId])


  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [preview,setPreview] = useState(null)
  const [selectedFile,setSelectedFile] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file); 

      setPreview(imageUrl);
    }
  };
  


  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');


  const handleEdit = () => {
    setIsEditing(true);
    dispatch(startEditing())
  };

  const handleCancel = () => {
    setIsEditing(false);
    dispatch(cancelEditing())
  };

  const handleSave = async() => {

    let updatedProfileImage = editFormData?.profileImage;

    if(selectedFile){
      const formData  = new FormData()
      formData.append('file',selectedFile)

      try {
        const response = await axiosInstance.post('/user/upload',formData,{
          headers: { "Content-Type": "multipart/form-data" },
        })
        
        updatedProfileImage = response.data.url;
        
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error( "Error uploading file:",error);
        return;
     }

    }

    const updatedData = {
      ...editFormData,
      profileImage: updatedProfileImage,
    };


    dispatch(updateUserData({userId,formData:updatedData}))
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username" && value.startsWith(" ")) {
      toast.error("username is empty!");
      return;
    }
  
    
    if (name === "phone" && !/^\d*$/.test(value)) {
      toast.error("Phone number can only contain numbers.");
      return;
    }

    dispatch(updateEditField({field:name,value}))
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    
    // Validate passwords
    if (!strongPasswordRegex.test(passwordData.newPassword)) {
      setPasswordError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character!");
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    try {

      const response = await axiosInstance.patch(`/user/updatePassword?userId=${userId}`,passwordData,{
        headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
      })

      if (response.data.success) {
        setPasswordSuccess(response.data.message || "Password changed successfully!");
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
       
        setPasswordError(response.data.message || "Failed to update password");
      }

      
    } catch (error) {
      console.error("Error updating password:", error);
     
    if (error.response && error.response.data) {
      setPasswordError(error.response.data.message || "Password update failed");
    } else {
      setPasswordError("Network error. Please check your connection and try again.");
    }
      return;
   }
    
    
    // Here you would typically make an API call to update the password
   
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
  

  return (
    <div className=" min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-white  to-indigo-200">
            <div className="absolute -bottom-16 left-6 md:left-8">
              <div className="relative">
                {isEditing ?(
                    <> 
                     <label className="cursor-pointer">
                      <img 
                        src={editFormData?.profileImage || preview || Image} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                        
                      />
                    <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md cursor-pointer hover:bg-gray-100 transition">
                      <Camera size={16} className="text-gray-700" />
                    </div>
                    <input type="file" className='hidden' accept="image/*" onChange={handleImageChange} />
                  </label>
                  </>
                ):(
                  <> 
                    <img 
                      src={userData?.profileImage || Image} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                  </>
                )}
                
              </div>
            </div>
            {activeTab === 'password' && (
              <button 
                onClick={() => setActiveTab('profile')}
                className="absolute top-4 left-4 bg-white/30 backdrop-blur-sm rounded-full p-2 text-black cursor-pointer hover:bg-white/40 transition"
              >
                <ArrowLeft size={20} />
              </button>
            )}
          </div>
          
          {/* Profile Content */}
          <div className="pt-20 px-6 md:px-8 pb-8">
            {activeTab === 'profile' && (
              <>
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">{userData?.username}</h1>
                    <p className="text-gray-500">{userData?.email}</p>
                  </div>
                  {!isEditing ? (
                    <button 
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                    >
                      <PenLine size={16} />
                      <span className="hidden md:inline">Edit Profile</span>
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button 
                        onClick={handleCancel}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition"
                      >
                        <X size={16} />
                        <span className="hidden md:inline">Cancel</span>
                      </button>
                      <button 
                        onClick={handleSave}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition"
                      >
                        <Check size={16} />
                        <span className="hidden md:inline">Save</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {!isEditing ? (
                  <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            <UserRound size={20} className="text-indigo-600" />
                          </div>
                          <h3 className="font-medium text-gray-700">Full Name</h3>
                        </div>
                        <p className="text-gray-800 pl-10">{userData?.username}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            <Mail size={20} className="text-indigo-600" />
                          </div>
                          <h3 className="font-medium text-gray-700">Email</h3>
                        </div>
                        <p className="text-gray-800 pl-10">{userData?.email}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            <Phone size={20} className="text-indigo-600" />
                          </div>
                          <h3 className="font-medium text-gray-700">Phone</h3>
                        </div>
                        <p className="text-gray-800 pl-10">{userData?.phone || 'Not provided'}</p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-indigo-100 p-2 rounded-lg">
                            <Lock size={20} className="text-indigo-600" />
                          </div>
                          <h3 className="font-medium text-gray-700">Password</h3>
                        </div>
                        <button 
                          onClick={() => setActiveTab('password')}
                          className="text-indigo-600 hover:text-indigo-800 text-sm pl-10 transition cursor-pointer"
                        >
                          Change password
                        </button>
                      </div>
                    </div>
                    
                    
                  </div>
                ) : (
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
                        <input
                          type="text"
                          name="username"
                          value={editFormData?.username || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      
                     
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editFormData?.phone || ''}
                          placeholder='Enter your phone number'
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    
                  </form>
                )}
              </>
            )}
            
            {/* Password Change */}
            {activeTab === 'password' && (
              <div className="mt-4">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Change Your Password</h2>
                
                {passwordError && (
                  <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm">{passwordError}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {passwordSuccess && (
                  <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm">{passwordSuccess}</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <form onSubmit={handlePasswordSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Current Password</label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      required
                    />
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default UserProfile;