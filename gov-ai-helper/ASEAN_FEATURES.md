# ASEAN Region Support - Implementation Guide

## Overview

The Inclusive Citizen AI application now includes full support for ASEAN region detection, country confirmation, and multilingual interface tailored for Southeast Asian users.

## ✨ New Features

### 1. **Auto-Detection of User's Country**

On first visit, the application automatically detects the user's location based on:
- **Browser Timezone** (primary detection method)
- **Browser Locale** (fallback method)

Supported ASEAN countries:
- 🇲🇾 Malaysia (Malay)
- 🇮🇩 Indonesia (Indonesian)
- 🇵🇭 Philippines (Filipino/Tagalog)
- 🇻🇳 Vietnam (Vietnamese)
- 🇸🇬 Singapore (English)
- 🇹🇭 Thailand (English)
- 🇧🇳 Brunei (English)
- 🇰🇭 Cambodia (English)
- 🇱🇦 Laos (English)
- 🇲🇲 Myanmar (English)

### 2. **Country Confirmation Modal**

When a user visits the app:
- A modal automatically appears showing the detected country with its flag
- Displays message: **"It looks like you are in [Country Name]. Is this correct?"**
- Two options:
  - **Yes** - Confirms and automatically sets the default language for that country
  - **Change Country** - Opens a country selector to choose a different location

#### Flow:
```
User visits app
    ↓
Country auto-detected from timezone
    ↓
Modal appears asking for confirmation
    ↓
User clicks "Yes" or "Change Country"
    ↓
Language auto-set based on selected country
    ↓
Modal closes, user sees customized interface
```

### 3. **Multilingual Support (ASEAN Languages)**

#### Supported Languages:
| Language | Country | Code |
|----------|---------|------|
| English | Regional | en |
| Bahasa Melayu | Malaysia | bm |
| Bahasa Indonesia | Indonesia | id |
| Filipino/Tagalog | Philippines | fil |
| Tiếng Việt | Vietnam | vi |

#### Smart Language Selection:
- When user confirms their country, the app automatically sets the appropriate language
- User can still manually change language using the dropdown selector in the header
- All UI text, example questions, and common questions are translated

### 4. **Enhanced Header**

The header now includes:
- **Country Flag & Name** - Shows the detected/selected country (📍)
- **Language Dropdown** - Quick access to language selector (🌐)
- Both elements are responsive and visible on all device sizes

## 🏗️ Architecture

### New Components

#### `CountryContext.tsx` (New)
Manages country detection and selection:
```tsx
// Available exports:
- CountryProvider (wraps the app)
- useCountry() hook
- Country type definition
- countryData object with all ASEAN countries
- detectCountryFromBrowser() function
```

#### `CountryConfirmation.tsx` (New)
Modal component that:
- Displays detected country with emoji flag
- Shows confirmation question
- Lists all ASEAN countries for selection
- Automatically closes after confirmation

### Updated Components

#### `LanguageContext.tsx`
- Updated to include all ASEAN languages
- Added new translation keys for country features
- Type export for `Language`

#### `Header.tsx`
- Added country display with flag
- Integrated `useCountry()` hook
- Updated language selector options
- Responsive layout for mobile and desktop

#### `layout.tsx` (Root Layout)
- Added `CountryProvider` wrapper
- Added `CountryConfirmation` component
- Proper provider nesting order

#### `HomeContent.tsx`
- Updated example questions for all ASEAN languages
- Updated common questions for all ASEAN languages
- Maintains language consistency

## 🔧 How It Works

### Country Detection Algorithm

```typescript
// 1. Check browser timezone
const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
// Maps to country codes like 'Asia/Bangkok' → 'th'

// 2. If timezone doesn't match ASEAN, check locale
const locale = navigator.language;
// Maps to country codes like 'ms' → 'my'

// 3. Default to Malaysia as fallback
return 'my';
```

### Provider Order (Important)

The providers must be nested in this order:
```tsx
<CountryProvider>           {/* Outermost - detects country */}
  <LanguageProvider>        {/* Manages language */}
    <ChatProvider>          {/* Manages chat state */}
      <CountryConfirmation />  {/* Modal for user confirmation */}
      <Header />               {/* Uses both Country and Language */}
      {children}
    </ChatProvider>
  </LanguageProvider>
</CountryProvider>
```

## 📱 User Experience Flow

### First Visit (New User)

```
1. User opens app in Malaysia
2. System detects timezone: 'Asia/Kuala_Lumpur'
3. Modal appears: "It looks like you are in 🇲🇾 Malaysia. Is this correct?"
4. User clicks "Yes"
5. Language auto-set to "Bahasa Melayu"
6. Example questions appear in Malay
7. Common questions appear in Malay
8. Header shows 🇲🇾 Malaysia flag next to language selector
```

### Changing Country (User Preference)

```
1. User in header clicks "Change Country"
2. Modal shows list of all 10 ASEAN countries with flags
3. User clicks on Philippines 🇵🇭
4. Language auto-changes to Filipino
5. All interface text updates to Tagalog
6. Modal closes
7. User can now ask questions in their preferred language
```

### Manual Language Override

```
1. Country auto-detected as Indonesia (Bahasa Indonesia set)
2. User prefers English
3. User clicks language dropdown in header
4. Selects "English"
5. Interface switches to English immediately
6. Country flag remains Indonesian 🇮🇩
```

## 🌐 Translation Keys (New)

```typescript
t('country')         // "Country"
t('selectCountry')   // "Select Country"
t('detectCountry')   // "It looks like you are in"
t('isCorrect')       // "Is this correct?"
t('yes')             // "Yes"
t('changeCountry')   // "Change Country"
```

## 🎯 Benefits for Users

1. **Automatic Localization** - No manual setup needed
2. **Familiar Language** - Defaults to local language
3. **Easy Country Switch** - Simple one-click country change
4. **Consistent Experience** - All text translated
5. **Accessibility** - Helps multilingual regions
6. **Trust Building** - Local language builds confidence

## 🛠️ Integration with Backend

When integrating with your backend API, remember to:

1. **Pass country code** along with language:
```typescript
const response = await fetch('/api/ask', {
  method: 'POST',
  body: JSON.stringify({
    question: userQuery,
    language: language,        // 'en', 'bm', 'id', 'fil', 'vi'
    country: country,          // 'my', 'id', 'ph', 'vn', etc.
  })
});
```

2. **Use country context in API responses** to return location-specific policies:
```typescript
// Example response
{
  answer: "...",
  simpleExplanation: "...",
  keyPoints: [...],
  source: "Ministry of Social Welfare - Malaysia 2024",
  applicableRegions: ["Penang", "Johor", "KL"]
}
```

## 📊 Country Data Structure

```typescript
interface CountryInfo {
  code: Country;              // 'my', 'id', 'ph', 'vn', etc.
  name: string;               // 'Malaysia', 'Indonesia', etc.
  flag: string;               // '🇲🇾', '🇮🇩', etc.
  defaultLanguage: Language;  // 'bm', 'id', 'fil', 'vi', 'en'
}
```

All data is in `CountryContext.tsx` in the `countryData` object for easy updates.

## 🚀 Future Enhancements

1. **Regional Services** - Show location-specific government services
2. **State/Province Selection** - For larger countries like Indonesia
3. **Currency Localization** - Show amounts in local currency
4. **Time Zone Display** - Show local time in responses
5. **Local Policy Links** - Direct links to local government websites
6. **Offline Support** - Cache country/language preferences
7. **Analytics** - Track which countries use the app

## 🐛 Troubleshooting

### Country Not Detected Correctly

**Problem**: User in Indonesia but Malaysia detected

**Solution**: 
1. Check system timezone settings
2. Browser locale may override - check browser language settings
3. Manual selection via "Change Country" button always works

### Language Not Updating

**Problem**: Changed country but language didn't update

**Solution**:
1. Language context is separate - change is automatic but check network
2. Try refreshing the page
3. Language selector dropdown allows manual override

### Modal Not Appearing

**Problem**: No confirmation modal visible

**Solution**:
1. Check if `CountryConfirmation` component is in layout
2. Check if `setConfirmCountry` state is being set correctly
3. Verify `CountryProvider` wraps the component tree
4. Check browser console for errors

## 📝 Configuration Guide

### Adding a New Language

1. **Update type definition** in `LanguageContext.tsx`:
```typescript
type Language = 'en' | 'bm' | 'id' | 'fil' | 'vi' | 'NEW';
```

2. **Add translations** in `translations` object

3. **Update examples** in `HomeContent.tsx`:
```typescript
const exampleQuestions = {
  // ...
  'new': ['Example 1', 'Example 2', 'Example 3'],
};
```

### Adding a New Country

1. **Update type** in `CountryContext.tsx`:
```typescript
export type Country = 'my' | 'id' | 'ph' | 'vn' | 'sg' | ... | 'NEW';
```

2. **Add to countryData**:
```typescript
cc: { 
  code: 'cc', 
  name: 'Country Name', 
  flag: '🇨🇨', 
  defaultLanguage: 'en' 
},
```

3. **Update timezone mapping**:
```typescript
'Asia/CityName': 'cc',
```

## 🎓 Learning Resources

- **Web Speech API** (Voice Input): https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API
- **Intl API** (Timezone Detection): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat
- **React Context API**: https://react.dev/learn/passing-data-deeply-with-context

## 📄 Files Modified/Created

### New Files:
- `/app/context/CountryContext.tsx` - Country detection and management
- `/app/components/CountryConfirmation.tsx` - Country confirmation modal

### Modified Files:
- `/app/context/LanguageContext.tsx` - Added ASEAN languages
- `/app/components/Header.tsx` - Added country display
- `/app/layout.tsx` - Added providers
- `/app/components/HomeContent.tsx` - Updated example questions

---

**Status**: ASEAN region support fully implemented and tested ✅

**Version**: 1.1.0 - ASEAN Edition

**Last Updated**: March 10, 2026
