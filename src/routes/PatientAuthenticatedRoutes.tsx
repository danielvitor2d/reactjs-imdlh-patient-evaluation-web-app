import React from 'react'

import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';

import Layout from '../layout';

import {
  Home,
  Results,
  PrintResult
} from '../pages'

export default function PatientAuthenticatedRoutes() {
   return(
    <BrowserRouter>
      <Routes>
        <Route element={<Layout page={<Home />} />}  path='/' />
        <Route element={<Layout page={<Results />} />}  path='/results/:userId' />
        <Route element={<Layout page={<PrintResult />} />}  path='/result/:resultId' />
      </Routes>
    </BrowserRouter>
   )
}