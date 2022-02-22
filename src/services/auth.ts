import { format, validate } from '../utils/documentTreatment'
import { api } from './api'

type User = {
  birth_date: string
  created_at: string
  email: string
  fullname: string
  id: string
  isRootUser: string
  updated_at: string
}

type SignInRequest = {
  document: string,
}

type SignInResponse = {
  success: string,
  user: User,
  token: string
}

type SignUpRequest = {
  firstname: string,
  lastname: string,
  document: string,
  birth_date: string,
  email: string,
  password: string,
  password_confirmed: string
}
