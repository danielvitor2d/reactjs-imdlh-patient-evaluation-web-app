import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button } from '@mui/material'

import {
  Container,
  MainContent,
  Topbar
} from './styles'

import { Footer, Header, Table } from '../../components'
import { api } from '../../services/api'
import { Create } from '../../modals/User'
import { useNavigate } from 'react-router'
import { jwtDecode } from '../../utils/tokenValidation'

export default function Dashboard() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const [users, setUsers] = useState([])

  const UserController = {
    index: async () => {
      try {
        await api.get('/users').then(response => {
          return response.data
        })
      } catch (error) {
        console.log(`it was not possible to search users in the database. error: ${error}`)
      }
      return []
    },
    searchByFullName: async (keyword: string) => {
      try {
        await api.get(`/users/?keyword=${keyword}`).then(response => {
          setUsers(response.data)
        })
      } catch (error) {
        console.log('it was not possible to search users in the database.')
      }
    }
  }

  async function handleGetData() {
    const users = await UserController["index"]()
    setUsers(users)
  }

  function handleSearch(data: { keyword: string }) {
    if (data.keyword) {
      UserController["searchByFullName"](data.keyword)
    } else {
      UserController["index"]()
    }
  }

  useEffect(() => {
    handleGetData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => { 
    function handleIfAuthRedirect() {
      const user = JSON.parse(localStorage.getItem('user') as string)
      const token = localStorage.getItem('token') as string
  
      if (token) {
        const jwtTokenDecoded = jwtDecode(token)
        if (jwtTokenDecoded.exp * 1000 < Date.now()) {
          localStorage.clear()
          navigate('/')
        }
      } else {
        localStorage.clear()
        navigate('/')
      }
  
      if (user) {
        if (user.isRootUser === '0') {
          console.log(`
            you are a regular user and you are already logged in to the application.
            redirecting...
          `)
          navigate(`/home`)
        }
      } else {
        localStorage.clear()
        navigate('/')
      }
    }

    handleIfAuthRedirect()
   }, [navigate])

  const [createModal, setCreateModal] = useState(false)
  
  function handleCreateOpen() {
    setCreateModal(true)
  }

  function handleCreateClose() {
    setCreateModal(false)
    handleGetData()
  }

  return (
    <Container>
      <Create
        isOpen={createModal}
        onCloseFunc={handleCreateClose}
        title={`Adicionar um novo paciente`}
      />
      <Header showOptions />
      <MainContent maxWidth="lg">
        <Topbar>
          <form className="search" onSubmit={handleSubmit(handleSearch)}>
            <TextField
              {...register('keyword')}
              label="Nome do paciente"
              type="text"
              variant="outlined"
              size="small"
            />
            <Button type="submit" className="styled_button">
              Pesquisar
            </Button>
          </form>

          <Button onClick={() => { handleCreateOpen() }} className="styled_button">
            Novo paciente
          </Button>
        </Topbar>
        <Table
          users={users}
          getUserDataFunc={handleGetData}
        />
      </MainContent>
      <Footer />
    </Container>
  )
}