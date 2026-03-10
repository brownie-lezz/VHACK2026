'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Language } from './LanguageContext';

export type Country = 'my' | 'id' | 'ph' | 'vn' | 'sg' | 'th' | 'bn' | 'kh' | 'la' | 'mm';

export interface CountryInfo {
  code: Country;
  name: string;
  flag: string;
  defaultLanguage: Language;
}

export const countryData: Record<Country, CountryInfo> = {
  my: { code: 'my', name: 'Malaysia', flag: '🇲🇾', defaultLanguage: 'bm' },
  id: { code: 'id', name: 'Indonesia', flag: '🇮🇩', defaultLanguage: 'id' },
  ph: { code: 'ph', name: 'Philippines', flag: '🇵🇭', defaultLanguage: 'fil' },
  vn: { code: 'vn', name: 'Vietnam', flag: '🇻🇳', defaultLanguage: 'vi' },
  sg: { code: 'sg', name: 'Singapore', flag: '🇸🇬', defaultLanguage: 'en' },
  th: { code: 'th', name: 'Thailand', flag: '🇹🇭', defaultLanguage: 'en' },
  bn: { code: 'bn', name: 'Brunei', flag: '🇧🇳', defaultLanguage: 'en' },
  kh: { code: 'kh', name: 'Cambodia', flag: '🇰🇭', defaultLanguage: 'en' },
  la: { code: 'la', name: 'Laos', flag: '🇱🇦', defaultLanguage: 'en' },
  mm: { code: 'mm', name: 'Myanmar', flag: '🇲🇲', defaultLanguage: 'en' },
};

interface CountryContextType {
  country: Country | null;
  setCountry: (country: Country) => void;
  detectedCountry: Country | null;
  confirmCountry: boolean;
  setConfirmCountry: (confirm: boolean) => void;
  countryInfo: CountryInfo | null;
  allCountries: CountryInfo[];
  resetConfirmation: () => void;
}

export const CountryContext = createContext<CountryContextType | undefined>(undefined);

// Detect country from timezone and locale
function detectCountryFromBrowser(): Country {
  // Get timezone
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Map timezone to country code (simplified mapping)
  const timezoneToCountry: Record<string, Country> = {
    'Asia/Kuala_Lumpur': 'my',
    'Asia/Jakarta': 'id',
    'Asia/Manila': 'ph',
    'Asia/Ho_Chi_Minh': 'vn',
    'Asia/Singapore': 'sg',
    'Asia/Bangkok': 'th',
    'Asia/Brunei': 'bn',
    'Asia/Phnom_Penh': 'kh',
    'Asia/Vientiane': 'la',
    'Asia/Yangon': 'mm',
  };

  // Check if timezone matches any ASEAN country
  if (timezoneToCountry[timeZone]) {
    return timezoneToCountry[timeZone];
  }

  // Fallback to locale language if timezone doesn't match
  const locale = navigator.language;
  const localeToCountry: Record<string, Country> = {
    'ms': 'my', // Malay
    'id': 'id', // Indonesian
    'fil': 'ph', // Filipino
    'tl': 'ph', // Tagalog
    'vi': 'vn', // Vietnamese
    'en-SG': 'sg',
    'en-MY': 'my',
    'en-PH': 'ph',
  };

  if (localeToCountry[locale]) {
    return localeToCountry[locale];
  }

  // Default to English-speaking countries if locale starts with specific codes
  if (locale.startsWith('ms')) return 'my';
  if (locale.startsWith('id')) return 'id';
  if (locale.startsWith('fil') || locale.startsWith('tl')) return 'ph';
  if (locale.startsWith('vi')) return 'vn';

  // Default fallback to Malaysia
  return 'my';
}

export function CountryProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<Country | null>(null);
  const [detectedCountry, setDetectedCountry] = useState<Country | null>(null);
  const [confirmCountry, setConfirmCountry] = useState(false);

  // Detect country on mount
  useEffect(() => {
    const detected = detectCountryFromBrowser();
    setDetectedCountry(detected);
    // Don't set the country yet - wait for user confirmation
    setConfirmCountry(false);
  }, []);

  const handleSetCountry = (newCountry: Country) => {
    setCountryState(newCountry);
    setConfirmCountry(true);
  };

  const countryInfo = country ? countryData[country] : null;
  const allCountries = Object.values(countryData);

  const resetConfirmation = () => {
    setConfirmCountry(false);
    setCountryState(null);
  };

  return (
    <CountryContext.Provider
      value={{
        country,
        setCountry: handleSetCountry,
        detectedCountry,
        confirmCountry,
        setConfirmCountry,
        countryInfo,
        allCountries,
        resetConfirmation,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = React.useContext(CountryContext);
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider');
  }
  return context;
}
