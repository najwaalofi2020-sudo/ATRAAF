
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage, MessageRole } from './types';
import { generateResponse } from './services/geminiService';
import { PREDEFINED_PROMPTS, WELCOME_MESSAGE } from './constants';
import Header from './components/Header';
import ChatBubble from './components/ChatBubble';
import PromptButton from './components/PromptButton';
import LoadingSpinner from './components/LoadingSpinner';
import SendIcon from './components/icons/SendIcon';
import AboutInitiative from './components/AboutInitiative';

const App: React.FC = () => {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: MessageRole.MODEL, parts: [{ text: WELCOME_MESSAGE }] },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isLoading) return;

    const newUserMessage: ChatMessage = {
      role: MessageRole.USER,
      parts: [{ text: message }],
    };

    setChatHistory((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
    setError(null);

    try {
      const modelResponse = await generateResponse([...chatHistory, newUserMessage]);
      const newModelMessage: ChatMessage = {
        role: MessageRole.MODEL,
        parts: [{ text: modelResponse }],
      };
      setChatHistory((prev) => [...prev, newModelMessage]);
    } catch (err) {
      const errorMessage = 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى.';
      setError(errorMessage);
       const newErrorMessage: ChatMessage = {
        role: MessageRole.MODEL,
        parts: [{ text: errorMessage }],
      };
      setChatHistory((prev) => [...prev, newErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatHistory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(userInput);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 text-gray-800">
      <Header />
      <main ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
            {chatHistory.map((msg, index) => (
              <div key={index} className="mb-6">
                <ChatBubble message={msg} />
              </div>
            ))}

            {chatHistory.length <= 1 && (
              <div>
                <AboutInitiative />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
                    {PREDEFINED_PROMPTS.map((prompt) => (
                        <PromptButton key={prompt.title} title={prompt.title} prompt={prompt.prompt} onClick={handleSendMessage} />
                    ))}
                </div>
              </div>
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <LoadingSpinner />
                  <p className="text-gray-500">المساعد يكتب...</p>
                </div>
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
        </div>
      </main>
      <footer className="bg-white border-t border-slate-200 p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2 space-x-reverse bg-slate-100 rounded-full border border-slate-300 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 p-3 bg-transparent border-none rounded-full focus:outline-none focus:ring-0 text-gray-700 placeholder-gray-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="p-3 text-white bg-blue-700 rounded-full hover:bg-blue-800 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              aria-label="إرسال"
            >
              <SendIcon />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default App;
