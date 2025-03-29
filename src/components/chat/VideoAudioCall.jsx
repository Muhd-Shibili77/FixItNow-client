import React, { useRef, useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
} from "react-icons/fa";
import { MdCallEnd } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { socket } from "../../services/socket";

const VideoAudioCall = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { userId, receiverId, callType } = state || {};
  
  const userVideo = useRef();
  const myVideo = useRef();
  const peerConnection = useRef(null);
  const localStream = useRef(null);
  const iceCandidatesQueue = useRef([]);
  
  const remoteStreamRef = useRef(null);
  const [remoteStreamReady, setRemoteStreamReady] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callRejected, setCallRejected] = useState(false);
  const [connectionState, setConnectionState] = useState("new");

  // STUN/TURN servers
  const iceServers = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  // Create peer connection
  const createPeerConnection = () => {
    if (peerConnection.current) return peerConnection.current;

    try {
      const pc = new RTCPeerConnection(iceServers);

     
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => {
          pc.addTrack(track, localStream.current);
        });
      }

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", {
            to: receiverId,
            from: userId,
            candidate: event.candidate,
          });
        }
      };

   
      pc.onconnectionstatechange = () => {
        console.log('Connection state changed to:', pc.connectionState);
        setConnectionState(pc.connectionState);
        if (pc.connectionState === "connected") {
          setCallAccepted(true);
        }
        else if (
          pc.connectionState === "failed" ||
          pc.connectionState === "disconnected"
        ) {
          handleEndCall();
        }
      };

      // Improved remote track handling
      pc.ontrack = (event) => {
        console.log("Received remote track:", event.track.kind);
        
        if (event.streams && event.streams[0]) {
          console.log("Remote stream received with ID:", event.streams[0].id);
          
          // Store the remote stream in a ref - don't try to set video element yet
          remoteStreamRef.current = event.streams[0];
          console.log("Stored remote stream in ref");
          
          // Signal that we have a remote stream but don't try to set it yet
          // The dedicated useEffect will handle attaching it to the video element
          setRemoteStreamReady(true);
        }
      };

      peerConnection.current = pc;
      return pc;
    } catch (error) {
      console.error("Error creating peer connection:", error);
      return null;
    }
  };

  // Handle ICE candidates
  useEffect(() => {
    const handleIceCandidate = async ({ from, candidate }) => {
      // Only process candidates from the peer we're connected to
      if (from !== receiverId) return;

      try {
        if (
          peerConnection.current &&
          peerConnection.current.remoteDescription
        ) {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(candidate)
          );
          console.log("Added ICE candidate successfully");
        } else {
          // Queue the candidate if remote description is not set yet
          iceCandidatesQueue.current.push(candidate);
          console.log("Queued ICE candidate");
        }
      } catch (error) {
        console.error("Error handling ICE candidate:", error);
      }
    };

    socket.on("ice-candidate", handleIceCandidate);
    return () => socket.off("ice-candidate", handleIceCandidate);
  }, [receiverId]);

  // Get user media
  useEffect(() => {
    if (!userId || !receiverId) {
      navigate("/chat");
      return;
    }

    const initMedia = async () => {
      try {
        const constraints = { video: callType === "video", audio: true };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        localStream.current = stream;
        if (myVideo.current) myVideo.current.srcObject = stream;

        // Create peer connection
        createPeerConnection();
        
        // Send call request if initiator
        if (state?.isInitiator) {
          socket.emit("callUser", { from: userId, to: receiverId, callType });
        }
      } catch (error) {
        alert("Please allow camera and microphone access for the call.");
        navigate("/chat");
      }
    };

    initMedia();

    return () => {
      if (localStream.current) {
        localStream.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [userId, receiverId, callType, navigate, state]);

  // WebRTC signaling
  useEffect(() => {
    const handleSignaling = async ({ from, signal }) => {
      try {
        if (from !== receiverId) return;
        
        console.log(`Received ${signal.type} from ${from}`);
        
        if (signal.type === "offer") {
          if (!peerConnection.current) createPeerConnection();
          
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(signal.sdp)
          );
          console.log("Set remote description from offer");

          // Process any queued ICE candidates
          while (iceCandidatesQueue.current.length) {
            const candidate = iceCandidatesQueue.current.shift();
            await peerConnection.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
            console.log("Processed queued ICE candidate");
          }

          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          console.log("Created and set local answer");

          socket.emit("webrtc-signaling", {
            to: from,
            from: userId,
            signal: { type: "answer", sdp: answer },
          });
          console.log("Sent answer to peer");
          
        } else if (signal.type === "answer") {
          if (!peerConnection.current) {
            console.error("No peer connection when receiving answer");
            return;
          }
          
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(signal.sdp)
          );
          console.log("Set remote description from answer");

          // Process any queued ICE candidates
          while (iceCandidatesQueue.current.length) {
            const candidate = iceCandidatesQueue.current.shift();
            await peerConnection.current.addIceCandidate(
              new RTCIceCandidate(candidate)
            );
            console.log("Processed queued ICE candidate after answer");
          }
        }
      } catch (error) {
        console.error("Error handling signaling:", error);
      }
    };

    socket.on("webrtc-signaling", handleSignaling);
    return () => socket.off("webrtc-signaling", handleSignaling);
  }, [userId, receiverId]);

  // Handle call acceptance
  useEffect(() => {
    socket.on("callAccepted", async ({ from }) => {
      console.log("Call accepted by", from);
      setCallAccepted(true);
      
      try {
        // Ensure peer connection exists
        if (!peerConnection.current) {
          createPeerConnection();
        }
        
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        console.log("Created and set local offer after call accepted");

        socket.emit("webrtc-signaling", {
          to: receiverId,
          from: userId,
          signal: { type: "offer", sdp: offer },
        });
        console.log("Sent offer to peer after call accepted");
      } catch (error) {
        console.error("Error creating offer after call accepted:", error);
      }
    });

    return () => socket.off("callAccepted");
  }, [userId, receiverId]);

  // Handle call rejection
  useEffect(() => {
    socket.on("callRejected", () => {
      setCallRejected(true);
      setTimeout(handleEndCall, 3000);
    });

    return () => socket.off("callRejected");
  }, []);

  // Handle call end
  useEffect(() => {
    socket.on("callEnded", () => {
      setCallEnded(true);
      setTimeout(() => navigate("/chat"), 1000);
    });

    return () => socket.off("callEnded");
  }, [navigate]);

  // This effect attaches the remote stream to the video element whenever 
  // both the reference and the DOM element are available
  useEffect(() => {
    console.log("Effect triggered: checking if can attach remote stream");
    console.log("userVideo.current exist?", !!userVideo.current);
    console.log("remoteStreamRef.current exist?", !!remoteStreamRef.current);
    console.log("remoteStreamReady?", remoteStreamReady);
    console.log("callAccepted?", callAccepted);
    
    // Only attempt to set the remote stream if we have all the necessary pieces
    if (userVideo.current && remoteStreamRef.current && remoteStreamReady) {
      console.log("All conditions met to attach remote stream to video element");
      userVideo.current.srcObject = remoteStreamRef.current;
      
      // Add event listener to ensure video starts playing
      userVideo.current.onloadedmetadata = () => {
        console.log("Video metadata loaded, playing video");
        userVideo.current.play().catch(e => {
          console.error("Error playing remote video:", e);
        });
      };
    }
  }, [remoteStreamReady, callAccepted]);

  // Add a layout effect to check video elements after DOM update
  useEffect(() => {
    // This will run after the DOM has been updated
    if (userVideo.current && remoteStreamRef.current) {
      console.log("Layout effect: Video element is now available");
      if (userVideo.current.srcObject !== remoteStreamRef.current) {
        console.log("Setting remote stream to video element from layout effect");
        userVideo.current.srcObject = remoteStreamRef.current;
      }
    }
  });

  // Toggle audio
  const toggleMute = () => {
    if (localStream.current) {
      const audioTracks = localStream.current.getAudioTracks();
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = isMuted;
        setIsMuted(!isMuted);
      }
    }
  };

  // Toggle video
  const toggleVideo = () => {
    if (localStream.current) {
      const videoTracks = localStream.current.getVideoTracks();
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = isVideoOff;
        setIsVideoOff(!isVideoOff);
      }
    }
  };

  // End call
  const handleEndCall = () => {
    setCallEnded(true);
    socket.emit("endCall", { to: receiverId, from: userId });

    if (localStream.current) {
      localStream.current.getTracks().forEach((track) => track.stop());
    }
    if (peerConnection.current) {
      peerConnection.current.close();
    }
    navigate("/chat");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-indigo-400 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaArrowLeft className="cursor-pointer" onClick={handleEndCall} />
          <h1 className="text-md font-semibold ml-3">
            {callType === "video" ? "Video" : "Audio"} Call
          </h1>
        </div>
        <div className="text-sm">Status: {connectionState}</div>
      </div>

      {/* Video Section */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {callAccepted && !callEnded && (
          <div className="absolute inset-0 w-full h-full">
            {callType === "video" && (
              <>
                <video
                  playsInline
                  autoPlay
                  ref={userVideo}
                  className="w-full h-full object-cover"
                  style={{ transform: "scaleX(-1)" }}
                />
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs">
                  Stream Ready: {remoteStreamReady ? 'Yes' : 'No'}
                </div>
              </>
            )}
            {callType === "audio" && (
              <div className="w-full h-full flex justify-center items-center">
                <div className="w-32 h-32 rounded-full bg-indigo-400 flex items-center justify-center">
                  <span className="text-4xl text-white">
                    {("User").charAt(0)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
        {callType === "video" && (
          <div className="absolute bottom-4 right-4 h-35 w-40 bg-black rounded-lg overflow-hidden">
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
                className="h-full w-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />
            )}
          </div>
        )}
        {!callAccepted && !callEnded && (
          <div className="text-center">
            {!callRejected ? (
              <>
                <div className="mb-4 text-lg">Calling...</div>
                <div className="w-16 h-16 mx-auto border-4 border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              <div className="mb-4 font-bold text-red-500 text-2xl">
                Call Rejected
              </div>
            )}
          </div>
        )}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-6">
          <button
            className={`rounded-full p-4 cursor-pointer ${
              isMuted ? "bg-red-500" : "bg-gray-600"
            }`}
            onClick={toggleMute}
          >
            {isMuted ? (
              <FaMicrophoneSlash size={24} />
            ) : (
              <FaMicrophone size={24} />
            )}
          </button>
          {callType === "video" && (
            <button
              className={`rounded-full p-4 cursor-pointer ${
                isVideoOff ? "bg-red-500" : "bg-gray-600"
              }`}
              onClick={toggleVideo}
            >
              {isVideoOff ? <FaVideoSlash size={24} /> : <FaVideo size={24} />}
            </button>
          )}
          <button
            onClick={handleEndCall}
            className="rounded-full p-4 bg-red-600 cursor-pointer"
          >
            <MdCallEnd size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoAudioCall;