# Internationalization (i18n) Documentation

This project uses **i18next** and **react-i18next** for internationalization, allowing the application to support multiple languages.

## Current Supported Languages

- **English (en)** - Default language
- **Portuguese (pt)** - Portuguese (Brazil)

## How It Works

### Configuration
- **i18n configuration**: `src/lib/i18n.ts`
- **Translation files**: `src/locales/[language].json`
- **Language detection**: Automatic browser language detection with localStorage persistence
- **Fallback language**: English (en)

### Features
- Automatic language detection from browser preferences
- Language persistence using localStorage
- Language switcher component for manual language selection
- Fallback to English if translation is missing
- Development debug mode enabled

## Adding New Languages

### 1. Create Translation File
Create a new JSON file in `src/locales/` with the language code as filename:

```bash
# Example for Spanish
src/locales/es.json
```

### 2. Add Translations
Copy the structure from `src/locales/en.json` and translate all values:

```json
{
  "auth": {
    "login": {
      "title": "Bienvenido de vuelta",
      "description": "Inicia sesión en tu cuenta para continuar",
      // ... more translations
    }
  }
}
```

### 3. Update i18n Configuration
Add the new language to `src/lib/i18n.ts`:

```typescript
// Import the new translation file
import esTranslations from '@/locales/es.json'

const resources = {
  en: {
    translation: enTranslations
  },
  pt: {
    translation: ptTranslations
  },
  es: {
    translation: esTranslations
  }
}
```

### 4. Update Language Switcher
Add the new language option to `src/components/LanguageSwitcher.tsx`:

```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
]
```

## Using Translations in Components

### Basic Usage
```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <h1>{t('auth.login.title')}</h1>
  )
}
```

### With Variables
```typescript
// In translation file
{
  "welcome": "Welcome, {{name}}!"
}

// In component
const { t } = useTranslation()
return <p>{t('welcome', { name: user.name })}</p>
```

### Conditional Content
```typescript
const { t, i18n } = useTranslation()

// Check current language
if (i18n.language === 'pt') {
  // Portuguese-specific logic
}
```

## Translation Structure

The translation files follow a nested structure:

```json
{
  "auth": {
    "login": { /* login related translations */ },
    "register": { /* register related translations */ }
  },
  "navigation": { /* navigation menu translations */ },
  "common": { /* common UI elements */ },
  "validation": { /* form validation messages */ }
}
```

## Best Practices

1. **Consistent Structure**: Keep the same structure across all language files
2. **Nested Keys**: Use nested objects to organize translations logically
3. **Descriptive Keys**: Use descriptive key names that indicate context
4. **Placeholders**: Use interpolation for dynamic content
5. **Fallback**: Always provide English translations as fallback

## Testing Languages

1. Use the language switcher in the top-right corner
2. Check that all UI text changes when switching languages
3. Refresh the page to verify language persistence
4. Test form validation messages in different languages

## Development Notes

- Translation keys should be added to TypeScript for type safety (future enhancement)
- Missing translations will fall back to English
- Debug mode shows language change events in browser console
- Languages are stored in localStorage for persistence