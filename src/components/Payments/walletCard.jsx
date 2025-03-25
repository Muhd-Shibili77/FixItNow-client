import React, { useEffect } from 'react'
import { BiSolidUpArrowCircle,BiSolidDownArrowCircle } from "react-icons/bi";
import { getWallet } from '../../redux/workerSlice';
import { useDispatch,useSelector } from 'react-redux';
import { loginWoker } from '../../redux/authSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from '../../services/AxiosInstance';

const WalletCard = () => {
  const dispatch = useDispatch()
  const worker = useSelector((state)=>state.auth.loginWoker)
  const  { wallet, loading, error } = useSelector((state)=>state.worker)
  const userId = worker?.userId

  

  useEffect(()=>{
    if(userId){
      dispatch(getWallet({userId}))
    }
  },[dispatch,userId])


  const handleCreateAcc= async()=>{

    if(!userId){
      toast.error( "userId is empty");
      return;
    }
   

    try {
      const response = await axiosInstance.post('/worker/stripe/create-stripe-account',{userId})

       toast.success("account created successfully!");

      setTimeout(()=>{
        dispatch(getWallet({userId}))
      },1500)

    } catch (error) {

      console.error("Error creating account:", error);
      toast.error( "Error creating account:",error);
      return;

    }
  }

  const handleTestWithdraw = async ()=>{
    if (!wallet?.balanceAmount || wallet.balanceAmount <= 0) {
      toast.error( "Insufficient balance!");
      return;
    }

    try {
      const response = await axiosInstance.post('/worker/stripe/testPayout',{userId})

      if(response.data.success){
        toast.success('payout successfull')
        dispatch(getWallet({userId}))
      }else{
        toast.error(`Error: ${response.data.error}`)
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
      toast.error('something went wrong! please try again')
      
    }
  }


  const handleWithdraw =async ()=>{

    if (!wallet?.balanceAmount || wallet.balanceAmount <= 0) {
      toast.error( "Insufficient balance!");
      return;
    }

    try {
      const response = await axiosInstance.post('/worker/stripe/onboarding-link',{userId})

      if(response.data.success){
        window.location.href = response.data.url
      }else{
        toast.error(`Error: ${response.data.error}`)
      }
    } catch (error) {
      console.error("Error during withdrawal:", error);
      toast.error('something went wrong! please try again')
      
    }
    
  }


  return (
    <div className="flex flex-col items-center min-h-screen  py-10">
      <div className="bg-gradient-to-br from-gray-300 to-indigo-200 shadow-md rounded-2xl p-6 md:w-130 w-87 h-50 text-center">
        <p className="text-gray-600 text-lg">Your Wallet</p>
        <h1 className="text-4xl font-bold text-gray-800">₹{wallet?.balanceAmount?.toFixed(2)}</h1>
        {wallet?.worker?.stripeAccountId ?(
          <>
          <button className="mt-4 bg-white text-gray-500 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer" onClick={handleWithdraw}>
            Withdraw
         </button>
          <button className="mt-4 bg-white text-gray-500 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer" onClick={handleTestWithdraw}>
            test Withdraw
         </button>
          </>
        ):(
          <button className="mt-4 bg-white text-gray-500 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-gray-100 transition cursor-pointer" onClick={handleCreateAcc}>
            Create Stripe Account
        </button>
        )}
      </div>
      <h2 className="text-xl font-semibold mt-10">Transaction History</h2>
      <div className='bg-gray-200 shadow-md rounded-lg mt-4  md:w-120 w-87 p-4'>

      {wallet?.walletHistory.length > 0 ? (
          wallet?.walletHistory.map((tx,index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b last:border-none py-3"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`text-lg ${
                    tx.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {tx.amount < 0 ? <BiSolidUpArrowCircle size={22}/> : <BiSolidDownArrowCircle  size={22}/>
              }
                </span>
                <p className="text-gray-700 font-medium">{tx.description}</p>
              </div>
              <p className={`font-semibold ${tx.amount < 0 ? "text-red-500" : "text-green-500"}`}>
                {tx.amount < 0 ? `-₹${Math.abs(tx.amount)}` : `+₹${tx.amount}`}
              </p>
            </div>
          ))
      ):(
        <h2 className="text-xl font-semibold mt-10 text-center">No Transactions</h2>
      )}  
      


      </div>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />

      </div>
  )
}

export default WalletCard