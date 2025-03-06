import React from "react";
import Photo from '../../assets/electrician-kitchen.webp'
const AboutUs = () => {
  return (
    <div className="flex flex-col md:flex-row items-center  p-10">
   
    <div className="md:w-1/2 w-full">
      <img 
        src={Photo}
        alt="Workers fixing kitchen" 
        className="w-160 h-100 object-cover rounded-lg shadow-lg"
      />
    </div>

    
    <div className="md:w-1/2 w-full md:pl-10 mt-6 md:mt-0">
      <h2 className="text-4xl font-bold text-black">About Us</h2>
      <p className="text-gray-600 mt-4 leading-relaxed">
        Founded in 2015, FixItNow has emerged as South Asia’s leading home services platform, 
        revolutionizing the way people access essential services. With a strong presence in India, 
        we connect homeowners with trusted professionals for a wide range of services, from plumbing 
        and electrical work to home cleaning, appliance repair, and more.
      </p>
      <p className="text-gray-600 mt-4 leading-relaxed">
        Backed by advanced technology, data-driven solutions, and a customer-first approach, FixItNow 
        collaborates with over 12,000 skilled service providers and 350 partner brands, catering to 
        the needs of 3.5 million satisfied customers. 
      </p>
    </div>
  </div>
  );
};

export default AboutUs;
