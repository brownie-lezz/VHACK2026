'use client';

import { useState } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';

interface VoiceButtonProps {
  onTranscript?: (text: string) => void;
}

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          if (onTranscript) {
            onTranscript(transcript);
          }
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button
      onClick={startListening}
      disabled={isListening}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white text-base sm:text-lg transition-colors ${
        isListening
          ? 'bg-red-500 hover:bg-red-600 animate-pulse'
          : 'bg-teal-500 hover:bg-teal-600'
      }`}
    >
      <span className="text-xl sm:text-2xl">🎤</span>
      <span>{isListening ? 'Listening...' : t('speak')}</span>
    </button>
  );
}
