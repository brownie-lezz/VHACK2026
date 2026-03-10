'use client';

import React, { createContext, useState, ReactNode } from 'react';

type Language = 'en' | 'bm' | 'id' | 'fil' | 'vi' | 'zh';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'title': 'Inclusive Citizen AI',
    'tagline': 'Understand government services easily',
    'language': 'Language',
    'selectLanguage': 'Select Language',
    'speak': 'Speak your question',
    'or': 'or',
    'inputPlaceholder': 'Type your question here...',
    'exampleQuestions': 'Example Questions',
    'askAI': 'Ask AI',
    'anotherQuestion': 'Ask another question',
    'answer': 'Answer',
    'simpleExplanation': 'Simple Explanation',
    'quickSummary': 'Quick Summary',
    'keyPoints': 'Key Points',
    'source': 'Source',
    'readingLevel': 'Reading Level',
    'normal': 'Normal',
    'simple': 'Simple',
    'verysimple': 'Very Simple',
    'location': 'Select your location',
    'commonQuestions': 'Common Questions',
    'financialAid': 'Financial Aid',
    'medicalHelp': 'Medical Help',
    'housingSupport': 'Housing Support',
    'country': 'Country',
    'selectCountry': 'Select Country',
    'detectCountry': 'It looks like you are in',
    'isCorrect': 'Is this correct?',
    'yes': 'Yes',
    'changeCountry': 'Change Country',
  },
  bm: {
    'title': 'Pembantu AI Rakyat Inklusif',
    'tagline': 'Fahami perkhidmatan kerajaan dengan mudah',
    'language': 'Bahasa',
    'selectLanguage': 'Pilih Bahasa',
    'speak': 'Bercakap soalan anda',
    'or': 'atau',
    'inputPlaceholder': 'Taip soalan anda di sini...',
    'exampleQuestions': 'Soalan Contoh',
    'askAI': 'Tanya AI',
    'anotherQuestion': 'Tanya soalan lain',
    'answer': 'Jawapan',
    'simpleExplanation': 'Penjelasan Mudah',
    'quickSummary': 'Ringkasan Cepat',
    'keyPoints': 'Poin Utama',
    'source': 'Sumber',
    'readingLevel': 'Tahap Membaca',
    'normal': 'Normal',
    'simple': 'Mudah',
    'verysimple': 'Sangat Mudah',
    'location': 'Pilih lokasi anda',
    'commonQuestions': 'Soalan Biasa',
    'financialAid': 'Bantuan Kewangan',
    'medicalHelp': 'Bantuan Perubatan',
    'housingSupport': 'Sokongan Perumahan',
    'country': 'Negara',
    'selectCountry': 'Pilih Negara',
    'detectCountry': 'Nampaknya anda berada di',
    'isCorrect': 'Adakah ini betul?',
    'yes': 'Ya',
    'changeCountry': 'Tukar Negara',
  },
  id: {
    'title': 'AI Warga Negara Inklusif',
    'tagline': 'Pahami layanan pemerintah dengan mudah',
    'language': 'Bahasa',
    'selectLanguage': 'Pilih Bahasa',
    'speak': 'Bicarakan pertanyaan Anda',
    'or': 'atau',
    'inputPlaceholder': 'Ketik pertanyaan Anda di sini...',
    'exampleQuestions': 'Pertanyaan Contoh',
    'askAI': 'Tanya AI',
    'anotherQuestion': 'Tanyakan pertanyaan lain',
    'answer': 'Jawaban',
    'simpleExplanation': 'Penjelasan Sederhana',
    'quickSummary': 'Ringkasan Cepat',
    'keyPoints': 'Poin Kunci',
    'source': 'Sumber',
    'readingLevel': 'Tingkat Membaca',
    'normal': 'Normal',
    'simple': 'Sederhana',
    'verysimple': 'Sangat Sederhana',
    'location': 'Pilih lokasi Anda',
    'commonQuestions': 'Pertanyaan Umum',
    'financialAid': 'Bantuan Keuangan',
    'medicalHelp': 'Bantuan Medis',
    'housingSupport': 'Dukungan Perumahan',
    'country': 'Negara',
    'selectCountry': 'Pilih Negara',
    'detectCountry': 'Sepertinya Anda berada di',
    'isCorrect': 'Apakah ini benar?',
    'yes': 'Ya',
    'changeCountry': 'Ubah Negara',
  },
  fil: {
    'title': 'Inklusibong AI ng Mamamayan',
    'tagline': 'Maunawaan ang mga serbisyong pang-pamahalaan nang madali',
    'language': 'Wika',
    'selectLanguage': 'Pumili ng Wika',
    'speak': 'Magsalita ng iyong tanong',
    'or': 'o',
    'inputPlaceholder': 'I-type ang iyong tanong dito...',
    'exampleQuestions': 'Mga Halimbawang Tanong',
    'askAI': 'Tanungin ang AI',
    'anotherQuestion': 'Magtanong ng iba pang tanong',
    'answer': 'Sagot',
    'simpleExplanation': 'Simpleng Paliwanag',
    'quickSummary': 'Mabilis na Buod',
    'keyPoints': 'Mga Pangunahing Punto',
    'source': 'Pinagmulan',
    'readingLevel': 'Antas ng Pagbabasa',
    'normal': 'Normal',
    'simple': 'Simple',
    'verysimple': 'Napakasimple',
    'location': 'Pumili ng iyong lokasyon',
    'commonQuestions': 'Mga Pangkaraniwang Tanong',
    'financialAid': 'Pinansyal na Tulong',
    'medicalHelp': 'Medikal na Tulong',
    'housingSupport': 'Suporta sa Malalaking Bahay',
    'country': 'Bansa',
    'selectCountry': 'Pumili ng Bansa',
    'detectCountry': 'Mukhang nasa',
    'isCorrect': 'Tama ba ito?',
    'yes': 'Oo',
    'changeCountry': 'Baguhin ang Bansa',
  },
  vi: {
    'title': 'AI Công Dân Bao Gồm',
    'tagline': 'Hiểu dịch vụ chính phủ một cách dễ dàng',
    'language': 'Ngôn ngữ',
    'selectLanguage': 'Chọn Ngôn ngữ',
    'speak': 'Nói câu hỏi của bạn',
    'or': 'hoặc',
    'inputPlaceholder': 'Nhập câu hỏi của bạn ở đây...',
    'exampleQuestions': 'Các Câu hỏi Ví dụ',
    'askAI': 'Hỏi AI',
    'anotherQuestion': 'Đặt một câu hỏi khác',
    'answer': 'Trả lời',
    'simpleExplanation': 'Giải thích Đơn giản',
    'quickSummary': 'Tóm tắt Nhanh',
    'keyPoints': 'Các Điểm chính',
    'source': 'Nguồn',
    'readingLevel': 'Mức Đọc',
    'normal': 'Bình thường',
    'simple': 'Đơn giản',
    'verysimple': 'Cực kỳ Đơn giản',
    'location': 'Chọn vị trí của bạn',
    'commonQuestions': 'Các Câu hỏi Thường gặp',
    'financialAid': 'Trợ cấp Tài chính',
    'medicalHelp': 'Hỗ trợ Y tế',
    'housingSupport': 'Hỗ trợ Nhà ở',
    'country': 'Quốc gia',
    'selectCountry': 'Chọn Quốc gia',
    'detectCountry': 'Có vẻ như bạn đang ở',
    'isCorrect': 'Điều này có đúng không?',
    'yes': 'Có',
    'changeCountry': 'Thay đổi Quốc gia',
  },
  zh: {
    'title': '包容性公民人工智能',
    'tagline': '轻松了解政府服务',
    'language': '语言',
    'selectLanguage': '选择语言',
    'speak': '说出你的问题',
    'or': '或',
    'inputPlaceholder': '在这里输入你的问题...',
    'exampleQuestions': '示例问题',
    'askAI': '询问 AI',
    'anotherQuestion': '提出另一个问题',
    'answer': '答案',
    'simpleExplanation': '简单解释',
    'quickSummary': '快速总结',
    'keyPoints': '关键点',
    'source': '来源',
    'readingLevel': '阅读水平',
    'normal': '普通',
    'simple': '简单',
    'verysimple': '非常简单',
    'location': '选择你的位置',
    'commonQuestions': '常见问题',
    'financialAid': '财政援助',
    'medicalHelp': '医疗帮助',
    'housingSupport': '住房支持',
    'country': '国家',
    'selectCountry': '选择国家',
    'detectCountry': '看起来你在',
    'isCorrect': '这是对的吗？',
    'yes': '是的',
    'changeCountry': '改变国家',
  },
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
