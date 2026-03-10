'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { useCountry } from '@/app/context/CountryContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { countryInfo } = useCountry();

  return (
    <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-fit">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
              {t('title')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t('tagline')}
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-end">
            {/* Country Display */}
            {countryInfo && (
              <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-lg">{countryInfo.flag}</span>
                <span className="text-xs sm:text-sm font-medium text-slate-700 hidden sm:inline">
                  {countryInfo.name}
                </span>
              </div>
            )}

            {/* Language Selector */}
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs sm:text-sm font-medium text-slate-700">🌐</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="px-2 sm:px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-lg bg-white text-slate-900 font-medium hover:bg-slate-50 cursor-pointer"
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
      </div>
    </header>
  );
}
