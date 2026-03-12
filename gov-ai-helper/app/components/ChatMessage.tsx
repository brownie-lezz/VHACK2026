'use client';

import { FiCpu } from 'react-icons/fi';

interface ChatMessageProps {
  type: 'user' | 'ai';
  content: string;
}

export default function ChatMessage({ type, content }: ChatMessageProps) {
  return (
    <div
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-5 py-4 rounded-2xl text-base shadow-md transition-all ${
          type === 'user'
            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-br-none font-medium'
            : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200 font-normal'
        }`}
      >
        <div className="flex gap-2 items-start">
          {type === 'ai' && <FiCpu className="text-lg flex-shrink-0 mt-0.5" />}
          <span className="whitespace-pre-wrap">{content}</span>
        </div>
      </div>
    </div>
  );
}
