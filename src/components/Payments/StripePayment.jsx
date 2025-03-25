import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const StripePayment = ({ bookingId,bookingNO, amount,user,address, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm  bookingId={bookingId} bookingNO={bookingNO} amount={amount} user={user} address={address} onSuccess={onSuccess}/>
    </Elements>
  )
}

export default StripePayment