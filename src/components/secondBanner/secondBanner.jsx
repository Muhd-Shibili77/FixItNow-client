import React from 'react'
import Electrician from '../../assets/electrician-kitchen.webp'
import Repair from '../../assets/home-repairman.webp'
import repairmen from '../../assets/repairmen-electricians.webp'
import technician from '../../assets/technician.webp'
function secondBanner() {
  return (

    <div class="bg-transparent flex items-center justify-center min-h-screen">
    <div class="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 p-4 bg-transparent rounded-lg ">
       
        <div class="flex-1">
            <h2 class="text-3xl font-semibold text-gray-800">
                Your trusted home services, anytime, anywhere.
            </h2>
            <div class="mt-6 bg-transparent border-1 border-gray-300  p-4 rounded-lg">
                <p class="text-gray-600 text-sm mb-4">What are you looking for?</p>
                <div class="grid grid-cols-3 gap-3">
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer">
                         Electrician
                    </button>
                    <button class="flex items-center justify-center p-3 bg-indigo-300 rounded-lg text-gray-800 font-medium cursor-pointer">
                         More..
                    </button>
                </div>
            </div>
        </div>

       
        <div class="flex-1 grid grid-cols-2 gap-2">
            <img src={Repair}  class="rounded-lg shadow-md w-full h-50 object-cover" alt="Electrical panel"/>  
            <img src={repairmen}  class="rounded-lg shadow-md w-full h-50 object-cover" alt="Home maintenance"/>
            <img src={Electrician}  class="rounded-lg shadow-md w-full h-50 object-cover" alt="Repair work"/>
            <img src={technician} class="rounded-lg shadow-md  w-full h-50 object-cover" alt="Electrician at work"/>
        </div>
    </div>
</div>
  )
}

export default secondBanner