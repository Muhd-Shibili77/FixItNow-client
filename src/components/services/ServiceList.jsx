import React,{useEffect,useState} from 'react'
import { ServiceButtonRight } from '../../components/button/ServiceButton';
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceDetails } from '../../redux/adminSlice';
import Pagination from '../pagination/Pagination';

function ServiceList({searchTerm}) {
   const dispatch = useDispatch();
   const { data, loading, error,totalPages } = useSelector((state) => state.admin);
   const [page, setPage] = useState(1);
   
  
   useEffect(() => {   
        dispatch(fetchServiceDetails({searchTerm,page}));
    }, [dispatch,searchTerm,page]);



    if (loading)
      return (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-blue-500 font-semibold">Loading...</p>
        </div>
      );
    
    if (error)
      return <p className="text-red-500">Error: {error}</p>;
    
    if (!data) return null;
    
  return (
    


    <section className="py-12 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-start mb-8">All Services</h2>
            
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
              {data && data.length > 0 ?(
                    data?.map((service)=>(
                      
                        <ServiceButtonRight key={service.id} image={service.icon} name={service.name} id={service.id}/>
                        
                       
                    ))
              ):(
                  <h2 className="text-3xl font-bold text-center col-span-full text-red-500">No services available</h2>
              )} 
              
               
            </div>
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    </section>
  )
}

export default ServiceList