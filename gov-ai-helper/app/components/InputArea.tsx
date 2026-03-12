'use client';

import { useState } from 'react';
import { FiMic, FiHelpCircle, FiMessageCircle, FiEdit } from 'react-icons/fi';
import VoiceButton from './VoiceButton';
import { useLanguage } from '@/app/context/LanguageContext';

interface InputAreaProps {
  onSubmit: (question: string) => void;
  disabled?: boolean;
}

export default function InputArea({ onSubmit, disabled = false }: InputAreaProps) {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [showTip, setShowTip] = useState(false);

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
    <div className="bg-white border-t-2 border-slate-300 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* Voice Button */}
          <div>
            <label className="text-xs sm:text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
              <FiMic /> Voice Input
            </label>
            <VoiceButton onTranscript={handleVoiceTranscript} />
          </div>

          {/* Or Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium">{t('or')}</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Text Input with tip */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-2">
                <FiEdit /> Type Your Question
              </label>
              <button
                type="button"
                onClick={() => setShowTip(!showTip)}
                className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
              >
                <FiHelpCircle className="text-sm" /> Tip
              </button>
            </div>

            {showTip && (
              <div className="mb-3 p-3 bg-amber-50 border border-amber-300 rounded-lg">
                <p className="text-xs sm:text-sm text-amber-900">
                  <strong>Pro tip:</strong> Ask specific questions for better answers. Example: "What documents do I need to apply for a housing loan?" instead of "housing"
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('inputPlaceholder')}
                disabled={disabled}
                className="flex-1 px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none text-base text-slate-900 placeholder-slate-500 font-medium transition-all"
                rows={3}
              />
            </div>

            {/* Character count and helpers */}
            <div className="flex items-center justify-between mt-2 flex-wrap gap-2">
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <FiMessageCircle className="text-sm" /> {input.length} characters
              </p>
              <div className="flex gap-2 text-xs">
                {input.length < 10 && input.length > 0 && (
                  <span className="text-amber-600">Add more detail for better results</span>
                )}
              </div>
            </div>
          </div>

          {/* Ask Button */}
          <button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-lg text-base sm:text-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
          >
            <FiMessageCircle /> {t('askAI')}
          </button>

          {/* Quick help section */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs sm:text-sm text-slate-700 font-medium mb-2 flex items-center gap-2">
              <FiHelpCircle /> Need help?
            </p>
            <ul className="text-xs text-slate-600 space-y-1">
              <li>• Click examples on the home page to get started</li>
              <li>• Use Shift+Enter for new line in your question</li>
              <li>• Adjust reading level in the answer section</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
