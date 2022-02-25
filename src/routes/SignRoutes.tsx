import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SignIn, SignUp } from '../pages'

import Layout from '../layout';

export default function SignRoutes() {
  return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout page={<SignIn />} />} path='/sign_in' />
        <Route element={<Layout page={<SignUp />} />} path='/sign_up' />
      </Routes>
    </BrowserRouter>
  )
}
