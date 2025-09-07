import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { useUserMetrics } from '@/hooks/use-check-ins'
import { useAuth } from '@/contexts/AuthContext'
import { useTranslation } from 'react-i18next'
import { Calendar, Dumbbell, TrendingUp, User } from 'lucide-react'
import { Loading } from '@/components/ui/Loading'

export function DashboardPage() {
  const { user } = useAuth()
  const { t } = useTranslation()
  const { data: metrics, isLoading } = useUserMetrics()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading className="w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="px-4 py-6 space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          {t('dashboard.welcome', { name: user?.name })}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t('dashboard.journeyOverview')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.totalCheckIns')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics?.checkInsCount || 0}</div>
            <p className="text-xs text-muted-foreground">
              Your total gym visits
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user?.role}</div>
            <p className="text-xs text-muted-foreground">
              Your membership level
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.thisMonth')}</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Coming soon
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{t('dashboard.streak')}</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">
              Coming soon
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <a
              href="/gyms"
              className="flex items-center justify-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors group"
            >
              <div className="text-center">
                <Dumbbell className="h-8 w-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="mt-2 block text-sm font-medium text-foreground">
                  Find Gyms
                </span>
              </div>
            </a>
            <a
              href="/check-ins"
              className="flex items-center justify-center p-6 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors group"
            >
              <div className="text-center">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="mt-2 block text-sm font-medium text-foreground">
                  View History
                </span>
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              No recent activity. Start by checking in to a gym!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
