import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { Languages } from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
]

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode)
  }

  return (
    <div className="relative group">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 h-9 px-3"
        title={t('common.language')}
      >
        <Languages size={16} />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
      </Button>
      
      <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 first:rounded-t-md last:rounded-b-md ${
              i18n.language === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}