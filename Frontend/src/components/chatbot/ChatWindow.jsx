import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import axios from "axios";

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const filterMessage = (text) => {
    return text.replace(/\*/g, ''); // Removes all instances of '**'
  };

  const sendMessage = async (text) => {
    // console.log(text);
    const userMessage = { message: text, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axios.post("/api/chat/get-solution", {
        text: text,
      });
      
      const botMessage = { message: filterMessage(res.data), isUser: false };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log(error);
      const errorMessage = { message: "Something went wrong!", isUser: false };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen">
      {/* Scrollable messages area */}
      <div className="flex-1 overflow-y-auto p-3 bg-gray-100">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg.message} isUser={msg.isUser} />
        ))}
        {/* Invisible element to ensure scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed input area */}
      <div className="sticky bottom-0 bg-white shadow-md">
        <ChatInput onSend={sendMessage} />
      </div>
    </div>
  );
};

export default ChatWindow;
