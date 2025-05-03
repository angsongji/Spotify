import { useEffect, useState, useRef } from "react";
import Pusher from "pusher-js";

function ChatComponent({ username }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(true); // trạng thái mở/tắt

  const allMessagesRef = useRef([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const pusher = new Pusher("59ea6e2323dd079fa5e4", {
      cluster: "ap1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      allMessagesRef.current.push(data);
      setMessages([...allMessagesRef.current]);
    });

    return () => {
      channel.unbind_all();
      pusher.unsubscribe("chat");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, message }),
    });
    setMessage("");
  };

  if (!isOpen) return null; // không render gì nếu đã tắt

  return (
    <div className="fixed bottom-5 right-5 w-[350px] h-[500px] bg-[#1e1e2f] shadow-xl rounded-lg flex flex-col border border-[#333] overflow-hidden z-50">
      {/* Header */}
      <div className="bg-blue-900 text-white p-3 text-lg font-semibold flex justify-between items-center">
        <span>Chat</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-red-400 text-xl font-bold"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto bg-[#2a2a3d] space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.username === username ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg max-w-[80%] text-sm ${
                msg.username === username
                  ? "bg-blue-500 text-white"
                  : "bg-[#444] text-gray-200"
              }`}
            >
              <div>{msg.message}</div>
              <div className="text-xs mt-1 opacity-70">{msg.username}</div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <form
        onSubmit={submit}
        className="flex p-2 border-t border-[#333] bg-[#1e1e2f]"
      >
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 px-3 py-2 bg-[#333] text-white border border-[#555] rounded-full text-sm focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-900 text-white px-4 py-2 rounded-full text-sm hover:bg-blue-700"
        >
          Gửi
        </button>
      </form>
    </div>
  );
}

export default ChatComponent;
