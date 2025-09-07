interface LoadingProps {
  className?: string
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={`animate-spin rounded-full border-2 border-muted border-t-primary ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  )
}
