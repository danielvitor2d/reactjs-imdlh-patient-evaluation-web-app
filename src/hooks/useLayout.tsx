import React from 'react'
import Layout from '../layout'

export function useLayout() {
  return {
    getMinimalLayout: (page: JSX.Element) => {
      return (
        <Layout page={page} ></Layout>
      )
    }
  }
}