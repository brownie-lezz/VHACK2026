'use client';

import { useCountry, countryData } from '@/app/context/CountryContext';
import { useLanguage } from '@/app/context/LanguageContext';
import { useState } from 'react';

export default function CountryConfirmation() {
  const { detectedCountry, setCountry, confirmCountry, setConfirmCountry, resetConfirmation } =
    useCountry();
  const { setLanguage, t } = useLanguage();
  const [showCountryList, setShowCountryList] = useState(false);

  if (!detectedCountry || confirmCountry) {
    return null;
  }

  const detected = countryData[detectedCountry];

  const handleConfirm = () => {
    setCountry(detectedCountry);
    setLanguage(detected.defaultLanguage);
  };

  const handleChangeCountry = (countryCode: keyof typeof countryData) => {
    const country = countryData[countryCode];
    setCountry(countryCode);
    setLanguage(country.defaultLanguage);
    setShowCountryList(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full">
        <div className="text-center">
          {/* Country Flag and Name */}
          <div className="mb-6">
            <div className="text-6xl mb-4">{detected.flag}</div>
            <p className="text-lg text-slate-700 font-medium">
              {t('detectCountry')} <strong>{detected.name}</strong>
            </p>
          </div>

          {/* Question */}
          <p className="text-base sm:text-lg text-slate-900 font-semibold mb-8">
            {t('isCorrect')}
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Yes Button */}
            <button
              onClick={handleConfirm}
              className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg text-base transition-colors"
            >
              {t('yes')}
            </button>

            {/* Change Country Button */}
            <button
              onClick={() => setShowCountryList(!showCountryList)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg text-base transition-colors"
            >
              {t('changeCountry')}
            </button>
          </div>

          {/* Country List (shown when user clicks "Change Country") */}
          {showCountryList && (
            <div className="mt-6 max-h-60 overflow-y-auto border border-slate-300 rounded-lg p-3 sm:p-4">
              <h3 className="text-sm font-bold text-slate-700 mb-3">
                {t('selectCountry')}
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(countryData).map(([code, country]) => (
                  <button
                    key={code}
                    onClick={() => handleChangeCountry(code as keyof typeof countryData)}
                    className="p-3 text-left text-sm border border-slate-300 rounded-lg hover:bg-teal-50 hover:border-teal-500 transition-colors"
                  >
                    <span className="text-2xl mr-2">{country.flag}</span>
                    <span className="font-medium text-slate-900">{country.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
