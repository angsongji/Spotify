import React, { useState, useEffect, useRef } from "react";

const ChatBox = ({ roomName, sender }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [receiver, setReceiver] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    // Kết nối WebSocket với Daphne đang chạy tại 127.0.0.1:8080
    socketRef.current = new WebSocket(`ws://127.0.0.1:8080/ws/chat/${roomName}/`);

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onclose = () => {
      console.warn("WebSocket disconnected");
    };

    socketRef.current.onerror = (e) => {
      console.error("WebSocket error:", e);
    };

    return () => {
      socketRef.current.close();
    };
  }, [roomName]);

  const sendMessage = () => {
    if (input.trim() !== "" && receiver.trim() !== "") {
      socketRef.current.send(JSON.stringify({
        message: input,
        sender: sender,
        receiver: receiver,
      }));
      setInput("");
    }
  };

  return (
    <div className="chat-box bg-white text-black p-4 w-75 fixed bottom-20 right-4 shadow-lg rounded-lg">
      <div className="h-48 overflow-y-auto border-b mb-2">
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender}:</strong> {msg.message}</div>
        ))}
      </div>

      <input
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        className="w-full p-1 border mb-1"
        placeholder="Người nhận (username hoặc ID)"
      />

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full p-1 border"
        placeholder="Nhắn tin..."
      />

      <button onClick={sendMessage} className="mt-2 bg-blue-500 text-white px-2 py-1 rounded w-full">
        Gửi
      </button>
    </div>
  );
};

export default ChatBox;
