import React, { useRef, useState, useEffect } from 'react';
import { FaArrowLeft, FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash } from 'react-icons/fa';
import { MdCallEnd } from "react-icons/md";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { socket } from '../../services/socket';
import Peer from 'peerjs';

const VideoAudioCall = () => {
    const userVideo = useRef()
    const myVideo = useRef()

    const [callType,setCallType] =useState('video')
    const [callAccepted,isCallAccepted] = useState(false)
    const [callEnded,isCallEnded] = useState(false)
    const [isVideoOff,setIsVideoOff] = useState(false)
    const [isMuted,setIsMuted] = useState(false)

    const handleBackClick =()=>{

    }
    const toggleMute =()=>{

    }
    const toggleVideo =()=>{

    }
    const handleEndCall =()=>{

    }
    const answerCall =()=>{

    }
    const rejectCall =()=>{

    }
    return (
        <div className="flex flex-col h-screen">
            <div className="bg-indigo-400 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FaArrowLeft className="cursor-pointer" onClick={handleBackClick} />
                    <h1 className='text-md font-semibold ml-3'>
                        {callType === 'video' ? 'Video' : 'Audio'} Call {callAccepted && !callEnded ? formatTime(callTime) : ''}
                    </h1>
                </div>
                <div className="text-lg">{contactName || 'User'}</div>
            </div>

            {/* Video Section */}
            <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {!stream ? (
                    <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600">Setting up your call...</p>
                    </div>
                ) : (
                    <>
                        {callAccepted && !callEnded && (
                            <div className="absolute inset-0 w-full h-full">
                                {callType === 'video' && (
                                    <video
                                        playsInline
                                        autoPlay
                                        ref={userVideo}
                                        className='w-full h-full object-cover'
                                    />
                                )}
                                {callType === 'audio' && (
                                    <div className='w-full h-full flex justify-center items-center'>
                                        <div className="w-32 h-32 rounded-full bg-indigo-400 flex items-center justify-center">
                                            <span className="text-4xl text-white">{(contactName || "User").charAt(0)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {callType === 'video' && (
                            <div className='absolute bottom-4 right-4 h-35 w-40 bg-black rounded-lg overflow-hidden'>
                                {isVideoOff ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white text-sm">
                                        Camera Off
                                    </div>
                                ) : (
                                    <video
                                        playsInline
                                        autoPlay
                                        ref={myVideo}
                                        muted
                                        className='h-full w-full object-cover'
                                        style={{ transform: 'scaleX(-1)' }}
                                    />
                                )}
                            </div>
                        )}
                        {!callAccepted && !receivingCall && !callEnded && (
                            <div className="text-center">
                                <div className="mb-4 text-lg">Calling {contactName || 'User'}...</div>
                                <div className="w-16 h-16 mx-auto border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6">
                            <button className={`rounded-full p-4 cursor-pointer ${isMuted ? "bg-red-500" : "bg-gray-600"}`} onClick={toggleMute}>
                                {isMuted ? <FaMicrophoneSlash size={24} /> : <FaMicrophone size={24} />}
                            </button>
                            {callType === 'video' && (
                                <button className={`rounded-full p-4 cursor-pointer ${isVideoOff ? "bg-red-500" : "bg-gray-600"}`} onClick={toggleVideo}>
                                    {isVideoOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
                                </button>
                            )}
                            <button onClick={handleEndCall} className="rounded-full p-4 bg-red-600 cursor-pointer">
                                <MdCallEnd size={24} />
                            </button>
                        </div>
                        {receivingCall && !callAccepted && (
                            <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center">
                                <h1 className="text-2xl text-white mb-8">Incoming {callType === 'video' ? 'Video' : 'Audio'} Call</h1>
                                <div className="flex space-x-4">
                                    <button onClick={answerCall} className="bg-green-500 text-white px-6 py-3 rounded-full cursor-pointer">
                                        Answer
                                    </button>
                                    <button onClick={rejectCall} className="bg-red-500 text-white px-6 py-3 rounded-full cursor-pointer">
                                        Decline
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default VideoAudioCall;