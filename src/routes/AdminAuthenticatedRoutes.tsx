import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import Layout from '../layout';

import {
  Dashboard,
  Results,
  PrintResult
} from '../pages'

export default function AdminAuthenticatedRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}  path='/dashboard' />
        <Route element={<Dashboard />}  path='/' />
        <Route element={<Layout page={<Results />} />}  path='/results/:userId' />
        <Route element={<Layout page={<PrintResult />} />}  path='/result/:resultId' />
      </Routes>
    </BrowserRouter>
  )
}
