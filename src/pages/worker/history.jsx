import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ChatButton from '../../components/button/ChatButton'


const history = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>    
    <Navbar/>
   
    <Footer/>
    <ChatButton/>
</div>
  )
}

export default history