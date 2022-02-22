import React from 'react'
import Layout from '../layout'

export function useLayout() {
  return {
    getMinimalLayout: (screen: JSX.Element) => {
      return (
        <Layout>
          {screen}
        </Layout>
      )
    }
  }
}