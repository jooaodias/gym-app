import { User, Mail, Shield, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { useUserMetrics } from '@/hooks/use-check-ins'
import { useSignOut } from '@/hooks/use-auth'
import { Loading } from '@/components/ui/Loading'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

export function ProfilePage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { data: metrics, isLoading: metricsLoading } = useUserMetrics()
  const signOutMutation = useSignOut()

  function handleSignOut() {
    signOutMutation.mutate()
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading className="w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('profile.title')}</h1>
        <p className="text-gray-600 mt-2">
          {t('profile.description')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                {t('profile.personalInformation')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.name')}
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md">
                    {user.name}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.email')}
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {user.email}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.role')}
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-gray-400" />
                    {user.role}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('profile.memberSince')}
                  </label>
                  <div className="p-3 bg-gray-50 rounded-md flex items-center">
                    <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                    {format(new Date(user.created_at), 'MMM dd, yyyy')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.activityStats')}</CardTitle>
            </CardHeader>
            <CardContent>
              {metricsLoading ? (
                <div className="flex items-center justify-center h-20">
                  <Loading className="w-6 h-6" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {metrics?.checkInsCount || 0}
                    </div>
                    <div className="text-sm text-gray-600">{t('profile.totalCheckIns')}</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('profile.accountActions')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  // TODO: Implement edit profile
                }}
              >
               {t('profile.editProfile')}
              </Button>
              
              <Button
                variant="destructive"
                className="w-full"
                onClick={handleSignOut}
                disabled={signOutMutation.isPending}
              >
                {signOutMutation.isPending ? t('common.signingOut') : t('common.signOut')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
