import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEYS = { token: 'accessToken', user: 'userInfo' }

export function useAuth() {
  const [user, setUser] = useState<{ displayName?: string } | null>(() => {
    try {
      const u = localStorage.getItem(STORAGE_KEYS.user)
      return u ? JSON.parse(u) : null
    } catch { return null }
  })

  const token = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEYS.token) : null
  const isAuthenticated = !!token && !!user

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.token)
    localStorage.removeItem(STORAGE_KEYS.user)
    localStorage.removeItem('otpVerified')
    setUser(null)
  }, [])

  const login = useCallback((data: { token: string; payload: { displayName?: string } }) => {
    localStorage.setItem(STORAGE_KEYS.token, data.token)
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(data.payload))
    setUser(data.payload)
  }, [])

  useEffect(() => {
    const u = localStorage.getItem(STORAGE_KEYS.user)
    setUser(u ? JSON.parse(u) : null)
  }, [token])

  return { user, isAuthenticated, logout, login }
}
