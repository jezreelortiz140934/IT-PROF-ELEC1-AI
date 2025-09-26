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
    setIsLoading(true);
    const response = await askAI(prompt);
    setResponse(response);
    setPrompt('');
    setIsLoading(false);
  };

  return (
    <div>
      <input value={prompt} onChange={handleInputChange} placeholder="Enter your prompt:" className="border px-5 py-2 rounded text-center" />
      <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 space-x-0.5">{isLoading ? "Generating" : "Submit"}</button>
      <p>{response}</p>
    </div>
  );
} 