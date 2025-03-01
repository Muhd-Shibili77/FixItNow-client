import React from 'react'


function WorkerBanner({name}) {
  return (
    <div className="mt-6 w-full h-50 mb-8">
    <div className="w-full h-60 bg-indigo-200 flex items-center justify-center  font-light mb-8">
       
        <h1 className='font-medium text-2xl'>{name}</h1>
    </div>
</div>


  )
}

export default WorkerBanner