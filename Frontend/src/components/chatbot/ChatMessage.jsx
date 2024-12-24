import React from 'react';

const ChatMessage = ({ message, isUser }) => {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2 px-4`}
    >
      <div
        className={`
          max-w-[75%] md:max-w-[60%] lg:max-w-[50%] 
          p-4 rounded-lg shadow-sm 
          ${isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-black rounded-bl-none'}
        `}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatMessage;
