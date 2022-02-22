import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  Typography,
  IconButton,
  Grid
} from '@mui/material'
import {
  RiFileChartLine
} from 'react-icons/ri'

import {
  Container,
  MainContent,
  LatestResult,
  ShowQuestions,
  PatientInformation
} from './styles'

import { Footer, Header, Chart } from '../../components'
import { questions } from '../../mock/data'
import { api } from '../../services/api'
import { formatDate, getAge } from '../../utils/formatDate'
import { format } from '../../utils/documentTreatment'
import { jwtDecode } from '../../utils/tokenValidation'

type User = {
  birth_date: string
  created_at: string
  email: string
  fullname: string
  document: string
  id: string
  isRootUser: string
  updated_at: string
}

type Result = {
  answers: string
  created_at: string
  id: string
  updated_at: string
  user: User
}

export default function Results() {
  const navigate = useNavigate()
  const { resultId } = useParams()

  const [result, setResult] = useState<Result>()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleGetResultData() {
    try {
      await api.get(`/results/${resultId}`).then(response => {
        setResult(response.data as Result)
      })
    } catch (error) {
      
    }
  }

  function formatStrResult(answers: string) {
    return JSON.parse(answers) as Array<number>
  }

  useEffect(() => {
    handleGetResultData()
  }, [result, handleGetResultData])


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

  const default_arr_value = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  return (
    <Container>
      <Header showOptions />
      <MainContent maxWidth="lg">
        <LatestResult>
          <div className="header">
            <IconButton>
              <RiFileChartLine onClick={() => { window.print() }} />
            </IconButton>
          </div>
          <div className="latest_result_chart">
            <Chart
              userData={
                result ? formatStrResult(result.answers) : default_arr_value
              }
            />
          </div>
          <ShowQuestions>
            <Grid container spacing={2}>
              {
                questions.map(question => (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" gutterBottom component="span">
                      (Q{question.index}) | Resposta: {
                        result ? formatStrResult(result.answers)[question.index - 1] : question.index
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
                    {result?.user ? result?.user.fullname : 'default'}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={2} maxWidth="180px">
                <Typography variant="subtitle2" gutterBottom component="span">
                  Idade:
                  <Typography variant="body1" gutterBottom>
                    {result ? getAge(result?.user.birth_date as string) : 'default'} anos
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  Documento (CPF):
                  <Typography variant="body1" gutterBottom>
                    {result ? format(result?.user.document) : 'default'}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  E-mail:
                  <Typography variant="body1" gutterBottom>
                  {result ? result?.user.email : 'default'}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" gutterBottom component="span">
                  Resultado atual, criado em:
                  <Typography variant="body1" gutterBottom>
                  {result ? formatDate(result?.created_at) : 'default'}
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </PatientInformation>
        </LatestResult>
      </MainContent>
      <Footer />
    </Container>
  )
}