import { FaComment } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ChatButton = () => {
    const navigate = useNavigate()
    
    const user = localStorage.getItem('token')
   
    const handleChatButton =()=>{
        navigate('/chat')
    }

    return (
      <>
      {user &&(
          <button 
          className="fixed bottom-10 right-10 bg-indigo-500 cursor-pointer text-white px-6 py-5 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300"
          onClick={handleChatButton} >
          <FaComment size={28} />
        </button>
      )}
      </>
    );
  };
  
  export default ChatButton;
  