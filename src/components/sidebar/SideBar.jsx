import React, { useState } from "react";
import logo from "../../assets/maintenance.png";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/authSlice";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router";
import {
  FaUser, FaUsersCog, FaCalendarAlt, FaTools,
  FaSignOutAlt, FaThLarge, FaBars, FaMoneyBillWave 
} from "react-icons/fa";

function SideBar(props) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [active, setActive] = useState(props.page);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", route:'dashboard',icon: <FaThLarge />, key: "Dashboard" },
    { name: "Users", route:'users', icon: <FaUser />, key: "Users" },
    { name: "Workers",route:'workers', icon: <FaUsersCog />, key: "Workers" },
    { name: "Booking", route:'bookings',icon: <FaCalendarAlt />, key: "Booking" },
    { name: "Services",route:'services', icon: <FaTools />, key: "Services" },
    { name: "Earnings",route:'earnings', icon: <FaMoneyBillWave />, key: "Earnings" },
    { name: "Logout", icon: <FaSignOutAlt />, key: "Logout" }
  ];

  const handleLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="fixed inset-0 flex items-center justify-center  z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
              <h2 className="text-xl font-semibold text-gray-800">Logout Confirmation</h2>
              <p className="text-gray-600 mt-2">Are you sure you want to logout?</p>
              <div className="flex justify-center mt-5 gap-4">
                <button
                  onClick={() => {
                    dispatch(logoutAdmin());
                    navigate("/admin/login");
                    onClose();
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
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
  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-3 text-gray-700 fixed top-4 left-4 z-50 bg-white rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {<FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`h-auto w-64 bg-white shadow-md p-5 flex flex-col fixed top-0 left-0 z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Logo Section */}
        <div className="flex items-center space-x-2 text-xl font-semibold">
          <img className="w-8 h-8 object-contain" src={logo} alt="FixItNow Logo" />
          <span>FixItNow</span>
        </div>

        <hr className="mb-4 mt-5" />

        {/* Menu Items */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gray-200 ${
                active === item.key ? "bg-indigo-200 text-indigo-600" : "text-gray-700"
              }`}
              onClick={() => {
                if(item.key == 'Logout'){
                  handleLogout()
                }else{
                  navigate(`/admin/${item.route}`)
                  setActive(item.key);
                  setIsOpen(false);
                }
              }}
            >
              {item.icon} <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default SideBar;
