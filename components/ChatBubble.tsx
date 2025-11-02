
import React from 'react';
import { ChatMessage, MessageRole } from '../types';

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  const bubbleClasses = isUser
    ? 'bg-blue-100 text-blue-900 self-end rounded-br-none'
    : 'bg-white text-gray-800 self-start rounded-bl-none border border-slate-200';
  
  const containerClasses = isUser ? 'flex justify-end' : 'flex justify-start';

  return (
    <div className={containerClasses}>
      <div className={`max-w-xl md:max-w-2xl p-4 rounded-2xl shadow-sm ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap">{message.parts[0].text}</p>
      </div>
    </div>
  );
};

export default ChatBubble;
