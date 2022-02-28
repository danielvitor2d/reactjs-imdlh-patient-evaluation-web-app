import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { Grid, Typography, Button } from '@mui/material'
import {
  RiTimerLine,
  RiQuestionAnswerLine,
  RiDatabase2Line,
} from 'react-icons/ri'

import {
  Container,
  MainContent,
  Banner,
  Card,
  GridCards,
  FlexQuestions,
  Question,
  GridOptions,
  Option
} from './styles'

import { Footer, Header } from '../../components'

import { Alert } from '../../modals'
import { questions } from '../../mock/data'
import { api } from '../../services/api'
import { jwtDecode } from '../../utils/tokenValidation'

type User = {
  birth_date: string
  created_at: string
  email: string
  fullname: string
  id: string
  isRootUser: string
  updated_at: string
}

export default function Home() {
  const itemsNum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  async function handleSendReplies(data: any) {
    const {
      'Saber lidar com o estresse': question_one,
      'Relacionamentos / Família / Amigos': question_two,
      'Trabalho / Carreira / Educação': question_three,
      'Finanças / Dinheiro': question_four,
      'Atividade Física': question_five,
      'Sono': question_six,
      'Forma Física / Peso / Autocuidado': question_seven,
      'Alimentação': question_eight,
      'Sentimento de Vida / Crescimento Pessoal / Espitualidade': question_nine,
      'Relacionamento Afetivo / Casal': question_ten,
      'Lazer / Diversão': question_eleven,
      'Vitalidade / Ânimo / Energia': question_twelve,
    } = data

    const formattedResults: Array<number> = [
      parseInt(question_one),
      parseInt(question_two),
      parseInt(question_three),
      parseInt(question_four),
      parseInt(question_five),
      parseInt(question_six),
      parseInt(question_seven),
      parseInt(question_eight),
      parseInt(question_nine),
      parseInt(question_ten),
      parseInt(question_eleven),
      parseInt(question_twelve)
    ]

    try {
      const user = JSON.parse(localStorage.getItem('user') as string) as User
      await api.post(`/results/${user.id}`, {
        answers: JSON.stringify(formattedResults)
      }).then(response => {
        questions.map(question => (
          itemsNum.map(itemNum => {
            const radio = (document.querySelector(`input[id="answer_${itemNum}_${question?.utterance}"]`)) as HTMLInputElement
            radio.checked = false
            return null
          })
        ))

        handleOpen()
      })
    } catch (error) {
      console.log('Não foi possível inserir um novo resultado na api')
    }
  }

  const [alertOpen, setAlertOpen] = useState(false)
  
  function handleOpen() {
    setAlertOpen(true)
  }

  function handleClose() {
    setAlertOpen(false)
  }

  function handleIfAuthRedirect() {
    const patient = JSON.parse(localStorage.getItem('@APP:patient') as string)
    const token = localStorage.getItem('@APP:token') as string

    if (token) {
      const jwtTokenDecoded = jwtDecode(token)
      if (jwtTokenDecoded.exp * 1000 < Date.now()) {
        localStorage.clear()
        navigate('/')
        document.location.reload()
      }
    }

    if (patient) {
      if (!patient.patient_id) {
        console.log(`
          you are a root user and you are already logged in to the application.
          redirecting...
        `)
        navigate(`/dashboard`)
        document.location.reload()
      }
    }
  }

  useEffect(() => {
    handleIfAuthRedirect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Alert
        isOpen={alertOpen}
        onCloseFunc={handleClose}
        message={`Os dados foram enviados com sucesso!`}
        title={`Formulário concluído`}
        type="success"
      />
      <Header showOptions />
      <Banner>
        <GridCards container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Card>
              <RiTimerLine />
              <Typography variant="h6" component="p">
                Dura menos de 10 minutos, responda com calma.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Card>
              <RiQuestionAnswerLine />
              <Typography variant="h6" component="p">
                Responda honestamente todas as perguntas.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <Card>
              <RiDatabase2Line />
              <Typography variant="h6" component="p">
                Você pode conferir os seus resultados quando quiser.
              </Typography>
            </Card>
          </Grid>
        </GridCards>
      </Banner>
      <MainContent maxWidth="lg">
        <form className="send-results" onSubmit={handleSubmit(handleSendReplies)}>
          <FlexQuestions>
            {
              questions.map(question => (
                <Question key={question.index}>
                  <Typography variant="h5" component="h5">
                    {question.utterance}
                  </Typography>
                  <GridOptions container spacing={1}>
                    {
                      itemsNum.map(itemNum => (
                        <Option key={itemNum}>
                          <label htmlFor={`answer_${itemNum}_${question?.utterance}`}>{itemNum}</label>
                          <input
                            {...register(`${question?.utterance}`)}
                            type="radio"
                            name={`${question?.utterance}`}
                            id={`answer_${itemNum}_${question?.utterance}`}
                            value={itemNum}
                            required
                          />
                        </Option>
                      ))
                    }
                  </GridOptions>
                </Question>
              ))
            }
          </FlexQuestions>
          <Button
            variant="contained"
            type="submit"
            className="send"
          >Enviar respostas</Button>
        </form>
      </MainContent>
      <Footer />
    </Container>
  )
}