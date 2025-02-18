import React from 'react'
import SelectionBox from '../../components/SelectionBox/SelectionBox'
import OTP from '../../components/OTP/OTP'
import WorkerConfig from '../../components/workerConfig/workerConfig'
import Navbar from '../../components/navbar/Navbar'
import Banner from '../../components/banner/Banner'
import SecondBanner from '../../components/secondBanner/secondBanner'
import Footer from '../../components/Footer/Footer'
import HeadBanner from '../../components/banner/HeadBanner'
import ServiceList from '../../components/services/ServiceList'
import Pagination from '../../components/pagination/Pagination'
function Selection() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>
        
        <Navbar/>
        
        <HeadBanner text='Services'/>
        <ServiceList/>
        <Pagination/>
        <Footer/>
    </div>
  )
}

export default Selection