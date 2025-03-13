  import React,{useEffect,useState} from 'react'
  import WorkerCard from '../button/WorkerCard';
  import { useDispatch, useSelector } from "react-redux";
  import { fetchWorkerDetails } from '../../redux/serviceSlice';
  import Pagination from '../pagination/Pagination';

  function workerList({serviceId,searchTerm}) {
    const dispatch = useDispatch();
    const { data, loading, error,totalPages } = useSelector((state) => state.service);
    
    const [page, setPage] = useState(1);
    
    
    useEffect(() => {   
          dispatch(fetchWorkerDetails({searchTerm,page,serviceId}));
      }, [dispatch,searchTerm,page,serviceId]);



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
              <h2 className="text-3xl font-semibold italic text-start mb-8">{data?.[0]?.service}</h2>
              
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-9">
                {data && data.length > 0 ?(
                      data?.map((worker)=>(
                        
                          <WorkerCard key={worker.id} id={worker.id} name={worker.name} image={worker.profileImage} experience={worker.experience} rating={worker.averageRating}/>
                      ))
                ):(
                    <h2 className="text-3xl font-bold text-center col-span-full text-red-500">No worker available</h2>
                )} 
                
                
              </div>
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
          </div>
      </section>
    )
  }

  export default workerList