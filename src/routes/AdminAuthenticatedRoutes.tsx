import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import {
  Dashboard,
  Home,
  SignIn,
  SignUp,
  Results,
  PrintResult
} from '../pages'

const AppRoutes = () => {
   return(
    <BrowserRouter>
      <Routes>
        <Route element={<Dashboard />}  path='/dashboard' />
        <Route element={<Home />}  path='/home' />
        <Route element={<SignIn/>}  path='*' />
        <Route element={<SignIn />}  path='/' />
        <Route element={<SignUp/>}  path='/sign_up' />
        <Route element={<Results />}  path='/results/:userId' />
        <Route element={<PrintResult />}  path='/result/:resultId' />
      </Routes>
    </BrowserRouter>
   )
}

export default AppRoutes;