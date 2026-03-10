# Inclusive Citizen AI - Government Services Helper

A clean, mobile-friendly Next.js + React web application that simplifies government services information for everyone using multilingual support and AI assistance.

## 🎯 Features

### **Home Page** (`/`)
- **Clean Hero Section** - Welcoming title and tagline
- **Language Selector** - Support for English, Bahasa Melayu, Chinese (中文), and Tamil
- **Voice Input** - Large microphone button with speech-to-text support
- **Text Input** - Simple textarea for typing questions
- **Example Questions** - Pre-populated multilingual examples to guide users
- **Common Questions** - Quick access buttons for frequent inquiry topics

### **Chat Page** (`/chat`)
- **Chat History** - Displays user questions and AI responses
- **Answer Panel** with:
  - **Answer Section** - Direct response to the question
  - **Simple Explanation** - Easy-to-understand breakdown
  - **Key Points** - Bullet-point summary for quick reference
  - **Source Citation** - Shows the government source to prevent hallucination
- **Reading Level Toggle** - Normal, Simple, or Very Simple versions
- **Action Buttons** - "Ask Another Question" to start new conversation

### **Accessibility**
- **Mobile-First Design** - Optimized for all device sizes
- **Large Text & Buttons** - Easy to read and tap
- **Voice Support** - Helps low-literacy users
- **Reading Level Controls** - Simplifies complex information
- **Multilingual Interface** - 4 supported languages

## 📁 Project Structure

```
gov-ai-helper/
├── app/
│   ├── components/
│   │   ├── Header.tsx              # Top navigation with language selector
│   │   ├── HomeContent.tsx         # Home page main content
│   │   ├── ChatContent.tsx         # Chat page main content
│   │   ├── VoiceButton.tsx         # Speech-to-text button
│   │   ├── ChatMessage.tsx         # Individual message display
│   │   ├── AnswerPanel.tsx         # AI response display with reading levels
│   │   └── InputArea.tsx           # Chat input and voice controls
│   ├── context/
│   │   ├── LanguageContext.tsx     # Multilingual state management
│   │   └── ChatContext.tsx         # Chat history state management
│   ├── chat/
│   │   └── page.tsx                # Chat page route
│   ├── layout.tsx                  # Root layout with providers
│   ├── page.tsx                    # Home page route
│   └── globals.css                 # Global styles
├── public/                         # Static assets
├── package.json
├── tailwind.config.ts              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript configuration
└── next.config.ts                  # Next.js configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
cd gov-ai-helper
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 🎨 Design System

### Colors
- **Primary Blue**: Used for user messages and main actions
- **Teal Accent**: Used for AI actions and important buttons
- **Light Gray**: Background and secondary elements
- **White**: Content areas

### Typography
- **Large Text**: Easily readable on all devices
- **Clear Hierarchy**: Titles, subtitles, and body text well-defined
- **Multilingual Support**: Works with different character sets

## 🌐 Multilingual Support

Supports 4 languages with complete UI translations:
- **English** (en)
- **Bahasa Melayu** (bm)
- **Chinese** (zh)
- **Tamil** (ta)

Language preference is managed via the `LanguageContext` and displayed in a dropdown in the header.

## 💬 Context & State Management

### LanguageContext
Manages the current language selection and provides a translation function (`t`) for all text content across the application.

```tsx
const { language, setLanguage, t } = useLanguage();
```

### ChatContext
Manages chat messages and AI responses for the conversation history.

```tsx
const { messages, addMessage, aiResponse, setAIResponse, clearMessages } = useChat();
```

## 🎙️ Voice Input

The `VoiceButton` component uses the Web Speech API for speech recognition. It:
- Detects browser support for speech recognition
- Shows listening state with animation
- Captures final transcript and triggers callback
- Works with multilingual input

## 📱 Responsive Design

Built with Tailwind CSS for mobile-first responsive design:
- Optimized for mobile (< 768px)
- Tablet layout (768px - 1024px)
- Desktop layout (> 1024px)

## 🔧 Key Components

### Header
Sticky header showing the app title, tagline, and language selector dropdown.

### VoiceButton
Large button with microphone icon and visual feedback:
- Animated pulse when listening
- Disabled during speech recognition
- Fallback message if browser doesn't support speech API

### ChatMessage
Message display component that styles user and AI messages differently:
- User messages: Blue background, right-aligned
- AI messages: Gray background, left-aligned

### AnswerPanel
Complex component displaying full AI response:
- Reading level selector (buttons at top)
- Different text simplification based on selected level
- Organized sections for answer, explanation, points, and source
- "Ask Another Question" button to restart conversation

### InputArea
Input controls for the chat:
- Voice button
- Text area with multiline support
- Enter to send (Shift+Enter for new line)
- Submit button that disables when empty

## 🎬 User Flows

### Home Page Flow
1. User selects language (optional, defaults to English)
2. User either:
   - Clicks voice button and speaks a question
   - Types a question in the text area
   - Clicks an example question
3. Clicks "Ask AI" button
4. Redirected to chat page with AI response

### Chat Page Flow
1. Displays user question and AI response
2. Can toggle reading level for different explanation complexities
3. Clicks "Ask Another Question" to return to home
4. Can ask follow-up questions using the input area

## 🔄 Next Steps for Backend Integration

The frontend is ready for backend integration. The following endpoints need to be implemented:

1. **POST /api/ask** - Submit question and get AI response
   - Input: `{ question: string, language: string }`
   - Output: `{ answer, simpleExplanation, keyPoints[], source }`

2. **GET /api/health** - Health check endpoint

Replace the mock setTimeout in HomeContent.tsx and ChatContent.tsx with actual API calls.

## 🛠️ Technologies Used

- **Next.js 16.1.6** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Web Speech API** - Voice input

## 📄 License

Government AI Helper - Made for VHACK2026

## 🤝 Contributing

This is a frontend-only implementation. Backend functionality will be handled by the team members responsible for the AI/chat logic.

---

**Status**: Frontend interface complete and ready for backend integration ✅
