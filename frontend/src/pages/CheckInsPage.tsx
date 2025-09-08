import { useState } from 'react'
import { Calendar, MapPin, CheckCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useCheckInHistory } from '@/hooks/use-check-ins'
import { useValidateCheckIn } from '@/hooks/use-check-ins'
import { useAuth } from '@/contexts/AuthContext'
import { Loading } from '@/components/ui/Loading'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'

export function CheckInsPage() {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const { user } = useAuth()
  
  const { data: checkIns, isLoading } = useCheckInHistory({ page: currentPage })
  const validateCheckInMutation = useValidateCheckIn()

  async function handleValidateCheckIn(checkInId: string) {
    try {
      await validateCheckInMutation.mutateAsync({ checkInId })
      toast.success(t('common.validationSuccess'))
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t('common.validationFailed'))
    }
  }

  function formatDate(date: Date) {
    return format(new Date(date), 'PPP')
  }

  function formatTime(date: Date) {
    return format(new Date(date), 'p')
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loading className="w-8 h-8" />
      </div>
    )
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('checkIns.title')}</h1>
        <p className="text-gray-600 mt-2">
          {t('checkIns.description')}
        </p>
      </div>

      {!checkIns || checkIns.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('checkIns.noCheckIns')}
          </h3>
          <p className="text-gray-600">
            {t('checkIns.startChecking')}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {checkIns.map((checkIn) => (
              <Card key={checkIn.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                      {checkIn.gym.title}
                    </div>
                    <div className="flex items-center">
                      {checkIn.validated_at ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{t('checkIns.validated')}</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-600">
                          <Clock className="w-4 h-4 mr-1" />
                          <span className="text-sm">{t('checkIns.pending')}</span>
                        </div>
                      )}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{t('checkIns.details')}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">{t('checkIns.date')}:</span> {formatDate(checkIn.created_at)}
                        </div>
                        <div>
                          <span className="font-medium">{t('checkIns.time')}:</span> {formatTime(checkIn.created_at)}
                        </div>
                        {checkIn.validated_at && (
                          <div>
                            <span className="font-medium">{t('checkIns.validated')}:</span> {formatTime(checkIn.validated_at)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{t('checkIns.gymInformation')}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        {checkIn.gym.description && (
                          <div>{checkIn.gym.description}</div>
                        )}
                        {checkIn.gym.phone && (
                          <div>
                            <span className="font-medium">{t('admin.phone')}:</span> {checkIn.gym.phone}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {user?.role === 'ADMIN' && !checkIn.validated_at && (
                    <div className="mt-4 pt-4 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleValidateCheckIn(checkIn.id)}
                        disabled={validateCheckInMutation.isPending}
                      >
                        {validateCheckInMutation.isPending ? t('common.validating') : t('common.validateCheckIn')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              {t('common.previous')}
            </Button>
            
            <span className="text-sm text-gray-600">
              {t('common.page')} {currentPage}
            </span>
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(page => page + 1)}
              disabled={!checkIns || checkIns.length < 20}
            >
              {t('common.next')}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
