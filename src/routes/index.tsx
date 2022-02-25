import React from 'react'

import { useAuth } from '../hooks'

import SignRoutes from './SignRoutes'
import PatientAuthenticatedRoutes from './PatientAuthenticatedRoutes'
import AdminAuthenticatedRoutes from './AdminAuthenticatedRoutes'

export default function Routes() {
  const { signed, patient } = useAuth()

  function getAuthRoutes() {
    if (patient) {
      return patient.patient_id ? (
        <PatientAuthenticatedRoutes />
      ) : (
        <AdminAuthenticatedRoutes />
      )
    }

    return <PatientAuthenticatedRoutes />
  }

  return signed ? getAuthRoutes() : <SignRoutes />
}