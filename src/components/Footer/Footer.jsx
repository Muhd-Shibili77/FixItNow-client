import React from 'react'
import logo from '../../assets/maintenance.png'
function Footer() {
  return (
    <footer className="bg-transparent border-2 border-gray-400 py-8 mt-12">
    <div className="max-w-6xl mx-auto px-4 sm:px-4 lg:px-8">
        <div className="flex flex-col md:flex-row gap-5">
           
            <div className="flex-1">
               <div className="flex items-center space-x-2 text-xl font-semibold">
                         <img className="w-10 h-10 object-contain" src={logo} alt="FixItNow Logo" />
                           <span>FixItNow</span>
                </div>
                <ul className="space-y-2 mt-7">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">FixItNow@company.com</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">+91 9048703044</a></li>
                </ul>
            </div>
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Electrician</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Plumber</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Gardener</a></li>
                </ul>
            </div>

          
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Homepage</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">About Us</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Contact Us</a></li>
                </ul>
            </div>

           
            <div className="flex-1">
                <h3 className="text-lg font-semibold mb-4">Help & Information</h3>
                <ul className="space-y-2">
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Help</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ’S</a></li>
                    <li><a href="#" className="text-gray-600 hover:text-gray-900">Tracking ID</a></li>
                </ul>
            </div>
        </div>

       
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm">
                &copy; 2023 Your Company. All rights reserved.
            </p>
        </div>
    </div>
</footer>


  )
}

export default Footer