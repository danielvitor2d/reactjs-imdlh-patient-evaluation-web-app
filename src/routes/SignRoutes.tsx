import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn, SignUp } from '../pages'
import { useLayout } from '../hooks/useLayout'

const AppRoutes = () => {
  const { getMinimalLayout } = useLayout()

   return(
    <BrowserRouter>
      <Routes>
        <Route element={getMinimalLayout(SignIn)} path='*' />
        <Route element={getMinimalLayout(SignIn)}  path='/' />
        <Route element={getMinimalLayout(SignUp)}  path='/sign_up' />
      </Routes>
    </BrowserRouter>
   )
}

export default AppRoutes;