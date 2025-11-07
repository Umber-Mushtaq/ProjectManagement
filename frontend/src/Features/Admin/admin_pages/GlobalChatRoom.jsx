import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { withCredentials: true });

export default function GlobalChatRoom() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // ✅ Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Setup socket connection
  useEffect(() => {
    const storedUser =
      JSON.parse(localStorage.getItem("Admin")) ||
      JSON.parse(localStorage.getItem("User"));

    if (storedUser?._id) {
      socket.emit("register", storedUser._id);
      console.log(`Registered user: ${storedUser.firstName}`);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
      socket.disconnect();
    };
  }, []);

  // ✅ Send message handler
  const sendMessage = () => {
    const storedUser =
      JSON.parse(localStorage.getItem("Admin")) ||
      JSON.parse(localStorage.getItem("User"));

    if (message.trim() && storedUser?._id) {
      const msg = {
        userId: storedUser._id,
        name: storedUser.firstName,
        message,
        timestamp: new Date(),
      };

      socket.emit("sendMessage", msg);
      setMessage("");
    }
  };

  return (
    <div className='p-4 w-full  px-10 py-5 flex flex-col justify-baseline '>
      {/* Chat Messages */}
      <div className='h-150 overflow-y-scroll scroll-hidden'>
        {messages.length === 0 && (
          <p className='text-gray-400 text-center mt-10'>
            No messages yet. Start the conversation!
          </p>
        )}

        {messages.map((msg, i) => {
          const storedUser =
            JSON.parse(localStorage.getItem("Admin")) ||
            JSON.parse(localStorage.getItem("User"));
          const isSender = msg.userId === storedUser?._id;

          return (
            <div
              key={i}
              className={`my-2 flex ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 max-w-[75%] rounded-lg shadow-sm ${
                  isSender
                    ? "bg-purple-500 text-white rounded-br-none"
                    : "bg-white border rounded-bl-none"
                }`}
              >
                {!isSender && (
                  <p className='text-sm font-semibold text-purple-600 mb-1'>
                    {msg.name}
                  </p>
                )}
                <p>{msg.message}</p>
                <p className='text-[10px] text-right mt-1'>
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input & Button */}
      <div className='fixed bottom-3 right-5 left-23 flex gap-2'>
        <input
          className='border border-purple-500 p-2 flex-1 rounded outline-none '
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Type a message...'
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded transition-colors'
        >
          Send
        </button>
      </div>
    </div>
  );
}
