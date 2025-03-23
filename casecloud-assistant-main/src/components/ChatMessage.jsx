
import React from 'react';
import { User, Bot } from 'lucide-react';

const ChatMessage = ({ message, isUser, isLoading, timestamp }) => {
  const formattedTime = new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  if (isLoading) {
    return (
      <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
            ${isUser ? 'bg-blue-600 ml-3' : 'bg-gray-200 mr-3'}`}
          >
            {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
          </div>
          
          <div className={`p-3 rounded-2xl ${
            isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex w-full mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center 
          ${isUser ? 'bg-blue-600 ml-3' : 'bg-gray-200 mr-3'}`}
        >
          {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600" />}
        </div>
        
        <div>
          <div className={`p-4 rounded-2xl ${
            isUser ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 text-gray-800 rounded-tl-none'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message}</p>
          </div>
          <div className={`mt-1 text-xs text-gray-400 ${isUser ? 'text-right' : 'text-left'}`}>
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
