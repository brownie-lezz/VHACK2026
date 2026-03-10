'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto max-w-4xl mx-auto w-full px-4 py-6 sm:py-8">
        {/* Chat Messages */}
        {messages.map((message) => (
          <ChatMessage key={message.id} type={message.type} content={message.content} />
        ))}

        {/* Answer Panel */}
        {aiResponse && (
          <div className="mt-8 mb-8">
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
