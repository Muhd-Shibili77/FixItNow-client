import React from 'react'
import Button from '../button/Button'
function workerConfig() {
  return (

    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-indigo-200 ">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
           
            <form className="space-y-6">
          
            <div className="flex flex-col items-center gap-4 mb-8">
                <label className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative">
                    <input type="file" className="hidden" accept="image/*"/>
                    <span className="text-gray-500 absolute text-sm">Preview</span>
                </label>
                <h2 className="text-xl  text-gray-800">Upload your photo</h2>
            </div>



            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"/>
                </div>

                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                    <select className="w-full px-4 py-2 border rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100">
                        <option>Select Role</option>
                        <option>Developer</option>
                        <option>Designer</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pt-5 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of experience</label>
                    <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"/>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone number</label>
                    <input type="tel" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"/>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
                <textarea rows="4" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"></textarea>
            </div>
            <div className='flex justify-center gap-3'>
                <Button text='Cancel' color='bg-red-400' hover='bg-red-400'/> 

                <Button text='submit' color='bg-indigo-400' hover='bg-indigo-500'/>
           
            </div>
            
        </form>
        </div>
    </div>
  )
}

export default workerConfig