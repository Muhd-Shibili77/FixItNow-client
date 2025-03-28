import { useEffect, useState } from "react";
import logo from "../../assets/maintenance.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { logout } from "../../redux/authSlice";
import { Bell, X } from "lucide-react";
import { socket } from "../../services/socket";


const Navbar = ({userId}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const user = useSelector((state) => state.auth.loginUser);
  const worker = useSelector((state) => state.auth.loginWoker);
  const [notifications, setNotifications] = useState([]);
  
    // Mock notifications (replace with actual notification logic)
    const notification = [
      { id: 1, message: "New service booking received", time: "2 mins ago" },
      { id: 2, message: "Payment processed successfully", time: "1 hour ago" },
      { id: 3, message: "Profile updated", time: "3 hours ago" }
    ];

    useEffect(() => {
      if (userId) {
        socket.emit("joinRoom", userId);
      }
    }, [userId]);

    console.log("notifications",notifications)

    useEffect(()=>{
      socket.emit("getNotifications", userId, (data) => {
        setNotifications(data);
      });
      socket.on("notificationListUpdated", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev]);
      });

    },[userId])


  const isActiveDesktop = (path) =>
    location.pathname === path
      ? "rounded-[30px_20px_12px_20px] bg-indigo-300"
      : "";
  const isActiveMobile = (path) =>
    location.pathname === path ? "text-indigo-600" : "";

  const handleNavigation = (path) => {
    navigate(path);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 flex items-center justify-center  z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                Logout Confirmation
              </h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to logout?
              </p>
              <div className="flex justify-center mt-5 gap-4">
                <button
                  onClick={() => {
                    if (user) {
                      dispatch(logout());
                    } else {
                      dispatch(logout());
                    }
                    setTimeout(() => {
                      navigate("/");
                      onClose();
                    }, 1000);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                >
                  Yes, Logout
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  const handleProfile = () => {
    if (user) {
      navigate("/personal-info");
    }
    if (worker) {
      navigate("/profile");
    }
  };

  const handleLoginBtn = () => {
    navigate("/auth");
  };
  return (
    <nav className="flex justify-between items-center p-4 md:p-6 bg-light relative">
      <div className="flex items-center space-x-2 text-xl font-semibold">
        <img
          className="w-10 h-10 object-contain"
          src={logo}
          alt="FixItNow Logo"
        />
        <span>FixItNow</span>
      </div>

      {/* Desktop Navigation */}
      {user ? (
        <div className="hidden lg:flex space-x-4">
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700 cursor-pointer ${isActiveDesktop(
              "/home"
            )}`}
            onClick={() => handleNavigation("/home")}
          >
            Home
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700 cursor-pointer ${isActiveDesktop(
              "/services"
            )}`}
            onClick={() => handleNavigation("/services")}
          >
            Services
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700 cursor-pointer ${isActiveDesktop(
              "/booking"
            )}`}
            onClick={() => handleNavigation("/booking")}
          >
            Bookings
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700 cursor-pointer ${isActiveDesktop(
              "/about"
            )}`}
            onClick={() => handleNavigation("/about")}
          >
            About Us
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700 cursor-pointer ${isActiveDesktop(
              "/contact"
            )}`}
            onClick={() => handleNavigation("/contact")}
          >
            Contact Us
          </a>
        </div>
      ) : worker ? (
        <div className="hidden lg:flex space-x-4">
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 ${isActiveDesktop(
              "/dashboard"
            )}`}
            onClick={() => handleNavigation("/dashboard")}
          >
            Home
          </a>
          {/* <a  className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 ${isActiveDesktop('/history')}`} onClick={()=>handleNavigation('/history')}>History</a> */}
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 ${isActiveDesktop(
              "/wallet"
            )}`}
            onClick={() => handleNavigation("/wallet")}
          >
            Wallet
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 ${isActiveDesktop(
              "/about"
            )}`}
            onClick={() => handleNavigation("/about")}
          >
            About Us
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 ${isActiveDesktop(
              "/contact"
            )}`}
            onClick={() => handleNavigation("/contact")}
          >
            Contact Us
          </a>
        </div>
      ) : (
        <div className="hidden lg:flex space-x-4">
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 rounded-[30px_20px_12px_20px] bg-indigo-300`}
            onClick={handleLoginBtn}
          >
            Home
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700`}
            onClick={handleLoginBtn}
          >
            Services
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 `}
            onClick={handleLoginBtn}
          >
            Bookings
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 `}
            onClick={handleLoginBtn}
          >
            About Us
          </a>
          <a
            className={`text-dark px-4 py-2 transition-colors duration-300 cursor-pointer hover:text-gray-700 `}
            onClick={handleLoginBtn}
          >
            Contact Us
          </a>

          <div className="relative">
          <button 
            onClick={toggleNotifications}
            className="relative p-2 rounded-full hover:bg-indigo-100 transition"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notification.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {notification.length}
              </span>
            )}
          </button>

          {isNotificationOpen && (

            <div className="absolute top-full right-0 mt-4 w-100 bg-indigo-100 rounded-lg shadow-lg border-0 z-10">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="text-lg font-semibold">Notifications</h3>
                <button 
                  onClick={toggleNotifications}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {notification.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                No notifications
                </div>
              ):(
                <div className="max-h-64 overflow-y-auto">
                  {notification.map((notification) => (
                    <div 
                      key={notification.id} 
                      className="p-4 border-b hover:bg-indigo-200 transition"
                    >
                      <div className="flex justify-between">
                        <p className="text-sm">{notification.message}</p>
                        <span className="text-xs text-gray-500">
                          {notification.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
               <div className="p-4 border-t text-center">
               <button 
                  className="text-sm text-indigo-600 hover:text-indigo-800"
                  onClick={() => {
                    // Handle clear all notifications
                    toggleNotifications();
                  }}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
          
          </div>
        </div>
      )}

      {user || worker ? (
        <>
          {location.pathname === "/profile" ||
          location.pathname === "/personal-info" ? (
            <button
              className="hidden px-4 py-2 lg:flex bg-red-900 text-white rounded-[30px_20px_12px_20px] cursor-pointer"
              onClick={handleLogout}
            >
              <span>Logout</span>
            </button>
          ) : (
            <button
              className="hidden px-4 py-2 lg:flex bg-gray-900 text-white rounded-[30px_20px_12px_20px] cursor-pointer"
              onClick={handleProfile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span>Profile</span>
            </button>
          )}
        </>
      ) : (
        <button
          className="hidden px-4 py-2 lg:flex bg-gray-900 text-white rounded-[30px_20px_12px_20px] cursor-pointer"
          onClick={handleLoginBtn}
        >
          <span>Login</span>
        </button>
      )}

      {/* Mobile Menu Button */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10  relative group"
        onClick={toggleMenu}
      >
        <span
          className={`absolute w-8 h-1 bg-gray-900 rounded transition-all duration-300 ease-in-out  ${
            isMenuOpen ? "rotate-45 translate-y-2.5" : "translate-y-[-8px]"
          }`}
        ></span>
        <span
          className={`absolute w-8 h-1 bg-gray-900 rounded transition-all duration-300 ease-in-out   ${
            isMenuOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`absolute w-8 h-1 bg-gray-900 rounded transition-all duration-300 ease-in-out   ${
            isMenuOpen ? "-rotate-45 -translate-y-2.5" : "translate-y-[8px]"
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}

      <div
        className={`fixed z-50 inset-0 bg-gray-100 flex flex-col items-center justify-center space-y-6 transition-transform transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
        onClick={toggleMenu}
      >
        {user ? (
          <>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/home"
              )}`}
              onClick={() => handleNavigation("/home")}
            >
              Home
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/services"
              )}`}
              onClick={() => handleNavigation("/services")}
            >
              Services
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/booking"
              )}`}
              onClick={() => handleNavigation("/booking")}
            >
              Bookings
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/about"
              )}`}
              onClick={() => handleNavigation("/about")}
            >
              About Us
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/contact"
              )}`}
              onClick={() => handleNavigation("/contact")}
            >
              Contact Us
            </a>
          </>
        ) : worker ? (
          <>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/dashboard"
              )}`}
              onClick={() => handleNavigation("/dashboard")}
            >
              Home
            </a>
            {/* <a  className={`text-lg font-semibold cursor-pointer ${isActiveMobile('/history')}`} onClick={()=>handleNavigation('/history')}>History</a> */}
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/wallet"
              )}`}
              onClick={() => handleNavigation("/wallet")}
            >
              Wallet
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/about"
              )}`}
              onClick={() => handleNavigation("/about")}
            >
              About Us
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer ${isActiveMobile(
                "/contact"
              )}`}
              onClick={() => handleNavigation("/contact")}
            >
              Contact Us
            </a>
          </>
        ) : (
          <>
            <a
              className={`text-lg font-semibold cursor-pointer text-indigo-600`}
              onClick={handleLoginBtn}
            >
              Home
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer `}
              onClick={handleLoginBtn}
            >
              Services
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer `}
              onClick={handleLoginBtn}
            >
              Bookings
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer `}
              onClick={handleLoginBtn}
            >
              About Us
            </a>
            <a
              className={`text-lg font-semibold cursor-pointer `}
              onClick={handleLoginBtn}
            >
              Contact Us
            </a>
            <div className="relative">
            <button 
            onClick={toggleNotifications}
            className="relative p-2 rounded-full hover:bg-indigo-100 transition"
          >
            <Bell className="w-6 h-6 text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {notifications.length}
              </span>
            )}
          </button>
            </div>
          </>
        )}

        {user || worker ? (
          <>
            {location.pathname === "/profile" ||
            location.pathname === "/personal-info" ? (
              <button
                className="px-6 py-2 bg-red-900 text-white rounded-[30px_20px_12px_20px] flex items-center space-x-2"
                onClick={handleLogout}
              >
                <span>Logout</span>
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-gray-900 text-white rounded-[30px_20px_12px_20px] flex items-center space-x-2 cursor-pointer"
                onClick={handleProfile}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span>Profile</span>
              </button>
            )}
          </>
        ) : (
          <button
            className="px-6 py-2 bg-gray-900 text-white rounded-[30px_20px_12px_20px] flex items-center space-x-2"
            onClick={handleLoginBtn}
          >
            <span>Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
