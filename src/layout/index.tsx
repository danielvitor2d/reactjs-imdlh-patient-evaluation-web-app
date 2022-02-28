import React from 'react'

import { Container, Content } from './styles'

import { Header, Footer } from '../components'

interface LayoutProps {
  page: JSX.Element
}

export default function Layout({ page }: LayoutProps) {
  return (
    <Container>
      <Content>
        <Header />
          {page}
        <Footer />
      </Content>
    </Container>
  )
}
