import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from '../../components/button/Button';
import axios from 'axios';

function ServiceAdding() {

    const [formData, setFormData] = useState({
            name: "",
            image: null,  
            preview: null, 
        });

        const handleChange = (e) => {
            if (e.target.name === "image") {
                const file = e.target.files[0];
                if (file) {
                    setFormData({ ...formData, image: file,preview: URL.createObjectURL(file) }); 
                }
                
            } else {
                setFormData({ ...formData, [e.target.name]: e.target.value });
            }
        };

    const handleSubmit= async(e)=>{
        e.preventDefault(); 

        const formDataToSend =new FormData()
        formDataToSend.append("name", formData.name);
        formDataToSend.append("image", formData.image);


        try {
            const response = await axios.post("http://localhost:3000/service/addService", formDataToSend,{
                headers: { "Content-Type": "multipart/form-data" },
             });

             toast.success("service added successfully!");

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }

    }

    


  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-200 to-indigo-200'>    
         <div className="flex justify-center items-center min-h-screen ">
        <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-4xl">
           
            <form className="space-y-6">
          
            <div className="flex flex-col items-center gap-4 mb-8">
            <label className="w-30 h-30 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer relative">
            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*" 
                                name="image"  
                                onChange={handleChange} 
                            />
                            {formData.preview ? (
                                <img 
                                    src={formData.preview} 
                                    alt="Preview" 
                                    className="w-24 h-24 object-cover rounded-full border"
                                />
                            ) : (
                                <span className="text-gray-500 absolute text-sm">Preview</span>
                            )}
                            
                        </label>
                <h2 className="text-xl  text-gray-800">Upload icon</h2>
            </div>



            
            <div className="grid grid-cols-2 md:grid-cols-1  gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input type="text"  name='name'  value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-indigo-100"/>
                </div>
            </div>

           
            <div className='flex justify-center gap-3'>
               

               
                <Button text='submit' color='bg-indigo-400' hover='bg-indigo-500' function={handleSubmit}/>

            </div>
            
        </form>
        </div>
        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
    </div>
  )
}

export default ServiceAdding