'use client';

interface ChatMessageProps {
  type: 'user' | 'ai';
  content: string;
}

export default function ChatMessage({ type, content }: ChatMessageProps) {
  return (
    <div
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4 py-3 rounded-lg text-base ${
          type === 'user'
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-slate-100 text-slate-900 rounded-bl-none'
        }`}
      >
        {content}
      </div>
    </div>
  );
}
