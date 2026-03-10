'use client';

import { useState } from 'react';
import { AIResponse } from '@/app/context/ChatContext';
import { useLanguage } from '@/app/context/LanguageContext';

type ReadingLevel = 'normal' | 'simple' | 'verysimple';

interface AnswerPanelProps {
  response: AIResponse;
  onAskAnother?: () => void;
}

export default function AnswerPanel({ response, onAskAnother }: AnswerPanelProps) {
  const { t } = useLanguage();
  const [readingLevel, setReadingLevel] = useState<ReadingLevel>('normal');

  const simplifyText = (text: string, level: ReadingLevel): string => {
    if (level === 'normal') return text;
    if (level === 'verysimple') {
      // Remove complex sentences, keep simple points
      return text.split('.')[0] + '.';
    }
    return text;
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
      {/* Reading Level Toggle */}
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm font-semibold text-slate-700">
            {t('readingLevel')}
          </p>
          <div className="flex gap-2">
            {(['normal', 'simple', 'verysimple'] as ReadingLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setReadingLevel(level)}
                className={`px-3 py-1 text-xs sm:text-sm font-medium rounded transition-colors ${
                  readingLevel === level
                    ? 'bg-teal-500 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t(level)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          {t('answer')}
        </h3>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {simplifyText(response.answer, readingLevel)}
        </p>
      </div>

      {/* Simple Explanation */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-blue-50">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
          {t('simpleExplanation')}
        </h3>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {simplifyText(response.simpleExplanation, readingLevel)}
        </p>
      </div>

      {/* Key Points */}
      <div className="p-4 sm:p-6 border-b border-slate-200">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
          {t('keyPoints')}
        </h3>
        <ul className="space-y-2">
          {response.keyPoints.map((point, index) => (
            <li key={index} className="flex gap-3 text-sm sm:text-base text-slate-700">
              <span className="font-bold text-teal-500 flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Source */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
          {t('source')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 italic">
          {response.source}
        </p>
      </div>

      {/* Action Button */}
      {onAskAnother && (
        <div className="p-4 sm:p-6">
          <button
            onClick={onAskAnother}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg text-base sm:text-lg transition-colors"
          >
            {t('anotherQuestion')}
          </button>
        </div>
      )}
    </div>
  );
}
