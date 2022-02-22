import React, { useState } from 'react'
import { Modal, Typography, IconButton, Grid, TextField, Button } from '@mui/material'
import {
  RiCloseFill
} from 'react-icons/ri'

import {
  Container,
  Content,
  Header,
  Footer
} from './styles'
import { useForm } from 'react-hook-form'
import { Alert } from '../..'
import { api } from '../../../services/api'
import { format, validate } from '../../../utils/documentTreatment'

type PopUpProps = {
  isOpen: boolean,
  title: string,
  onCloseFunc: VoidFunction,
}

type SignUpRequest = {
  firstname: string,
  lastname: string,
  document: string,
  birth_date: string,
  email: string,
  password: string,
  password_confirmed: string
}


export default function Create(props: PopUpProps) {
  const { isOpen, title, onCloseFunc } = props
  const { register, handleSubmit, setValue } = useForm()

  function clearFields() {
    setValue('firstname', '')
    setValue('lastname', '')
    setValue('document', '')
    setValue('birth_date', '')
    setValue('email', '')
    setValue('password', '')
    setValue('password_confirmed', '')
  }

  async function handleSignUp(data: SignUpRequest) {
    if (data) {
      try {
        await validate(format(data.document)).then(async response => {
          if (response) {
            if (data.password === data.password_confirmed) {
              const {
                firstname,
                lastname,
                document,
                birth_date,
                email,
                password,
              } = data as SignUpRequest
              
              try {
                await api.post('users', {
                  fullname: `${firstname} ${lastname}`,
                  document,
                  birth_date,
                  email,
                  password,
                }).then(() => {
                  clearFields()
                  onCloseFunc()
                })
              } catch (error) {
                handleOpenDbUser()
              }
            } else {
              handleOpenDifferentPasswordsModal()
            }
          } else {
            handleOpenInvalidDocument()
          }
        })
      } catch (error) {
        console.error(`
          It was not possible to execute the document validation function
          due to the error: ${error}.
        `)
      }
    }
  }

  // Different passwords modal
  const [differentPasswordsModal, setDifferentPasswordsModal] = useState(false)

  function handleOpenDifferentPasswordsModal() {
    setDifferentPasswordsModal(true)
  }

  function handleCloseDifferentPasswordsModal() {
    setDifferentPasswordsModal(false)
  }

  // Invalid CPF Modal
  const [invalidDocument, setInvalidDocument] = useState(false)
  
  function handleOpenInvalidDocument() {
    setInvalidDocument(true)
  }

  function handleCloseInvalidDocument() {
    setInvalidDocument(false)
  }

  // dbUser Modal
  const [dbUser, setDbUser] = useState(false)
  
  function handleOpenDbUser() {
    setDbUser(true)
  }

  function handleCloseDbUser() {
    setDbUser(false)
  }

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={onCloseFunc}
    >
      <Container>
        <Alert
          isOpen={differentPasswordsModal}
          message={`
            As senhas informadas são incoerentes entre si.
            Insira-as novamente.
          `}
          onCloseFunc={handleCloseDifferentPasswordsModal}
          title={`Senhas não coincidem`}
          type={`warning`}
        />
        <Alert
          isOpen={invalidDocument}
          message={`
            O documento informado não parece ser um CPF válido.
            Informe-o novamente sem pontuação ou vírgulas.
          `}
          onCloseFunc={handleCloseInvalidDocument}
          title={`Documento inválido`}
          type={`warning`}
        />
        <Alert
          isOpen={dbUser}
          message={`
            Provavelmente alguma das credenciais informadas já pertence a um usuário
            em nossa base de dados.
            Tente novamente, se persistir procure a assistência técnica.
          `}
          onCloseFunc={handleCloseDbUser}
          title={`Erro ao cadastrar-se`}
          type={`warning`}
        />
        <Header>
          <Typography variant="h6" component="h6">
            {title}
          </Typography>
          <IconButton onClick={() => onCloseFunc()}>
            <RiCloseFill />
          </IconButton>
        </Header>
        <form className="register" onSubmit={handleSubmit(handleSignUp)}>
          <Content>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  {...register('firstname')}
                  label="Nome"
                  helperText="Seu nome"
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  {...register('lastname')}
                  label="Sobrenome"
                  helperText="Seu sobrenome"
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  {...register('document')}
                  label="CPF"
                  helperText="Nº do seu documento"
                  type="number"
                  autoComplete="cpf"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  {...register('birth_date')}
                  type="date"
                  helperText="Data do seu nascimento"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  {...register('email')}
                  type="email"
                  label="E-mail"
                  helperText="Seu endereço de e-mail"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  {...register('password')}
                  label="Senha"
                  helperText="Sua senha de login"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TextField
                  {...register('password_confirmed')}
                  label="Confirmar senha"
                  helperText="Insira novamente a sua senha"
                  type="password"
                  variant="outlined"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </Content>
          <Footer>
            <Button
              variant="outlined"
              onClick={() => {
                onCloseFunc()
                clearFields()
              }}
              className="cancel_button"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              type="submit"
              className="execute_button"
            >
              Salvar
            </Button>
          </Footer>
        </form>
      </Container>
    </Modal>
  )
}