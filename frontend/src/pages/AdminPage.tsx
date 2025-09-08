import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, MapPin, Phone, Dumbbell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCreateGym } from '@/hooks/use-gyms'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

type CreateGymForm = {
  title: string
  description?: string
  phone?: string
  latitude: number
  longitude: number
}

export function AdminPage() {
  const { user } = useAuth()
  const createGymMutation = useCreateGym()
  const { t } = useTranslation()

  const createGymSchema = z.object({
    title: z.string().min(1, t('admin.titleRequired')),
    description: z.string().optional(),
    phone: z.string().optional(),
    latitude: z.number().min(-90).max(90),
    longitude: z.number().min(-180).max(180),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateGymForm>({
    resolver: zodResolver(createGymSchema),
  })

  // Redirect if not admin
  if (user?.role !== 'ADMIN') {
    return (
      <div className="px-4 py-6">
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {t('admin.accessDenied')}
            </h3>
            <p className="text-gray-600">
              {t('admin.noPermission')}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  async function onSubmit(data: CreateGymForm) {
    try {
      await createGymMutation.mutateAsync({
        title: data.title,
        description: data.description || null,
        phone: data.phone || null,
        latitude: data.latitude,
        longitude: data.longitude,
      })
      toast.success(t('admin.gymCreatedSuccess'))
      reset()
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t('admin.gymCreatedFailed'))
    }
  }

  return (
    <div className="px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('admin.title')}</h1>
        <p className="text-gray-600 mt-2">
          {t('admin.manageAndValidate')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              {t('admin.createNewGym')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.gymName')} *
                </label>
                <Input
                  id="title"
                  type="text"
                  placeholder={t('admin.enterGymName')}
                  {...register('title')}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.description')}
                </label>
                <Input
                  id="description"
                  type="text"
                  placeholder={t('admin.enterGymDescription')}
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('admin.phone')}
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder={t('admin.enterPhoneNumber')}
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('admin.latitude')} *
                  </label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    placeholder="e.g. -23.5505"
                    {...register('latitude', { valueAsNumber: true })}
                  />
                  {errors.latitude && (
                    <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('admin.longitude')} *
                  </label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    placeholder="e.g. -46.6333"
                    {...register('longitude', { valueAsNumber: true })}
                  />
                  {errors.longitude && (
                    <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={createGymMutation.isPending}
              >
                {createGymMutation.isPending ? t('admin.creating') : t('admin.createGym')}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('admin.adminActions')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Dumbbell className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium">{t('admin.gymManagement')}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {t('admin.gymManagementDesc')}
              </p>
              <Button variant="outline" size="sm">
                {t('admin.viewAllGyms')}
              </Button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium">{t('admin.checkInValidation')}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {t('admin.checkInValidationDesc')}
              </p>
              <Button variant="outline" size="sm">
                <a href="/check-ins">{t('admin.viewCheckIns')}</a>
              </Button>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center mb-2">
                <Phone className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-medium">{t('admin.userManagement')}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                {t('admin.userManagementDesc')}
              </p>
              <Button variant="outline" size="sm" disabled>
                {t('admin.comingSoon')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
