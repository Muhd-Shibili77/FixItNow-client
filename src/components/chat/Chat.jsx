import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaVideo, FaPhone, FaArrowLeft } from "react-icons/fa";
import { FiVideo } from "react-icons/fi";
import { CiImageOn } from "react-icons/ci";
import { AiOutlineCloseCircle, AiOutlineAudio } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { socket } from "../../services/socket";
import { fetchFullWorkers } from "../../redux/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchChatMessages, fetchChatList } from "../../redux/messageSlice";
import { jwtDecode } from "jwt-decode";
import { FaPaperclip } from "react-icons/fa";
import axiosInstance from "../../services/AxiosInstance";
import { useNavigate } from "react-router";

const ChatApp = () => {
  const navigate = useNavigate();
  const scrollBottomRef = useRef();
  const messagesContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const [isEmojiOpen, setIsEmojiOpen] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const {
    messages: chats,
    loading,
    error,
  } = useSelector((state) => state.message);
  const { chatlist } = useSelector((state) => state.message);
  const jwtToken = localStorage.getItem("token");
  const { workers } = useSelector((state) => state.admin);
  const [incomingCall, setIncomingCall] = useState(null);

  let userId;
  let senderModel;
  let receiverModel;
  let isUser;
  let receiverId;

  if (jwtToken) {
    const decoded = jwtDecode(jwtToken);

    userId = decoded.userId;
    if (decoded.role === "User") {
      senderModel = "Users";
      receiverModel = "Workers";
      isUser = true;
    } else {
      senderModel = "Workers";
      receiverModel = "Users";
    }
  }

  useEffect(() => {
    if (userId) {
      socket.emit("joinRoom", userId);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchChatList({ userId }));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (activeChat) {
      receiverId = activeChat._id || activeChat.id;
      dispatch(fetchChatMessages({ senderId: userId, receiverId: receiverId }));
    }
  }, [activeChat, dispatch]);

  useEffect(() => {
    setMessages(chats);
  }, [chats]);

  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log("Message received:", message);
      setMessages((prev) => [...prev, message]);
    };

    const handleIncomingCall = ({ from, callType }) => {
      console.log("Incoming call received:", from, callType);
      setIncomingCall({ from, callType });
    };

    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("incomingCall", handleIncomingCall);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("incomingCall", handleIncomingCall);
    };
  }, []);

  useEffect(() => {
    socket.on("reactionUpdated", ({ messageId, userId, reaction }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                reactions: msg.reactions?.some((r) => r.user === userId)
                  ? msg.reactions.map((r) =>
                      r.user === userId ? { ...r, reaction } : r
                    )
                  : [...msg.reactions, { user: userId, reaction }],
              }
            : msg
        )
      );
    });

    return () => {
      socket.off("reactionUpdated");
    };
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "" && !selectedFile) return;

    if (newMessage.trim() !== "" && selectedFile) {
      toast.error("You can either send a text or a file, not both.");
      return;
    }
    let messageContent = newMessage;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await axiosInstance.post("/msg/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const data = response.data;
        messageContent = data.url;
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file:", error);
        return;
      }
    }

    const messageData = {
      sender: userId,
      senderModel: senderModel,
      receiver: activeChat.id || activeChat._id,
      receiverModel: receiverModel,
      message: messageContent,
    };
    socket.emit("sendMessage", messageData);

    setMessages((prev) => [...prev, messageData]);
    setNewMessage("");
    setSelectedFile(null);
  };

  useEffect(() => {
    dispatch(fetchFullWorkers({ searchTerm: "" }));
  }, [dispatch]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleReaction = (messageId, reaction) => {
    const receiverId = activeChat?._id || activeChat?.id;
  
    if (!receiverId) {
      console.error("No receiver ID found");
      return;
    }
  
    // Ensure the message has a reactions array before manipulating it
    socket.emit("addReaction", { messageId, userId, receiverId, reaction });
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: msg.reactions 
                ? (msg.reactions.some((r) => r.user === userId)
                    ? msg.reactions.map((r) =>
                        r.user === userId ? { ...r, reaction } : r
                      )
                    : [...msg.reactions, { user: userId, reaction }])
                : [{ user: userId, reaction }]
            }
          : msg
      )
    );
  };

  // Initiate call
  const initiateCall = (callType) => {
    const receiverId = activeChat?._id || activeChat?.id;

    if (!receiverId) {
      console.error("No receiver ID found");
      return;
    }

    navigate("/call", {
      state: { userId, receiverId, callType, isInitiator: true },
    });
  };

  // Reject call
  const rejectCall = () => {
    socket.emit("rejectCall", { from: userId, to: incomingCall.from });
    setIncomingCall(null);
  };

  // Accept call
  const acceptCall = () => {
    if (incomingCall) {
      socket.emit("callAccepted", { from: userId, to: incomingCall.from });
      navigate("/call", {
        state: {
          userId,
          receiverId: incomingCall.from,
          callType: incomingCall.callType,
          isInitiator: false,
        },
      });
      setIncomingCall(null);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full max-w-7xl  p-3 mx-auto">
      {/* Sidebar */}

      <div
        className={`w-full md:w-1/4 bg-white rounded-lg shadow-lg flex flex-col ${
          activeChat !== null ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="p-4 border-b text-lg font-semibold">Messages</div>

        <div
          className="flex-1 overflow-y-auto scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="h-[calc(100vh-280px)]">
            {chatlist?.chats?.map((chat) => {
              const getTimeAgo = (timestamp) => {
                const now = new Date();
                const messageTime = new Date(timestamp);

                const differenceInSec = Math.floor((now - messageTime) / 1000);

                if (differenceInSec < 60) {
                  return `${differenceInSec} sec ago`;
                } else if (differenceInSec < 3600) {
                  return `${Math.floor(differenceInSec / 60)} min ago`;
                } else if (differenceInSec < 86400) {
                  return `${Math.floor(differenceInSec / 3600)} hr ago`;
                } else {
                  return `${Math.floor(differenceInSec / 86400)} days ago`;
                }
              };
              return (
                <div
                  key={chat._id}
                  className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
                  onClick={() => setActiveChat(chat.contact)}
                >
                  <img
                    src={
                      chat.contact?.profileImage
                        ? chat.contact?.profileImage.startsWith("http")
                          ? `${chat.contact?.profileImage}`
                          : `http://localhost:3000/uploads/${chat.contact?.profileImage}`
                        : "https://randomuser.me/api/portraits/men/1.jpg"
                    }
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">
                      {chat.contact?.name
                        ? chat.contact.name
                        : chat.contact?.username}
                    </p>
                    <p className="text-sm text-indigo-600"></p>

                    {chat.lastMessage.startsWith("http") ? (
                      chat.lastMessage.match(/\.(jpeg|jpg|png)$/) ? (
                        <div className="flex">
                          <CiImageOn size={20} />{" "}
                          <span className="ml-1">Image</span>
                        </div>
                      ) : chat.lastMessage.match(/\.(mp4|mov|avi|webm)$/) ? (
                        <div className="flex">
                          <FiVideo size={20} />{" "}
                          <span className="ml-1">Video</span>
                        </div>
                      ) : null
                    ) : (
                      chat.lastMessage
                    )}
                  </div>
                  <span className="text-xs text-gray-400 ml-auto">
                    {getTimeAgo(chat.timestamp)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {isUser && (
          <div className="border-t">
            <div className="p-2 border-b text-center font-medium">
              Other Workers
            </div>
            <div
              className="h-[200px] overflow-y-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {workers
                ?.filter(
                  (worker) =>
                    !chatlist?.chats?.some((chat) => {
                      const contactId = chat.contact._id || chat.contact.id;
                      return contactId === worker.id;
                    })
                )
                ?.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
                    onClick={() => setActiveChat(item)}
                  >
                    <img
                      src={item?.profileImage}
                      alt="User"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{item.username}</p>
                      <p className="text-sm text-indigo-600">
                        I am a {item.service.name}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div
        className={`flex-1 bg-white rounded-lg shadow-lg flex flex-col ml-2 w-20 ${
          activeChat === null ? "hidden md:flex" : "flex"
        }`}
      >
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-3 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FaArrowLeft
                  className="text-xl cursor-pointer md:hidden"
                  onClick={() => setActiveChat(null)}
                />
                <img
                  src={
                    activeChat?.profileImage
                      ? activeChat?.profileImage.startsWith("http")
                        ? `${activeChat?.profileImage}`
                        : `http://localhost:3000/uploads/${activeChat?.profileImage}`
                      : "https://randomuser.me/api/portraits/men/1.jpg"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">
                  {activeChat.name ? activeChat.name : activeChat?.username}
                </span>
              </div>
              <div className="flex gap-4 text-gray-500">
                <FaVideo
                  className="text-xl cursor-pointer hover:text-gray-700"
                  onClick={() => initiateCall("video")}
                />
                <FaPhone
                  className="text-xl cursor-pointer hover:text-gray-700"
                  onClick={() => initiateCall("audio")}
                />
              </div>
            </div>

            {/* Chat Messages */}
            <div
              className="flex-1 overflow-y-auto scrollbar-hide px-2 mb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              ref={messagesContainerRef}
            >
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="text-center text-gray-500 text-sm mb-4">
                  Today
                </div>

                {loading ? (
                  <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
                    <p className="ml-2 text-blue-500 font-semibold">
                      Loading...
                    </p>
                  </div>
                ) : error ? (
                  <p className="text-red-500">{error}</p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      className={`flex items-start ${
                        msg.sender === userId ? "justify-end" : ""
                      } gap-3 mb-4`}
                      key={index}
                    >
                      {/* Show sender's avatar for received messages */}
                      {msg.sender !== userId && (
                        <img
                          src={
                            activeChat?.profileImage
                              ? activeChat?.profileImage.startsWith("http")
                                ? `${activeChat?.profileImage}`
                                : `http://localhost:3000/uploads/${activeChat?.profileImage}`
                              : "https://randomuser.me/api/portraits/men/1.jpg"
                          }
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                      )}

                      <div className="relative">
                        {isEmojiOpen === index && (
                          <div
                            className={`absolute top-[-50px] left-1/2 -translate-x-1/2 bg-gray-200 shadow-lg p-2 rounded-4xl flex gap-2 transition-all duration-200 ease-out ${
                              isEmojiOpen === index
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-90 pointer-events-none"
                            }`}
                          >
                            {["❤️", "😂", "😢", "💯", "👍", "👎"].map(
                              (emoji) => (
                                <button
                                  key={emoji}
                                  onClick={() => {
                                    handleReaction(msg.id, emoji); // Call function to add reaction
                                    setIsEmojiOpen(null);
                                  }}
                                  className="text-lg hover:scale-110 transition cursor-pointer"
                                >
                                  {emoji}
                                </button>
                              )
                            )}
                          </div>
                        )}

                        {/* Message Bubble */}
                        <div
                          className={`px-4 py-2 rounded-lg max-w-xs cursor-pointer relative ${
                            msg.sender === userId
                              ? "bg-indigo-500 text-white ml-6"
                              : "bg-gray-200 text-gray-800 mr-6"
                          }`}
                        >
                          {msg.message.startsWith("http") ? (
                            msg.message.match(/\.(jpeg|jpg|png)$/) ? (
                              <img
                                src={msg.message}
                                alt="Media"
                                className="rounded-lg max-w-full"
                                loading="lazy"
                              />
                            ) : msg.message.match(/\.(mp4|mov|avi|webm)$/) ? (
                              <video
                                controls
                                className="rounded-lg max-w-xs h-80"
                              >
                                <source src={msg.message} type="video/mp4" />
                              </video>
                            ) : null
                          ) : (
                            msg.message
                          )}

                          {msg.reactions && msg.reactions.length > 0 && (
                            <div
                              className={`absolute bottom-[-15px] text-sm flex items-center gap-1 px-2 py-1 rounded-full bg-transparent  ${
                                msg.sender === userId ? "left-0" : "right-0"
                              }`}
                            >
                              {msg.reactions.map((react, idk) => (
                                <span key={idk}>{react.reaction}</span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Reaction Button (Inside Message Bubble, Centered & Close) */}
                        <button
                          className={`absolute top-1/2 -translate-y-1/2 ${
                            msg.sender === userId
                              ? "left-0 -translate-x-1/2"
                              : " right-0 translate-x-1/2"
                          } bg-gray-200 p-1 rounded-full hover:bg-gray-300 transition cursor-pointer`}
                          onClick={() =>
                            setIsEmojiOpen(isEmojiOpen === index ? null : index)
                          }
                        >
                          <GrEmoji />
                        </button>
                      </div>

                      {/* Show sender's avatar for sent messages */}
                      {msg.sender === userId && (
                        <img
                          src={"https://randomuser.me/api/portraits/men/1.jpg"}
                          alt="User"
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                    </div>
                  ))
                )}

                <div ref={scrollBottomRef} />
              </div>
            </div>

            {/* Chat Input */}
            <form onSubmit={sendMessage} className="w-full">
              <div className="p-4 border-t flex flex-col sm:flex-row items-center gap-2">
                {/* File Preview Section - Full Width on Mobile */}
                {selectedFile && (
                  <div className="w-full flex items-center justify-between gap-2 p-2 bg-gray-100 rounded-md mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      {selectedFile.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(selectedFile)}
                          alt="preview"
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      ) : (
                        <span className="text-gray-700 truncate max-w-[150px]">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => setSelectedFile(null)}
                    >
                      <AiOutlineCloseCircle size={20} />
                    </button>
                  </div>
                )}

                {/* Input Container - Responsive Flex */}
                <div className="w-full flex items-center space-x-2">
                  {/* File Upload Button */}
                  <div className="flex-shrink-0">
                    <label className="cursor-pointer">
                      <span className="cursor-pointer p-2 inline-block">
                        <FaPaperclip
                          size={24}
                          className="text-gray-600 hover:text-gray-800 transition"
                        />
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                    </label>
                  </div>

                  {/* Text Input - Flexible Width */}
                  <div className="flex-grow">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      disabled={!!selectedFile}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200"
                    />
                  </div>

                  {/* Send Button - Responsive Size */}
                  <div className="flex-shrink-0">
                    <button
                      type="submit"
                      className="bg-indigo-400 text-white px-4 sm:px-6 py-2 rounded-full hover:bg-indigo-600 transition duration-300 
          flex items-center justify-center space-x-2 text-sm sm:text-base"
                    >
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
      {incomingCall && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-100">
            <h2 className="text-lg font-semibold text-center text-gray-800">
              Incoming Call
            </h2>
            <p className="text-gray-600 mt-2">{incomingCall.callType} call</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  acceptCall();
                }}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={() => {
                  rejectCall();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>
  );
};

export default ChatApp;
