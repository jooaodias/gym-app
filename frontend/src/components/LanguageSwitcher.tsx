import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent border border-muted text-sm rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 text-foreground"
      >
        <option value="en">English</option>
        <option value="pt">Português</option>
      </select>
    </div>
  )
}