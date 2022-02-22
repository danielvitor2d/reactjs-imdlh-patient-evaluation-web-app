import React from 'react'
import { RiCopyrightLine } from 'react-icons/ri'
import { Typography } from '@mui/material'

import { Container } from './styles'

export default function Footer() {
  return (
    <Container className="do_not_print">
      <Typography variant="subtitle2" gutterBottom component="h6">
        <RiCopyrightLine />
        Desenvolvido por&nbsp;
        <a
          href="http://instagram.com/wallacegmelo"
          target="_blank"
          rel="noreferrer"
        >@wallacegmelo</a>
        , Freelancer. Todos os direitos reservados.
      </Typography>
    </Container>
  )
}