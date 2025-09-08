import { useState } from 'react'
import { MapPin, Search, Phone, Navigation } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useSearchGyms, useNearbyGyms } from '@/hooks/use-gyms'
import { useCreateCheckIn } from '@/hooks/use-check-ins'
import { useGeolocation } from '@/hooks/use-geolocation'
import { Loading } from '@/components/ui/Loading'
import { toast } from 'sonner'
import type { Gym } from '@/types/api'
import { useTranslation } from 'react-i18next'

export function GymsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNearby, setShowNearby] = useState(false)
  
  const { latitude, longitude, error: locationError, getCurrentPosition, isLoading: locationLoading } = useGeolocation()
  
  const { data: searchResults, isLoading: searchLoading } = useSearchGyms({
    q: searchQuery,
  })
  
  const { data: nearbyGyms, isLoading: nearbyLoading } = useNearbyGyms({
    latitude: latitude || 0,
    longitude: longitude || 0,
  })
  
  const createCheckInMutation = useCreateCheckIn()

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) {
      toast.error(t('common.enterSearchQuery'))
      return
    }
  }

  function handleShowNearby() {
    if (!latitude || !longitude) {
      getCurrentPosition()
    }
    setShowNearby(true)
    setSearchQuery('')
  }

  async function handleCheckIn(gym: Gym) {
    if (!latitude || !longitude) {
      toast.error(t('common.enableLocationAccess'))
      return
    }

    try {
      await createCheckInMutation.mutateAsync({
        gymId: gym.id,
        data: {
          latitude,
          longitude,
        },
      })
      toast.success(t('common.checkedInSuccess', { gymName: gym.title }))
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t('common.checkInFailed'))
    }
  }

  const displayGyms = showNearby ? nearbyGyms : searchResults
  const isLoading = showNearby ? nearbyLoading : searchLoading

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('gyms.findGyms')}</h1>
        <p className="text-gray-600 mt-2">
            {t('gyms.searchOrFind')}
        </p>
      </div>

      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder={t('common.searchForGyms')}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowNearby(false)
              }}
            />
          </div>
          <Button type="submit" disabled={!searchQuery.trim()}>
            <Search className="w-4 h-4 mr-2" />
            {t('gyms.search')}
          </Button>
        </form>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={handleShowNearby}
            disabled={locationLoading}
          >
            <Navigation className="w-4 h-4 mr-2" />
            {locationLoading ? t('gyms.gettingLocation') : t('gyms.findNearby')}
          </Button>
          
          {locationError && (
            <p className="text-red-500 text-sm">{locationError}</p>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-64">
          <Loading className="w-8 h-8" />
        </div>
      )}

      {!isLoading && displayGyms && displayGyms.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {t('gyms.noGymsFound')}
          </h3>
          <p className="text-gray-600">
            {showNearby 
              ? t('gyms.noGymsFoundInArea')
              : t('gyms.tryingSearch')
            }
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayGyms?.map((gym) => (
          <Card key={gym.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <span>{gym.title}</span>
                <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              {gym.description && (
                <p className="text-gray-600 mb-3">{gym.description}</p>
              )}
              
              {gym.phone && (
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Phone className="w-4 h-4 mr-2" />
                  {gym.phone}
                </div>
              )}
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <MapPin className="w-4 h-4 mr-2" />
                {gym.latitude.toFixed(6)}, {gym.longitude.toFixed(6)}
              </div>
              
              <Button
                className="w-full"
                onClick={() => handleCheckIn(gym)}
                disabled={createCheckInMutation.isPending || !latitude || !longitude}
              >
                {createCheckInMutation.isPending 
                  ? t('gyms.checkInLoading')
                  : t('gyms.checkIn')
                }
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
