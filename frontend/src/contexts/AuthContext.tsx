import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@/types/api'
import { authService } from '@/services/auth'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  useEffect(() => {
    async function loadUserProfile() {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setIsLoading(false)
        return
      }

      try {
        const profile = await authService.getProfile()
        setUser(profile)
      } catch (error) {
        localStorage.removeItem('token')
      } finally {
        setIsLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  async function signIn(email: string, password: string) {
    const { token } = await authService.authenticate({ email, password })
    
    localStorage.setItem('token', token)
    
    const profile = await authService.getProfile()
    setUser(profile)
  }

  function signOut() {
    authService.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signOut,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
