
import React, { useState } from 'react';
import { Search, Mic } from 'lucide-react';

const SearchBar = ({ placeholder, fullWidth = false, onSearch, voiceEnabled = true }) => {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(query);
  };

  const toggleVoiceRecognition = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here in a real app
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
      }, 3000); // Simulate listening for 3 seconds
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${fullWidth ? 'w-full' : 'max-w-md'}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
        <input
          type="search"
          className="block w-full p-4 pl-10 pr-20 text-sm text-gray-900 border border-gray-200 rounded-lg bg-white/70 backdrop-blur-sm focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm hover:shadow"
          placeholder={placeholder || "Search for cases, documents..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {voiceEnabled && (
          <button
            type="button"
            onClick={toggleVoiceRecognition}
            className={`absolute right-20 bottom-2.5 top-2.5 px-3 rounded-md ${
              isListening ? 'bg-red-50 text-red-500 animate-pulse-slow' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            <Mic className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
