export interface Patient {
  patient_id: string
  firstname: string
  lastname: string
  birth_date: string
  user: User
  quizzes: Quiz[]
  created_at: string
  updated_at: string
}

export interface User {
  user_id: string
  username: string
  document: string
  email: string
  patient_id: string
  patient: Patient
  created_at: string
  updated_at: string
}

export interface Quiz {
  quiz_id: string
  result: string
  patient_id: string
  patient: Patient
  created_at: string
  updated_at: string
}