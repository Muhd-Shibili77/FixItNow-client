
import { useState } from "react";
import logo from '../../assets/maintenance.png'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";


const Navbar = () => {
  const navigate = useNavigate()

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state) => state.auth.loginUser);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLoginBtn =()=>{
    navigate('/auth')
  }
  return (
    <nav className="flex justify-between items-center p-4 md:p-6 bg-light relative">
      
      <div className="flex items-center space-x-2 text-xl font-semibold">
          <img className="w-10 h-10 object-contain" src={logo} alt="FixItNow Logo" />
            <span>FixItNow</span>
      </div>

      
      {/* Desktop Navigation */} 
      <div className="hidden md:flex space-x-4">
        <a href="#" className="text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700 rounded-[30px_20px_12px_20px] bg-indigo-300">Home</a>
        <a href="#" className="text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700">Services</a>
        <a href="#" className="text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700">Bookings</a>
        <a href="#" className="text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700">About Us</a>
        <a href="#" className="text-dark px-4 py-2 transition-colors duration-300 hover:text-gray-700">Contact Us</a>
      </div>
      {user ? ( 
                <button className="hidden px-4 py-2 md:flex bg-gray-900 text-white rounded-[30px_20px_12px_20px]">
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
            ) : ( 
                <button
                    
                    className="hidden px-4 py-2 md:flex bg-gray-900 text-white rounded-[30px_20px_12px_20px] cursor-pointer"
                    onClick={handleLoginBtn}
                >
                 
                    <span>Login</span>
                    
                </button>
            )}
     
      {/* Mobile Menu Button */}
      <button className="md:hidden flex flex-col justify-center items-center w-10 h-10 relative group" onClick={toggleMenu}>
      <span className={`absolute w-8 h-1 bg-gray-900 rounded transition-all duration-300 ease-in-out  ${isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-[-8px]'}`}></span>
      <span className={`absolute w-8 h-1 bg-gray-900 rounded transition-all duration-300 ease-in-out   ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} ></span>
      <span className={`absolute w-8 h-1 bg-gray-900 rounded transition-all duration-300 ease-in-out   ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : 'translate-y-[8px]'}`} ></span>
      </button>
  
      {/* Mobile Menu */}
      <div className={`fixed z-50 inset-0 bg-gray-100 flex flex-col items-center justify-center space-y-6 transition-transform transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`} onClick={toggleMenu}>   
        
        <a href="#" className="text-lg font-semibold text-indigo-600">Home</a>
        <a href="#" className="text-lg font-semibold ">Services</a>
        <a href="#" className="text-lg font-semibold">Bookings</a>
        <a href="#" className="text-lg font-semibold">About Us</a>
        <a href="#" className="text-lg font-semibold">Contact Us</a>
        
        {user ? ( 
                 <button className="px-6 py-2 bg-gray-900 text-white rounded-[30px_20px_12px_20px] flex items-center space-x-2">
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
