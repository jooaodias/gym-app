import { Suspense } from 'react'
import { Loading } from '@/components/ui/Loading'

interface LoadingWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function LoadingWrapper({ children, fallback }: LoadingWrapperProps) {
  const defaultFallback = (
    <div className="flex items-center justify-center h-64">
      <Loading className="w-8 h-8" />
    </div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}
