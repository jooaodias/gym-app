import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { useAuth } from '@/contexts/AuthContext'

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const loginSchema = z.object({
    email: z.string().email(t('validation.emailInvalid')),
    password: z.string().min(6, t('validation.passwordMin')),
  })

  type LoginForm = z.infer<typeof loginSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginForm) {
    try {
      setIsLoading(true)
      await signIn(data.email, data.password)
      toast.success(t('auth.login.loginSuccess'))
      navigate('/dashboard')
    } catch (error: any) {
      toast.error(error?.response?.data?.message || t('auth.login.loginFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-end mb-4">
          <LanguageSwitcher />
        </div>
        <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2 pb-8">
            <div className="mx-auto w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <CardTitle className="text-3xl font-bold">{t('auth.login.title')}</CardTitle>
            <CardDescription className="text-base">
              {t('auth.login.description')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  {t('auth.login.email')}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('auth.login.emailPlaceholder')}
                  className="h-11"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-foreground">
                  {t('auth.login.password')}
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.login.passwordPlaceholder')}
                  className="h-11"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-destructive text-sm">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base"
                disabled={isLoading}
              >
                {isLoading ? t('auth.login.signingIn') : t('auth.login.signInButton')}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {t('auth.login.noAccount')}{' '}
                <Link
                  to="/register"
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-4"
                >
                  {t('auth.login.signUp')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}