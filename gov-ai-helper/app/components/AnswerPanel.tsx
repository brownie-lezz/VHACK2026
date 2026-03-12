'use client';

import { useState } from 'react';
import { FiCheck, FiCopy, FiRefreshCw, FiThumbsUp, FiSmile, FiMeh, FiFrown, FiTarget, FiBook } from 'react-icons/fi';
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
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const simplifyText = (text: string, level: ReadingLevel): string => {
    if (level === 'normal') return text;
    if (level === 'verysimple') {
      // Remove complex sentences, keep simple points
      return text.split('.')[0] + '.';
    }
    return text;
  };

  const handleCopyToClipboard = () => {
    const text = `${response.answer}\n\n${response.simpleExplanation}\n\nKey Points:\n${response.keyPoints.join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: string) => {
    setFeedback(type);
    setTimeout(() => setFeedback(null), 2000);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-300 overflow-hidden shadow-lg">
      {/* Header with Reading Level Toggle */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-6 py-5 border-b border-slate-600">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <FiCheck className="text-green-400" /> Answer Found
          </h2>
          <div className="flex gap-2 flex-wrap">
            {(['normal', 'simple', 'verysimple'] as ReadingLevel[]).map((level) => (
              <button
                key={level}
                onClick={() => setReadingLevel(level)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                  readingLevel === level
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'bg-slate-600 text-gray-200 hover:bg-slate-500'
                }`}
              >
                {t(level)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Answer Section */}
      <div className="p-6 sm:p-8 border-b border-slate-300 bg-white">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <FiTarget className="text-teal-600" /> {t('answer')}
        </h3>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed whitespace-pre-wrap">
          {simplifyText(response.answer, readingLevel)}
        </p>
      </div>

      {/* Simple Explanation */}
      <div className="p-6 sm:p-8 border-b border-slate-300 bg-blue-50">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
          <FiBook className="text-blue-600" /> {t('simpleExplanation')}
        </h3>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
          {simplifyText(response.simpleExplanation, readingLevel)}
        </p>
      </div>

      {/* Key Points */}
      <div className="p-6 sm:p-8 border-b border-slate-300 bg-white">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FiTarget className="text-teal-600" /> {t('keyPoints')}
        </h3>
        <ul className="space-y-3">
          {response.keyPoints.map((point, index) => (
            <li key={index} className="flex gap-3 text-base sm:text-lg text-slate-700 items-start">
              <FiCheck className="font-bold text-teal-600 flex-shrink-0 mt-0.5 text-lg" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Source */}
      <div className="p-6 sm:p-8 border-b border-slate-300 bg-slate-50">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
          <FiBook className="text-slate-600" /> {t('source')}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 italic border-l-4 border-teal-500 pl-4">
          {response.source}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="p-6 sm:p-8 bg-white space-y-3">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleCopyToClipboard}
            className="flex-1 min-w-max px-4 sm:px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <FiCopy /> {copied ? 'Copied!' : 'Copy Answer'}
          </button>
          {onAskAnother && (
            <button
              onClick={onAskAnother}
              className="flex-1 min-w-max px-4 sm:px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
            >
              <FiRefreshCw /> {t('anotherQuestion')}
            </button>
          )}
        </div>

        {/* Feedback Section */}
        <div className="pt-4 border-t border-slate-300">
          <p className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <FiThumbsUp /> Was this helpful?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleFeedback('helpful')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                feedback === 'helpful'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-green-100'
              }`}
            >
              <FiSmile /> Yes
            </button>
            <button
              onClick={() => handleFeedback('neutral')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                feedback === 'neutral'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-yellow-100'
              }`}
            >
              <FiMeh /> Neutral
            </button>
            <button
              onClick={() => handleFeedback('unhelpful')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                feedback === 'unhelpful'
                  ? 'bg-red-500 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-red-100'
              }`}
            >
              <FiFrown /> No
            </button>
          </div>
          {feedback && (
            <p className="text-xs text-slate-600 mt-2 text-center">
              Thank you for your feedback!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
