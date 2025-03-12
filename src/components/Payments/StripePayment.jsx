import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from './CheckOutForm';


const stripePromise = loadStripe("pk_test_51ImFjbSFHLvjgURKsXj8LqtUk10dTmdKr7dyEn3pBqItjhS6mG0cJ6cnLXkhS1dp7kzAoMJ6rooDYsnkoaAOv4qz00tfX0qgta");

const StripePayment = ({ bookingId,bookingNO, amount,user,address, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckOutForm  bookingId={bookingId} bookingNO={bookingNO} amount={amount} user={user} address={address} onSuccess={onSuccess}/>
    </Elements>
  )
}

export default StripePayment