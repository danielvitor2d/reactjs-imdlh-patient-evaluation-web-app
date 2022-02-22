import React from 'react'
import { Modal, Typography, IconButton, Button } from '@mui/material'
import {
  RiCheckDoubleFill,
  RiErrorWarningFill,
  RiAlarmWarningFill,
  RiInformationLine,
  RiCloseFill
} from 'react-icons/ri'

import {
  Container,
  Content,
  Header,
  Footer
} from './styles'

type PopUpProps = {
  isOpen: boolean,
  type: 'success' | 'warning' | 'info' | 'error',
  title: string,
  message: string,
  onCloseFunc: VoidFunction,
  handleFunc: VoidFunction
}

export default function Confirm(props: PopUpProps) {
  const { isOpen, title, message, onCloseFunc, type, handleFunc } = props

  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={onCloseFunc}
    >
      <Container>
        <Header>
          <Typography variant="h6" component="h6">
            {title}
          </Typography>
          <IconButton onClick={() => { onCloseFunc() }}>
            <RiCloseFill />
          </IconButton>
        </Header>
        <Content>
          {type === 'success' && <RiCheckDoubleFill />}
          {type === 'warning' && <RiErrorWarningFill />}
          {type === 'info' && <RiInformationLine />}
          {type === 'error' && <RiAlarmWarningFill />}
          <Typography variant="body1" component="p">
            {message}
          </Typography>
        </Content>
        <Footer>
          <Button
            variant="outlined"
            onClick={() => { onCloseFunc() }}
            className="cancel_button"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleFunc()
              onCloseFunc()
            }}
            className="confirm_button"
            >
            Continuar
          </Button>
        </Footer>
      </Container>
    </Modal>
)
}