import React from "react";

const ContactForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className=" p-10  w-full max-w-5xl">
       
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Say Hello. Don't Be Shy!
        </h2>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full p-3 border border-gray-400 rounded-md italic focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-3 border border-gray-400 rounded-md italic focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>

       
        <textarea
          placeholder="Your message"
          className="w-full mt-4 p-3 border border-gray-400 rounded-md italic h-40 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500"
        ></textarea>

        
        <div className="flex justify-start mt-6">
          <button className="bg-black p-4 rounded-lg shadow-lg hover:bg-gray-800 transition-all">
            
            <i className='bx bx-paper-plane text-white text-2xl'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
