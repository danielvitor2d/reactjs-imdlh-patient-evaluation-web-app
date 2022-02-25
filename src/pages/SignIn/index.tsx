import React, { useContext, useEffect, useState } from 'react'
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

import { Footer } from '../../components'

import { Alert } from '../../modals'

import { AuthContext } from '../../contexts'
import { validate } from '../../utils/documentTreatment'

type Patient = {
  patient_id: string
}

type User = {
  id: string
}
type SignInRequest = {
  document: string
}

export default function SignIn() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const authContext = useContext(AuthContext)

  const [userNotFoundModal, setUserNotFoundModal] = useState(false)
  const [invalidDocumentModal, setInvalidDocumentModal] = useState(false)

  /**
   * role responsible for authenticating the user with the credentials in the 
   * database, setting the data in the application's localStorage and redirecting
   * it according to the access level.
   * @param data 
   */
  async function handleSignIn(data: SignInRequest) {
    const { document } = data
    if (!validate(document)) {
      handleOpenInvalidDocumentModal()
    } else {
      authContext
        .login(document)
        .then(() => {
          navigate('/')
        })
        .catch((err) => {
          console.log(err)
          handleOpenUserNotFoundModal()
        })
    }
  }

  function handleIfAuthRedirect() {
    const user: User = JSON.parse(localStorage.getItem('user') as string)
    const patient: Patient = JSON.parse(localStorage.getItem('user') as string)

    if (user) {
      if (!patient.patient_id) {
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

  function handleOpenUserNotFoundModal() {
    setUserNotFoundModal(true)
  }

  function handleCloseUserNotFoundModal() {
    setUserNotFoundModal(false)
  }

  function handleOpenInvalidDocumentModal() {
    setInvalidDocumentModal(true)
  }

  function handleCloseInvalidDocumentModal() {
    setInvalidDocumentModal(false)
  }

  return (
    <Container>
      <Alert
        isOpen={userNotFoundModal}
        message={`
          Não foi encontrado em nossa base de dados nenhum usuário com as credenciais
          informadas. Tente novamente.
        `}
        onCloseFunc={handleCloseUserNotFoundModal}
        title="Erro ao logar"
        type="error"
      />
      <Alert
        isOpen={invalidDocumentModal}
        message={`Informe-o novamente sem pontuação ou vírgulas.`}
        onCloseFunc={handleCloseInvalidDocumentModal}
        title="Documento inválido"
        type="warning"
      />
      <MainContent maxWidth="xs" sx={{
        display: 'flex',
        flexDirection: 'row',
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