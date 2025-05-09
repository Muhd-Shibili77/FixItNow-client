import React from "react";
import Electrician from "../../assets/electrician-kitchen.webp";
import Repair from "../../assets/home-repairman.webp";
import repairmen from "../../assets/repairmen-electricians.webp";
import technician from "../../assets/technician.webp";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
function secondBanner() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.loginUser);

  const handleBtnclick = (id) => {
    if (user) {
      navigate(`/service/${id}`);
    }
  };

  return (
    <div className="bg-transparent flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10 p-4 bg-transparent rounded-lg ">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-gray-800">
            Your trusted home services, anytime, anywhere.
          </h2>
          <div className="mt-6 bg-transparent border-1 border-gray-300  p-4 rounded-lg">
            <p className="text-gray-600 text-sm mb-4">
              What are you looking for?
            </p>
            <div className="grid grid-cols-3 gap-3">
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67de75ef19483b16a6b5419f')}
              >
                Electrician
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67de729afe5fc7bcfa1375f5')}
              >
                Painter
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67de760919483b16a6b541a4')}
              >
                Plumber
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67e772289c44bbfd9bbecfb2')}
              >
                Mechanic
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67de762419483b16a6b541a9')}
              >
                Barber
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67e772429c44bbfd9bbecfb7')}
              >
                Gardener
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67e772629c44bbfd9bbecfbc')}
              >
                Gromer
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-200 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>handleBtnclick('67e7727a9c44bbfd9bbecfc1')}
              >
                Driver
              </button>
              <button className="flex items-center justify-center p-3 bg-indigo-300 rounded-lg text-gray-800 font-medium cursor-pointer"
              onClick={()=>navigate('/services')}
              >
                More..
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-2">
          <img
            src={Repair}
            className="rounded-lg shadow-md w-full h-50 object-cover"
            alt="Electrical panel"
          />
          <img
            src={repairmen}
            className="rounded-lg shadow-md w-full h-50 object-cover"
            alt="Home maintenance"
          />
          <img
            src={Electrician}
            className="rounded-lg shadow-md w-full h-50 object-cover"
            alt="Repair work"
          />
          <img
            src={technician}
            className="rounded-lg shadow-md  w-full h-50 object-cover"
            alt="Electrician at work"
          />
        </div>
      </div>
    </div>
  );
}

export default secondBanner;
