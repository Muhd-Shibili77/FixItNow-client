import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkerDetails } from "../../redux/workerSlice";
import { loginWoker } from "../../redux/authSlice";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import { Lock } from 'lucide-react';
import axiosInstance from "../../services/AxiosInstance";

function workerProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const workerId = useSelector((state) => state.auth.loginWoker?.userId);
  const [changePassword, setChangePassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate passwords
    if (!strongPasswordRegex.test(passwordData.newPassword)) {
      setPasswordError(
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character!"
      );
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }
    try {
      const response = await axiosInstance.patch(
        `/worker/updatePassword?userId=${workerId}`,
        passwordData
      );

      if (response.data.success) {
        setPasswordSuccess(
          response.data.message || "Password changed successfully!"
        );
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        setPasswordError(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);

      if (error.response && error.response.data) {
        setPasswordError(
          error.response.data.message || "Password update failed"
        );
      } else {
        setPasswordError(
          "Network error. Please check your connection and try again."
        );
      }
      return;
    }
  };
  const { data: worker, loading, error } = useSelector((state) => state.worker);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        dispatch(loginWoker(decodedUser));
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  useEffect(() => {
    if (workerId) {
      dispatch(fetchWorkerDetails(workerId));
    }
  }, [dispatch, workerId]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
      </div>
    );

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:max-w-2xl max-w-90  text-center relative mb-4">
        {/* Edit Icon */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer z-10"
          onClick={handleEditProfile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-7 h-7 transform hover:scale-110 transition-all duration-200 ease-in-out"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182l-11.25 11.25-4.432 1.25 1.25-4.432 11.25-11.25z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 13.5V21H3.75A.75.75 0 0 1 3 20.25v-2.25"
            />
          </svg>
        </button>

        <div className="relative">
          <img
            className="w-35 h-35 mx-auto rounded-full border-3 border-white -mt-20 shadow-md"
            src={worker?.profileImage}
            alt="Profile"
          />
        </div>

        <h2 className="text-3xl font-semibold mt-6">{worker?.username}</h2>
        <p className="text-gray-600">{worker?.service?.name}</p>
        <p className="text-gray-600">{worker?.experience} yrs experience</p>
        <p className="text-gray-800 font-semibold mt-2">{worker?.phone}</p>
        <p className="text-gray-500 text-s mt-4 break-words">{worker?.about}</p>

        <div className="bg-gray-50 p-4 rounded-xl">
          
          <button
            onClick={() => setChangePassword(!changePassword)}
            className="text-indigo-600 hover:text-indigo-800 text-sm transition cursor-pointer"
          >
            Change password
          </button>
        </div>
      </div>

      {changePassword && (
      <div className="bg-white shadow-lg rounded-lg p-6 w-full md:max-w-2xl max-w-90  text-center relative">
        <h2 className="text-xl font-semibold mb-6">change Password</h2>
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

        <form onSubmit={handlePasswordSubmit}>
          <div className="mb-5">
            <input
              type="password"
              name="currentPassword"
              placeholder="current password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="newPassword"
              placeholder="new password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
            />
          </div>
          <div className="mb-5">
            <input
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className={`w-full max-w-50 bg-indigo-400 text-white py-3 px-4 rounded-lg hover:bg-indigo-500 transition-colors`}
            >
              submit
            </button>
          </div>
        </form>
      </div>
      )}

    </div>
  );
}

export default workerProfile;
