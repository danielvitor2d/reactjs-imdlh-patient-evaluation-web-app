import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Typography,
  IconButton,
  Grid
} from '@mui/material'
import {
  RiDeleteBinLine,
  RiFileChartLine
} from 'react-icons/ri'

import {
  Container,
  MainContent,
  LatestResult,
  PastResults,
  ShowQuestions,
  PatientInformation,
  Card,
  ContentCard,
  FooterCard,
  HeaderCard
} from './styles'

import { Footer, Header, Chart, } from '../../components'
import { questions } from '../../mock/data'
import { api } from '../../services/api'
import { formatDate, getAge } from '../../utils/formatDate'
import { format } from '../../utils/documentTreatment'
import Confirm from '../../modals/Confirm'
import { jwtDecode } from '../../utils/tokenValidation'

type Result = {
  answers: string
  created_at: string
  id: string
  updated_at: string
}

type User = {
  birth_date: string
  created_at: string
  email: string
  fullname: string
  document: string
  results: Array<Result>
  id: string
  isRootUser: string
  updated_at: string
}

export default function Results() {
  const navigate = useNavigate()
  const { userId } = useParams()
  
  const [user, setUser] = useState<User>()
  const [selectedResultId, setSelectedResultId] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleGetUserData() {
    try {
      await api.get(`/users/${userId}`).then(response => {
        const user = response.data as User

        if (user.results.length) {

          user.results.sort((resultA, resultB) => {
            const dateA = new Date(resultA.created_at).getTime()
            const dateB = new Date(resultB.created_at).getTime()

            return dateA - dateB
          }).reverse()

          setUser(response.data as User)
        } else {
          alert('O paciente não possuí nenhum resultado pra ser exibido')
          navigate('/dashboard')
        }
      })
    } catch (error) {
      
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/results/${selectedResultId}`).then(() => {
        handleGetUserData()
        setSelectedResultId('')
      })
    } catch (error) {
      console.log(`it was not possible to delete the specified result.`)
    }
  }

  function formatStrResult(answers: string) {
    return JSON.parse(answers) as Array<number>
  }

  function handlePrintUniqueResult(resultId: string) {
    navigate(`/result/${resultId}`)
  }

  
  useEffect(() => {
    handleGetUserData()
  }, [user, userId, handleGetUserData])
  
  const default_arr_value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  const [deleteConfirm, setDeleteConfirm] = useState(false)
  
  function handleDeleteOpen(resultId: string) {
    setSelectedResultId(resultId)
    setDeleteConfirm(true)
  }

  function handleDeleteClose() {
    setDeleteConfirm(false)
  }

  function handleIfAuthRedirect() {
    const user = JSON.parse(localStorage.getItem('user') as string)
    const token = localStorage.getItem('token') as string

    if (token) {
      const jwtTokenDecoded = jwtDecode(token)
      if (jwtTokenDecoded.exp * 1000 < Date.now()) {
        localStorage.clear()
        navigate('/')
      }
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
      navigate('/')
    }
  }

  useEffect(() => {
    handleIfAuthRedirect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Confirm
        isOpen={deleteConfirm}
        onCloseFunc={handleDeleteClose}
        message={`
          O resultado referenciado será deletado efetivamente.
          Deseja realmente continuar?
        `}
        title={`Deletar resultado`}
        type="warning"
        handleFunc={handleDelete}
      />
      <Header showOptions />
      <MainContent maxWidth="lg">
        <LatestResult>
          <div className="header">
            <IconButton>
              <RiDeleteBinLine onClick={() => { handleDeleteOpen(user?.results[0].id as string) }} />
            </IconButton>
            <IconButton>
              <RiFileChartLine onClick={() => { window.print() }} />
            </IconButton>
          </div>
          <div className="latest_result_chart">
            <Chart
              userData={
                user ? formatStrResult(user.results[0].answers) : default_arr_value
              }
            />
          </div>
          <ShowQuestions>
            <Grid container spacing={2}>
              {
                questions.map(question => (
                  <Grid item xs={6} key={question.index}>
                    <Typography variant="subtitle2" gutterBottom component="span">
                      (Q{question.index}) | Resposta: {
                        user ? formatStrResult(user.results[0].answers)[question.index - 1] : question.index
                      } (de 10)
                      <Typography variant="body1" gutterBottom>
                        {question.utterance}
                      </Typography>
                    </Typography>
                  </Grid>
                ))
              }
            </Grid>
          </ShowQuestions>          
          <PatientInformation>
            <Typography variant="h6" gutterBottom component="h6">
              Dados Pessoais
            </Typography>
            <Grid container spacing={2} className="user_data">
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  Nome Completo:
                  <Typography variant="body1" gutterBottom>
                    {user ? user.fullname : 'default'}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={2} maxWidth="180px">
                <Typography variant="subtitle2" gutterBottom component="span">
                  Idade:
                  <Typography variant="body1" gutterBottom>
                    {user ? getAge(user.birth_date as string) : 'default'} anos
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  Documento (CPF):
                  <Typography variant="body1" gutterBottom>
                    {user ? format(user.document) : 'default'}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  E-mail:
                  <Typography variant="body1" gutterBottom>
                  {user ? user.email : 'default'}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  Resultado atual, criado em:
                  <Typography variant="body1" gutterBottom>
                  {user ? formatDate(user.results[0].created_at) : 'default'}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </PatientInformation>
        </LatestResult>
        <PastResults>
          <Typography variant="h6" gutterBottom component="h6">
              Resultados anteriores
          </Typography>
          <Grid container spacing={2}>
            {
              user?.results.slice(1).map(result => (
                <Grid item xs={4} key={result.id}>
                  <Card>
                    <HeaderCard>
                    <IconButton>
                      <RiDeleteBinLine onClick={() => { handleDeleteOpen(result.id) }} />
                    </IconButton>
                    <IconButton>
                      <RiFileChartLine onClick={() => { handlePrintUniqueResult(result.id) }} />
                    </IconButton>
                    </HeaderCard>
                    <ContentCard>
                      <div className="latest_result_chart">
                        <Chart
                          userData={
                            result ? formatStrResult(result.answers) : default_arr_value
                          }
                        />
                      </div>
                    </ContentCard>
                    <FooterCard>
                    <Typography variant="body1" gutterBottom>
                      {result ? formatDate(result.created_at) : 'default'}
                    </Typography>
                    </FooterCard>
                  </Card>
                </Grid>
              ))
            }
          </Grid>
        </PastResults>
      </MainContent>
      <Footer />
    </Container>
  )
}