import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { IconButton, Typography } from '@mui/material'

import logo from '../../assets/logos/imdlh_logo.png'

import { Container } from './styles'

type User = {
  birth_date: string
  created_at: string
  email: string
  firstname: string
  lastname: string
  id: string
  isRootUser: string
  updated_at: string
}

interface HeaderProps {
  showOptions?: boolean
}

export default function Header({ showOptions = false }: HeaderProps) {
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear()
    navigate('/')
    document.location.reload()
  }

  function getPatientName(): string {
    const user = JSON.parse(localStorage.getItem('@APP:user') as string) as User

    if (user) {
      return user?.firstname
    }

    return ''
  }

  return (
    <Container className="do_not_print">
      <img src={logo} alt="Instituto Médico Dr. Lucas Heringer" id="logo_image" />
      <Typography
        style={{
          display: showOptions ? 'block' : 'none'
        }}
        variant="body2"
        component="p"
      >
        Olá <span>{getPatientName()},</span> bem-vindo!
      </Typography>
      <IconButton
        style={{
          display: showOptions ? 'block' : 'none'
        }}
        onClick={() => { handleLogout() }}
      >
        <RiLogoutBoxLine />
      </IconButton>
    </Container>
  )
}