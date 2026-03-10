'use client';

import React, { createContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export interface AIResponse {
  answer: string;
  simpleExplanation: string;
  keyPoints: string[];
  source: string;
}

interface ChatContextType {
  messages: Message[];
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  clearMessages: () => void;
  aiResponse: AIResponse | null;
  setAIResponse: (response: AIResponse) => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiResponse, setAIResponse] = useState<AIResponse | null>(null);

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
    setAIResponse(null);
  };

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, aiResponse, setAIResponse }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
