import React, { ReactNode } from 'react'

import { Container, Content } from './styles'
import { Header, Footer } from '../components'

interface Props {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Container>
      <Header />
        <Content>{children}</Content>
      <Footer />
    </Container>
  )
}