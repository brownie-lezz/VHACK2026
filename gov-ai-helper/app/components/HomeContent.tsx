'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiMic, FiEdit, FiArrowRight, FiTag, FiHelpCircle, FiInfo, FiLock, FiGlobe } from 'react-icons/fi';
import { FiLoader } from 'react-icons/fi';
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white flex flex-col">
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
            {t('title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mt-4 max-w-2xl mx-auto">
            {t('tagline')}
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-10 p-4 sm:p-6 bg-blue-100 border-l-4 border-blue-500 rounded-lg">
          <p className="text-sm sm:text-base text-slate-700 flex items-start gap-3">
            <FiInfo className="text-lg flex-shrink-0 mt-0.5" />
            <span>
              <strong>Pro tip:</strong> Be specific with your questions to get better answers. For example, "What benefits can I apply for as a student?" rather than just "benefits".
            </span>
          </p>
        </div>

        {/* Main Input Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 mb-10 sm:mb-14 border border-slate-200">
          {/* Voice Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <FiMic /> Speak or Type Your Question
            </label>
            <VoiceButton onTranscript={handleVoiceTranscript} />
          </div>

          {/* Or Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-300"></div>
            <span className="text-xs sm:text-sm text-slate-500 font-medium px-2">{t('or')}</span>
            <div className="flex-1 h-px bg-slate-300"></div>
          </div>

          {/* Text Input */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
              <FiEdit /> Type Your Question
            </label>
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
              className="w-full px-6 py-4 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent text-base sm:text-lg text-slate-900 placeholder-slate-500 font-medium transition-all"
            />
            <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
              <FiEdit className="text-sm" /> {input.length} characters
            </p>
          </div>

          {/* Ask Button */}
          <button
            onClick={() => handleAskQuestion(input)}
            disabled={isLoading || !input.trim()}
            className="w-full px-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:from-slate-300 disabled:to-slate-400 text-white font-bold rounded-lg text-base sm:text-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <FiLoader className="animate-spin" /> Processing...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <FiArrowRight /> {t('askAI')}
              </span>
            )}
          </button>
        </div>

        {/* Example Questions Section */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiHelpCircle /> {t('exampleQuestions')}
          </h2>
          <div className="space-y-3 sm:space-y-4">
            {exampleQuestions[language as keyof typeof exampleQuestions].map(
              (question, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setInput(question);
                    handleExampleQuestion(question);
                  }}
                  className="w-full text-left px-5 py-4 sm:py-5 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border-2 border-blue-200 hover:border-blue-300 rounded-lg text-base sm:text-lg text-slate-900 font-medium transition-all shadow-sm hover:shadow-md"
                >
                  <span className="flex items-center gap-3">
                    <FiArrowRight className="text-teal-600" />
                    {question}
                  </span>
                </button>
              )
            )}
          </div>
        </div>

        {/* Common Questions */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiTag /> {t('commonQuestions')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {commonQuestions[language as keyof typeof commonQuestions].map(
              (question, index) => (
                <button
                  key={index}
                  className="px-6 py-5 sm:py-6 bg-gradient-to-br from-slate-100 to-slate-50 hover:from-slate-200 hover:to-slate-100 border-2 border-slate-300 hover:border-slate-400 rounded-lg text-sm sm:text-base text-slate-900 font-semibold transition-all shadow-sm hover:shadow-md"
                >
                  {question}
                </button>
              )
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border-2 border-slate-200">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FiHelpCircle /> Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            <details className="p-4 bg-white rounded-lg border border-slate-300 cursor-pointer">
              <summary className="font-semibold text-slate-900 flex items-center gap-2">
                <FiInfo className="text-lg" /> How accurate is the information?
              </summary>
              <p className="mt-3 text-slate-700 text-sm">
                All information is based on official government sources and is regularly updated to ensure accuracy.
              </p>
            </details>
            <details className="p-4 bg-white rounded-lg border border-slate-300 cursor-pointer">
              <summary className="font-semibold text-slate-900 flex items-center gap-2">
                <FiLock className="text-lg" /> Is my data safe?
              </summary>
              <p className="mt-3 text-slate-700 text-sm">
                Yes, we use secure encryption for all data. Your questions are not stored or shared with third parties.
              </p>
            </details>
            <details className="p-4 bg-white rounded-lg border border-slate-300 cursor-pointer">
              <summary className="font-semibold text-slate-900 flex items-center gap-2">
                <FiGlobe className="text-lg" /> What languages are supported?
              </summary>
              <p className="mt-3 text-slate-700 text-sm">
                We support 6 languages: English, Bahasa Melayu, Bahasa Indonesia, Filipino, Vietnamese, and Chinese.
              </p>
            </details>
          </div>
        </div>
      </main>
    </div>
  );
}
