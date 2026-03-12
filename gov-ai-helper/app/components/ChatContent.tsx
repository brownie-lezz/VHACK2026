'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FiHelpCircle, FiClock } from 'react-icons/fi';
import ChatMessage from './ChatMessage';
import AnswerPanel from './AnswerPanel';
import InputArea from './InputArea';
import { useChat } from '@/app/context/ChatContext';

export default function ChatContent() {
  const router = useRouter();
  const { messages, aiResponse, addMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAskAnother = () => {
    // Clear current conversation and go back to home
    router.push('/');
  };

  const handleNewQuestion = (question: string) => {
    addMessage({ type: 'user', content: question });
    // Simulate API response
    setTimeout(() => {
      // The response would be set by the backend
    }, 500);
  };

  if (!aiResponse) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-center">
        <div className="text-center">
          <FiClock className="text-5xl mb-4 animate-pulse mx-auto text-teal-500" />
          <p className="text-slate-600 text-lg font-medium">Loading your answer...</p>
          <p className="text-slate-500 text-sm mt-2">This should only take a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-8 sm:py-10">
        {/* Header info */}
        <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm text-slate-700 flex items-start gap-2">
            <FiHelpCircle className="text-lg flex-shrink-0 mt-0.5" />
            <span>You can ask follow-up questions below to get more detailed information.</span>
          </p>
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <ChatMessage key={message.id} type={message.type} content={message.content} />
        ))}

        {/* Answer Panel */}
        {aiResponse && (
          <div className="mt-10 mb-8 animate-fade-in">
            <AnswerPanel response={aiResponse} onAskAnother={handleAskAnother} />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <InputArea onSubmit={handleNewQuestion} />
    </div>
  );
}
