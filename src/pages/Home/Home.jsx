import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import SecondBanner from '../../components/secondBanner/secondBanner'
import Footer from '../../components/Footer/Footer'

function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>
         <Navbar/>
         <Banner/>
         <SecondBanner/>
         <Footer/>
    </div>    
  )
}

export default Home