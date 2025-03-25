import React, { useState } from "react";
import { useNavigate } from "react-router";
import OTP from "../../components/OTP/OTP";
import axiosInstance from "../../services/AxiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setUser } from "../../redux/authSlice";
import { useDispatch } from "react-redux";
const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [otpsent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleSentOtp = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post("/auth/sentOtp", {
        email: email,
      });
      dispatch(setUser({ user: { Email: email } }));
      toast.success("OTP sented to you email");
      setTimeout(() => {
        setOtpSent(true);
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const submitChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!strongPasswordRegex.test(password.newPassword)) {
       setPasswordError("Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character!");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      setPasswordError("New passwords don't match");
      return;
    }

    try {
      const response = await axiosInstance.patch("/auth/changePassword", {
        password,
        email,
      });

      if (response.data.success) {
        setPasswordSuccess(response.data.message || "Password changed successfully!");

        setTimeout(() => {
          navigate("/auth"); // Give the toast time to appear before navigation
        }, 2000);

        setPassword({
          newPassword: "",
          confirmPassword: "",
        });
        setEmail("");
      } else {
        setPasswordError(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Error changing password");
    }
  };

  const handleOTPVerification = () => {
    setOtpVerified(true);
  };
  return (
    <div>
      {!otpsent && (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-200 to-indigo-200">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full md:max-w-md max-w-90 text-center">
            <form onSubmit={handleSentOtp}>
              <h1 className="text-xl font-semibold mb-4">Enter your Email</h1>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button className="w-full mt-4 bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      {!otpVerified && otpsent && (
        <OTP forgetPassword={true} fn={handleOTPVerification} />
      )}
      {otpVerified && otpsent && (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-200 to-indigo-200">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full md:max-w-xl max-w-90 text-center">
            <form onSubmit={submitChangePassword}>
              <h1 className="text-xl font-semibold mb-9">
                change your password
              </h1>
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
              <input
                type="password"
                placeholder="new password"
                name="newPassword"
                value={password.newPassword}
                onChange={handleChangePassword}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-5"
              />
              <input
                type="password"
                placeholder="confirm password"
                name="confirmPassword"
                value={password.confirmPassword}
                onChange={handleChangePassword}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
              />
              <button className="w-full mt-4 bg-indigo-500 text-white font-semibold py-2 rounded-lg hover:bg-indigo-600 transition">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default ForgetPassword;
