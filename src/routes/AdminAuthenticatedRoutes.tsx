import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import Layout from '../layout';

import {
  Dashboard,
  SignIn,
  SignUp,
  Results,
  PrintResult
} from '../pages'

export default function AdminAuthenticatedRoutes() {
   return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout page={<Dashboard />} />}  path='/' />
        <Route element={<Layout page={<SignIn />} />}  path='/sign_in' />
        <Route element={<Layout page={<SignUp/>} />}  path='/sign_up' />
        <Route element={<Layout page={<Results />} />}  path='/results/:userId' />
        <Route element={<Layout page={<PrintResult />} />}  path='/result/:resultId' />
      </Routes>
    </BrowserRouter>
   )
}
