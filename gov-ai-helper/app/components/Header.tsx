'use client';

import { useState } from 'react';
import { FiHome, FiHelpCircle, FiGlobe } from 'react-icons/fi';
import { useLanguage } from '@/app/context/LanguageContext';
import { useCountry } from '@/app/context/CountryContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { countryInfo } = useCountry();
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="border-b border-slate-300 bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-fit">
            <div className="flex items-center gap-2">
              <FiHome className="text-2xl sm:text-3xl text-teal-400" />
              <h1 className="text-xl sm:text-2xl font-bold text-white">
                {t('title')}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              {t('tagline')}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
            {/* Help Button */}
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="relative p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors"
              title="Get help"
            >
              <FiHelpCircle className="text-xl" />
            </button>

            {/* Country Display */}
            {countryInfo && (
              <div className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 rounded-lg border border-teal-500 transition-colors">
                <span className="text-xl">{countryInfo.flag}</span>
                <span className="text-xs sm:text-sm font-semibold text-white hidden sm:inline">
                  {countryInfo.name}
                </span>
              </div>
            )}

            {/* Language Selector */}
            <div className="flex items-center gap-2 sm:gap-3">
              <FiGlobe className="text-lg text-gray-300" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="px-3 sm:px-4 py-2 text-xs sm:text-sm border border-slate-600 rounded-lg bg-slate-700 text-white font-medium hover:bg-slate-600 cursor-pointer transition-colors"
              >
                <option value="en">English</option>
                <option value="bm">Bahasa Melayu</option>
                <option value="id">Bahasa Indonesia</option>
                <option value="fil">Filipino</option>
                <option value="vi">Tiếng Việt</option>
                <option value="zh">中文</option>
              </select>
            </div>
          </div>
        </div>

        {/* Help Tooltip */}
        {showHelp && (
          <div className="mt-4 p-4 bg-teal-600 text-white rounded-lg border border-teal-500">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <FiHelpCircle /> How to use:
            </h3>
            <ul className="text-sm space-y-1">
              <li>• Ask questions about government services and programs</li>
              <li>• Use voice input or type your question</li>
              <li>• Adjust reading level for easier understanding</li>
              <li>• Get helpful key points and references</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
