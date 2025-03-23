
import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, Paperclip } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';

const Assistant = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage = {
      id: 1,
      text: "Hello, I'm your legal assistant. I can help you find case information, retrieve documents, and answer legal queries. How may I assist you today?",
      isUser: false,
      timestamp: new Date().toISOString(),
    };
    
    setTimeout(() => {
      setMessages([welcomeMessage]);
    }, 500);
    
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    const newUserMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    
    // No AI response will be generated as per requirement
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    
    // Simulate voice recognition
    if (!isListening) {
      // Start listening
      setTimeout(() => {
        setIsListening(false);
        setInput("Show all labor law cases from 2015");
      }, 2000);
    }
  };

  const clearChat = () => {
    setMessages([]);
    
    // Add welcome message again
    setTimeout(() => {
      const welcomeMessage = {
        id: Date.now(),
        text: "Hello, I'm your legal assistant. I can help you find case information, retrieve documents, and answer legal queries. How may I assist you today?",
        isUser: false,
        timestamp: new Date().toISOString(),
      };
      setMessages([welcomeMessage]);
    }, 300);
  };

  // Suggested queries
  const suggestedQueries = [
    "Show all labor law cases from 2015",
    "Find GRs related to workplace safety in chemical industries",
    "What's the status of maternity benefit extension case?",
    "Retrieve minimum wage guidelines for textile workers"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-[1500px] mx-auto h-[calc(100vh-4rem)] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
          <div>
            <h1 className="text-xl font-bold text-gray-900">AI Legal Assistant</h1>
            <p className="text-sm text-gray-500">Ask me about legal cases, GRs, and documents</p>
          </div>
          <button 
            onClick={clearChat}
            className="flex items-center px-3 py-2 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg"
          >
            <span>New Chat</span>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 bg-gradient-to-b from-gray-50 to-white">
          {messages.length === 0 ? (
            <div className="max-w-3xl mx-auto h-full flex flex-col items-center justify-center pb-20">
              <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-6 animate-float">
                <div className="text-4xl">👨‍⚖️</div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Your AI Legal Assistant
              </h2>
              <p className="text-gray-500 mb-8 text-center max-w-md">
                I can help retrieve case information, find legal documents, and answer queries about laws and regulations.
              </p>
              
              <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3">
                {suggestedQueries.map((query, index) => (
                  <button
                    key={index}
                    className="text-sm text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-left transition-colors shadow-sm hover:shadow animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setInput(query);
                      inputRef.current?.focus();
                    }}
                  >
                    {query}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.text}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <button
                  type="button"
                  className="p-3 text-gray-400 hover:text-gray-600"
                >
                  <Paperclip className="w-5 h-5" />
                </button>
                
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your query about legal cases, GRs, or documents..."
                  className="flex-1 px-4 py-3 focus:outline-none text-gray-700"
                />
                
                <button
                  type="button"
                  onClick={toggleVoiceInput}
                  className={`p-3 ${
                    isListening 
                      ? 'text-red-500 animate-pulse-slow'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                
                <button
                  type="submit"
                  disabled={input.trim() === ''}
                  className={`p-3 ${
                    input.trim() === ''
                      ? 'text-gray-300'
                      : 'text-blue-600 hover:text-blue-700'
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
            <p className="text-xs text-gray-400 mt-2 text-center">
              Your data is processed securely in compliance with government regulations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
