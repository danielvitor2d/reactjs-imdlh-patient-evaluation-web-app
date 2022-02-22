import React, { createContext, useState, useEffect } from 'react'
import { api } from '../services/api'

interface AuthContextData {
  signed: boolean
  login(document: string): Promise<void>
  logout(): void
  user: null
  company: null
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<null>(null)
  const [company, setCompany] = useState<null>(null)

  /**
   *
   * @param email
   * @param password
   * @param rememberme
   */
  async function login(document: string) {
    const response = (await api.post('/users/sessions', {
      document,
    }))

    localStorage.setItem('@APP:user', JSON.stringify(response.data.user))
      localStorage.setItem(
        '@APP:company',
        JSON.stringify(response.data.company)
      )
      localStorage.setItem('@APP:token', response.data.token)


    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
  }

  /**
   *
   */
  function logout() {
    setUser(null)
    setCompany(null)
    sessionStorage.clear()
    localStorage.clear()
  }

  /**
   *
   */
  function tokenIsExpired() {}

  useEffect(() => {
    const storagedUser = localStorage.getItem('@APP:user') as string
    const storagedCompany = localStorage.getItem('@APP:company') as string
    const storagedToken = localStorage.getItem('@APP:token') as string

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      setCompany(JSON.parse(storagedCompany))
      api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, company, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
