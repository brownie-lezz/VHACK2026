'use client';

import { useState } from 'react';
import { FiMic, FiAlertCircle } from 'react-icons/fi';
import { useLanguage } from '@/app/context/LanguageContext';

interface VoiceButtonProps {
  onTranscript?: (text: string) => void;
}

export default function VoiceButton({ onTranscript }: VoiceButtonProps) {
  const { t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition is not supported in your browser');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
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

    recognition.onerror = (event: any) => {
      setIsListening(false);
      setError(`Error: ${event.error}`);
    };

    recognition.start();
  };

  return (
    <div className="w-full">
      <button
        onClick={startListening}
        disabled={isListening}
        className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold text-white text-base sm:text-lg transition-all shadow-md hover:shadow-lg disabled:shadow-none ${
          isListening
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse'
            : 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
        }`}
      >
        <FiMic className={`text-2xl sm:text-3xl ${isListening ? 'animate-bounce' : ''}`} />
        <span>{isListening ? 'Listening... Speak now!' : t('speak')}</span>
        {isListening && <span className="ml-auto animate-pulse">●</span>}
      </button>
      
      {error && (
        <div className="mt-3 p-3 bg-red-50 border border-red-300 rounded-lg">
          <p className="text-sm text-red-700 font-medium flex items-center gap-2">
            <FiAlertCircle /> {error}
          </p>
        </div>
      )}

      {isListening && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-300 rounded-lg">
          <p className="text-xs sm:text-sm text-blue-700 font-medium flex items-center gap-2">
            <FiMic className="animate-spin" /> Speak clearly and wait for the tone to stop
          </p>
        </div>
      )}
    </div>
  );
}
