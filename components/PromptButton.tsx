
import React from 'react';

interface PromptButtonProps {
  title: string;
  prompt: string;
  onClick: (prompt: string) => void;
}

const PromptButton: React.FC<PromptButtonProps> = ({ title, prompt, onClick }) => {
  return (
    <button
      onClick={() => onClick(prompt)}
      className="text-sm text-right p-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 hover:border-blue-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <h3 className="font-bold text-blue-800">{title}</h3>
      <p className="text-gray-600 mt-1">{prompt}</p>
    </button>
  );
};

export default PromptButton;
