import React from 'react';
import BannerImage from '../../assets/BannerImage.png';
import { logoutUser,logoutWoker } from "../../redux/authSlice";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function Banner() {

  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.loginUser);
  
  const handleBtnclick =()=>{
    if(user){
      navigate('/services')
    }
  }

  return (
    <main className="flex flex-col gap-12 p-8 md:flex-row md:items-center md:gap-0 md:p-6 max-w-7xl mx-auto">
  <div className="flex flex-col gap-8  md:flex-1">
    <h1 className="text-4xl font-bold leading-tight md:text-6xl">
      Bringing Expertise to Your Doorstep
      
    </h1>
    
    <div className="relative inline-block">
      <button className=" bg-indigo-400 px-8 py-3 rounded-full text-lg font-medium hover:bg-indigo-500 transition-colors cursor-pointer" onClick={handleBtnclick}>
        Get It Fixed
      </button>
     
    </div>
  </div>

  <div className="relative md:left-[140px] pb-[400px] md:flex-1">
    <div className="absolute inset-0 rounded-[190px_0_0_140px] border-l-[3.5px] border-t-[3.5px] border-b-[3.5px] border-dotted border-gray-500 pl-2 pt-2 pb-2 overflow-hidden">
      
      <img 
        src={BannerImage} 
        alt="Modern interior" 
        className="w-full h-full object-cover rounded-[180px_0_0_135px]" 
      />
    </div>
  </div>
</main>
  );
}

export default Banner;
