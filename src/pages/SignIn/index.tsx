import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import {
  Typography,
  TextField,
  Button
} from '@mui/material'

import {
  Container,
  MainContent
} from './styles'

import { Footer, Header } from '../../components'
import { format, validate } from '../../utils/documentTreatment'
import { api } from '../../services/api'
import { Alert } from '../../modals'

type User = {
  birth_date: string
  created_at: string
  email: string
  fullname: string
  id: string
  isRootUser: string
  updated_at: string
}

type SignInRequest = {
  document: string
}

type SignInResponse = {
  success: string,
  user: User,
  token: string
}

export default function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  /**
   * role responsible for authenticating the user with the credentials in the 
   * database, setting the data in the application's localStorage and redirecting
   * it according to the access level.
   * @param data 
   */
  async function handleSignIn(data: SignInRequest) {
    if (data) {
      await validate(format(data.document)).then(async response => {
        if (response) {
          const { document } = data
          try {
            await api.post('/users/sessions', { document }).then(response => {
              const { token, user } = response.data as SignInResponse
    
              localStorage.setItem('token', token)
              localStorage.setItem('user', JSON.stringify(user))

              if (user.isRootUser === '0') {
                navigate('/home')
              } else {
                navigate('/dashboard')
              }
            })
          } catch (error) {
            handleOpenUnfModal()
          }
        } else {
          console.log('Auth | SignIn | The passwords entered do not match, enter them again.')
          handleOpensetIdModal()
        }
      })
    }
  }

  function handleIfAuthRedirect() {
    const user = JSON.parse(localStorage.getItem('user') as string)

    if (user) {
      if (user.isRootUser === '0') {
        console.log(`
          you are a regular user and you are already logged in to the application.
          redirecting...
        `)
        navigate(`/home`)
      } else {
        navigate(`/dashboard`)
      }
    }
  }

  useEffect(() => {
    handleIfAuthRedirect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // User not found Modal
  const [unfModal, setUnfModal] = useState(false)

  function handleOpenUnfModal() {
    setUnfModal(true)
  }

  function handleCloseUnfModal() {
    setUnfModal(false)
  }

  // Invalid Document found Modal
  const [idModal, setIdModal] = useState(false)

  function handleOpensetIdModal() {
    setIdModal(true)
  }

  function handleClosesetIdModal() {
    setIdModal(false)
  }

  return (
    <Container>
      <Alert
        isOpen={unfModal}
        message={`
          Não foi encontrado em nossa base de dados nenhum usuário com as credenciais
          informadas. Tente novamente.
        `}
        onCloseFunc={handleCloseUnfModal}
        title="Erro ao logar"
        type="error"
      />
      <Alert
        isOpen={idModal}
        message={`Informe-o novamente sem pontuação ou vírgulas.`}
        onCloseFunc={handleClosesetIdModal}
        title="Documento inválido"
        type="warning"
      />
      <Header />
      <MainContent maxWidth="xs" sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <form className="login" onSubmit={handleSubmit(handleSignIn)}>
          <div className="title_group">
            <Typography variant="h5" gutterBottom component="h5">
              Olá! Bem-vindo de volta.
            </Typography>
            <Typography variant="subtitle1" gutterBottom component="h6">
              Insira seu CPF para logar na aplicação
            </Typography>
          </div>
          <TextField
            {...register('document')}
            id="outlined-basic"
            label="CPF"
            type="number"
            variant="outlined"
            margin="dense"
            required
          />
          <Button
            variant="contained"
            type="submit"
            className="signin_button"
          >
            Entrar
          </Button>
          <Typography variant="body1" gutterBottom>
            Ainda não possui uma conta?&nbsp;
            <span id="create_new_account" onClick={() => navigate('/sign_up')}>
              Criar conta
            </span>.
          </Typography>
        </form>
      </MainContent>
      <Footer />
    </Container>
  )
}