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
import { User } from '../../types'

export default function Dashboard() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const [users, setUsers] = useState<User[]>([])

  // const UserController = {
  //   index: async () => {
  //     try {
  //       await api.get('/users').then(response => {
  //         return response.data
  //       })
  //     } catch (error) {
  //       console.log(`it was not possible to search users in the database. error: ${error}`)
  //     }
  //     return []
  //   },
  //   searchByFullName: async (keyword: string) => {
  //     try {
  //       await api.get(`/users/?keyword=${keyword}`).then(response => {
  //         setUsers(response.data)
  //       })
  //     } catch (error) {
  //       console.log('it was not possible to search users in the database.')
  //     }
  //   }
  // }

  async function handleGetUsers() {
    const response = await api.get('/users')
    const users: User[] = response.data.users
    setUsers(users)
  }

  function handleSearch(data: { keyword: string }) {
    // if (data.keyword) {
    //   UserController["searchByFullName"](data.keyword)
    // } else {
    //   UserController["index"]()
    // }
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  useEffect(() => { 
    function handleIfAuthRedirect() {
      const token = localStorage.getItem('@APP:token') as string
      
      if (token) {
        const jwtTokenDecoded = jwtDecode(token)
        if (jwtTokenDecoded.exp * 1000 < Date.now()) {
          localStorage.clear()
          navigate('/')
          document.location.reload()
        }
      } else {
        localStorage.clear()
        navigate('/')
        document.location.reload()
      }
  
      const patient = JSON.parse(localStorage.getItem('@APP:patient') as string)
  
      if (patient && patient.patient_id) {
        console.log(`
          you are a regular user and you are already logged in to the application.
          redirecting...
        `)
        navigate(`/home`)
        document.location.reload()
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
    handleGetUsers()
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
          getUserDataFunc={handleGetUsers}
        />
      </MainContent>
      <Footer />
    </Container>
  )
}