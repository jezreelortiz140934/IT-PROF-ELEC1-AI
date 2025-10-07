import React from 'react';
import { useState } from 'react';
import { askAI } from './lib/ai'; 

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const aiResponse = await askAI(prompt);
      setResponse(aiResponse);
    } catch (error) {
      console.error("AI request failed:", error);
      setResponse("Sorry, there was an error processing your request.");
    } finally {
      setPrompt('');
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6 md:p-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight">
          🤖 AI Chat Interface
        </h1>
        
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            value={prompt}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={isLoading ? "Please wait..." : "Enter your prompt..."}
            className="flex-grow border-2 border-gray-200 focus:border-blue-500 px-5 py-3 rounded-xl text-gray-700 placeholder-gray-400 transition duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : "Submit"}
          </button>
        </form>
        
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 min-h-[100px] overflow-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-2 border-b pb-1 border-gray-200">
            AI Response
          </h2>
          <p className={`text-gray-700 whitespace-pre-wrap ${response ? 'text-base' : 'text-gray-500 italic'}`}>
            {response || "Your AI response will appear here."}
          </p>
        </div>
      </div>
    </div>
  );
}
