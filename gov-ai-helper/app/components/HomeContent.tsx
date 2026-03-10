'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import VoiceButton from './VoiceButton';
import { useLanguage } from '@/app/context/LanguageContext';
import { useChat } from '@/app/context/ChatContext';

const exampleQuestions = {
  en: [
    'Can I apply for financial aid?',
    'What are government housing programs?',
    'How do I get medical assistance?',
  ],
  bm: [
    'Saya boleh dapat bantuan kewangan?',
    'Apakah program perumahan kerajaan?',
    'Bagaimana cara mendapatkan bantuan perubatan?',
  ],
  id: [
    'Bisakah saya mendapatkan bantuan keuangan?',
    'Apa saja program perumahan pemerintah?',
    'Bagaimana cara mendapatkan bantuan medis?',
  ],
  fil: [
    'Maaari ba akong maglapat para sa tulong sa pananalapi?',
    'Ano ang mga programa ng government housing?',
    'Paano ko makakakuha ng medikal na tulong?',
  ],
  vi: [
    'Tôi có thể xin trợ cấp tài chính không?',
    'Các chương trình nhà ở của chính phủ là gì?',
    'Làm cách nào tôi có thể nhận được trợ giúp y tế?',
  ],
  zh: [
    '我可以申请财政援助吗？',
    '政府住房计划是什么？',
    '我如何获得医疗援助？',
  ],
};

const commonQuestions = {
  en: ['Financial Aid', 'Medical Help', 'Housing Support'],
  bm: ['Bantuan Kewangan', 'Bantuan Perubatan', 'Sokongan Perumahan'],
  id: ['Bantuan Keuangan', 'Bantuan Medis', 'Dukungan Perumahan'],
  fil: ['Tulong sa Pananalapi', 'Tulong Medikal', 'Suporta sa Malalaking Bahay'],
  vi: ['Trợ cấp Tài chính', 'Trợ giúp Y tế', 'Hỗ trợ Nhà ở'],
  zh: ['财政援助', '医疗帮助', '住房支持'],
};

export default function HomeContent() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { addMessage, setAIResponse } = useChat();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleAskQuestion = async (question: string) => {
    if (!question.trim()) return;

    setIsLoading(true);
    addMessage({ type: 'user', content: question });

    // Navigate to chat page - backend will provide AI response
    setTimeout(() => {
      setIsLoading(false);
      router.push('/chat');
    }, 300);
  };

  const handleVoiceTranscript = (text: string) => {
    setInput(text);
  };

  const handleExampleQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 mt-3">
            {t('tagline')}
          </p>
        </div>

        {/* Main Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 mb-8 sm:mb-12">
          {/* Voice Input */}
          <div className="mb-6">
            <VoiceButton onTranscript={handleVoiceTranscript} />
          </div>

          {/* Or Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-sm sm:text-base text-slate-500 font-medium">{t('or')}</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleAskQuestion(input);
                }
              }}
              placeholder={t('inputPlaceholder')}
              disabled={isLoading}
              className="w-full px-4 sm:px-6 py-4 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base sm:text-lg text-slate-900 placeholder-slate-500 font-medium"
            />
          </div>

          {/* Ask Button */}
          <button
            onClick={() => handleAskQuestion(input)}
            disabled={isLoading || !input.trim()}
            className="w-full px-6 py-4 bg-teal-500 hover:bg-teal-600 disabled:bg-slate-300 text-white font-bold rounded-lg text-base sm:text-lg transition-colors"
          >
            {isLoading ? 'Processing...' : t('askAI')}
          </button>
        </div>

        {/* Example Questions Section */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            {t('exampleQuestions')}
          </h2>
          <div className="space-y-2 sm:space-y-3">
            {exampleQuestions[language as keyof typeof exampleQuestions].map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    handleExampleQuestion(question);
                  }}
                  className="w-full text-left px-4 py-3 sm:py-4 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg text-base sm:text-lg text-slate-900 font-medium transition-colors"
                >
                  • {question}
                </button>
              )
            )}
          </div>
        </div>

        {/* Common Questions */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4">
            {t('commonQuestions')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {commonQuestions[language as keyof typeof commonQuestions].map(
              (question, index) => (
                <button
                  key={index}
                  className="px-4 py-3 sm:py-4 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg text-sm sm:text-base text-slate-900 font-semibold transition-colors"
                >
                  {question}
                </button>
              )
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
