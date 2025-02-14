import React from 'react'
import SearchFilter from '../pagination/SearchFilter'
function HeadBanner(props) {
  return (
    <div className="mt-6 w-full h-50 mb-8">
    <div className="w-full h-60 bg-indigo-200 flex items-center justify-center  font-light mb-8">
        <SearchFilter/>
    </div>
</div>


  )
}

export default HeadBanner