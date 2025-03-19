import React,{useState} from 'react'
import { PaymentElement,CardElement,useStripe,useElements } from '@stripe/react-stripe-js'
import axios from 'axios'
import { FaCreditCard, FaLock, FaSpinner } from 'react-icons/fa'


const CheckOutForm = ({bookingId,bookingNO,amount,user,address,onSuccess}) => {

    const stripe = useStripe()
    const elements = useElements()
    const [loading,setLoading] = useState(false)
    const [error,setError] =useState(null)

    const handlePayment = async(e)=>{
      e.preventDefault()
      setLoading(true)

      try {

        const {data} = await axios.post('http://localhost:3000/user/stripe/create-payment',{
          amount,
          bookingId,
          bookingNO,
          user,
          address
        })
        const {clientSecret} = data
        if (!stripe || !elements) {
            setError("Stripe has not loaded properly. Please try again.");
            return;
          }
        const result = await stripe.confirmCardPayment(clientSecret,{
          payment_method:{
            card:elements.getElement(CardElement),
            billing_details:{
              name:user,
                  address:{
                    line1:address.address,
                    city:address.city,
                    state:address.state,
                    postal_code:address.pincode,
                 }
            }
          },
        });
       

        if(result.error){
          setError(result.error.message)
        }else{
          if(result.paymentIntent.status === 'succeeded'){
            
            onSuccess(result.paymentIntent.amount)
          }
        }
      } catch (error) {
        setError('Payment failed . Please try again')
      }
      setLoading(false)

    }


  return (
    <form onSubmit={handlePayment} className="p-6 bg-white rounded-2xl shadow-lg max-w-lg w-full mx-auto ">

          <div className="flex items-center space-x-2 mb-3">
                <input
                    type="checkbox"
                    id="billingSame"
                    checked
                    readOnly
                    className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor="billingSame" className="text-sm text-gray-600">
                    Billing address same as shipping
                </label>
            </div>
    

    

    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center mb-4 space-x-2 text-indigo-600">
                    <FaCreditCard className="text-xl" />
                    <h4 className="font-semibold">Card Information</h4>
                </div>

                <div className="space-y-4">
                    <div className="relative">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#1a1a1a',
                                        '::placeholder': {
                                            color: '#a0aec0',
                                        },
                                    },
                                },
                            }}
                            className="p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                       
                        
                    </div>
                </div>
            </div>


     {/* Order Summary */}
     <div className="bg-gray-50 p-6 rounded-lg">
          <h4 className="font-semibold mb-4 text-center text-xl">Order Summary</h4>
          <div className="flex justify-between mb-2">
              <span>Booking no:</span>
              <span>{bookingNO}</span>
          </div>
          <div className="flex justify-between  mb-2">
              <span>charge :</span>
              <span>₹{amount}</span>
          </div>
          <div className="flex justify-between  mb-2">
              <span>Fee :</span>
              <span>₹40</span>
          </div>
          <div className="flex justify-between font-semibold">
              <span>Total Amount:</span>
              <span>₹{amount+40}</span>
          </div>
    </div>


    <div className="text-center text-sm text-gray-500 flex items-center justify-center space-x-2 mt-3">
        <FaLock className="text-green-500" />
        <span>Secure 256-bit SSL encryption</span>
    </div>

 
    {error && (
        <div className="text-red-500 text-sm p-3 bg-red-50 rounded-lg flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
        </div>
    )}

   
<button
      type="submit"
      disabled={loading || !stripe}
      className={`w-full py-3 rounded-lg font-semibold mt-8 text-white transition-all ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
  >
      {loading ? (
          <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="animate-spin" />
              <span>Processing...</span>
          </div>
      ) : (
          `Pay ₹${amount+40}`
      )}
</button>
</form>

  )
}

export default CheckOutForm