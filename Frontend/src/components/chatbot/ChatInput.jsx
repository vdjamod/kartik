import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex items-center border-t border-gray-300 p-3">
      <input
        type="text"
        className="flex-1 border-none outline-none px-3 py-2 rounded-lg bg-gray-100"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="ml-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
