import React, { useState } from "react";
import logo from "../../assets/maintenance.png";
import {
  FaUser, FaUsersCog, FaCalendarAlt, FaTools,
  FaSignOutAlt, FaThLarge, FaBars, FaTimes
} from "react-icons/fa";

function SideBar(props) {
  const [active, setActive] = useState(props.page);
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: <FaThLarge />, key: "Dashboard" },
    { name: "Users", icon: <FaUser />, key: "Users" },
    { name: "Workers", icon: <FaUsersCog />, key: "Workers" },
    { name: "Booking", icon: <FaCalendarAlt />, key: "Booking" },
    { name: "Services", icon: <FaTools />, key: "Services" },
    { name: "Logout", icon: <FaSignOutAlt />, key: "Logout" }
  ];

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
        className={`h-screen w-64 bg-white shadow-md p-5 flex flex-col fixed top-0 left-0 z-50 transform ${
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
                setActive(item.key);
                setIsOpen(false);
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
