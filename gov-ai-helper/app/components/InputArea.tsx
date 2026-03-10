'use client';

import { useState } from 'react';
import VoiceButton from './VoiceButton';
import { useLanguage } from '@/app/context/LanguageContext';

interface InputAreaProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function InputArea({ onSubmit, disabled = false }: InputAreaProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim()) {
      onSubmit(input);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(text);
  };

  return (
    <div className="bg-white border-t border-slate-200 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3">
          {/* Voice Button */}
          <VoiceButton onTranscript={handleVoiceTranscript} />

          {/* Or Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">{t('or')}</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Text Input */}
          <div className="flex gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('inputPlaceholder')}
              disabled={disabled}
              className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-base text-slate-900 placeholder-slate-500"
              rows={3}
            />
          </div>

          {/* Ask Button */}
          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-semibold rounded-lg text-base sm:text-lg transition-colors"
          >
            {t('askAI')}
          </button>
        </div>
      </div>
    </div>
  );
}
