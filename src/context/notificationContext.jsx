import { useEffect,useContext,createContext, Children } from "react";
import { socket } from "../services/socket";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const notificationContext = createContext(null)

export const NotificationProvider =({children})=>{

    useEffect(()=>{
        socket.on('newNotification',(data)=>{
            toast.info("💬 You have a new message!", {
                position: "bottom-left",
                autoClose: 3000, 
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    background: "#829bfc", // Blue background
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                },
                icon: "📩", // Envelope icon for a message alert
            });
        })

        return ()=>{
            socket.off('newNotification')
        };
    },[])

    return (
        <notificationContext.Provider value={{}}>
            {children}


        </notificationContext.Provider>
    )
}
