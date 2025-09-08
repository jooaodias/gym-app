import { Outlet } from 'react-router-dom'
import { Dumbbell, LogOut, User, MapPin, Calendar, BarChart3 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useAuth } from '@/contexts/AuthContext'
import { useSignOut } from '@/hooks/use-auth'

export function AppLayout() {
  const { user } = useAuth()
  const signOutMutation = useSignOut()
  const location = useLocation()
  const { t } = useTranslation()

  const navigation = [
    { name: t('navigation.dashboard'), href: '/dashboard', icon: BarChart3 },
    { name: t('navigation.gyms'), href: '/gyms', icon: Dumbbell },
    { name: t('navigation.checkIns'), href: '/check-ins', icon: Calendar },
    { name: t('navigation.profile'), href: '/profile', icon: User },
  ]

  if (user?.role === 'ADMIN') {
    navigation.push({ name: t('navigation.admin'), href: '/admin', icon: MapPin })
  }

  function handleSignOut() {
    signOutMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Dumbbell className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-bold text-foreground">{t('common.gymApp')}</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'border-primary text-foreground'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </Link>
                  )
                })}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <span className="text-sm text-muted-foreground">{t('common.hello')}, {user?.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                disabled={signOutMutation.isPending}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('navigation.logout')}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  )
}
