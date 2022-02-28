import React, { createContext, useState, useEffect } from 'react'
import { api } from '../services/api'

type Patient = {
  patient_id: string
}

type User = {
  id: string
}

type SignInResponse = {
  data: {
    user: User
    patient: Patient
    token: string
  }
}

interface AuthContextData {
  signed: boolean
  login(document: string): Promise<void>
  logout(): void
  user: User | null
  patient: Patient | null
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [patient, setPatient] = useState<Patient | null>(null)

  /**
   *
   * @param document
   */
  async function login(document: string) {
    const response = (await api.post('/users/sessions', {
      document,
    })) as SignInResponse

    localStorage.setItem('@APP:user', JSON.stringify(response.data.user))
    localStorage.setItem('@APP:patient', JSON.stringify(response.data.patient))
    localStorage.setItem('@APP:token', response.data.token)

    api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`
  }

  /**
   *
   */
  function logout() {
    setUser({} as User)
    setPatient({} as Patient)
    localStorage.clear()
  }

  /**
   *
   */
  function tokenIsExpired() {}

  useEffect(() => {
    const storagedUser = localStorage.getItem('@APP:user') as string
    const storagedPatient = localStorage.getItem('@APP:patient') as string
    const storagedToken = localStorage.getItem('@APP:token') as string

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser))
      setPatient(JSON.parse(storagedPatient))
      api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(user), user, patient, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
