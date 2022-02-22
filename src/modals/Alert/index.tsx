import React from 'react'
import { Modal, Typography, IconButton } from '@mui/material'
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
  Header
} from './styles'

type PopUpProps = {
  isOpen: boolean,
  type: 'success' | 'warning' | 'info' | 'error',
  title: string,
  message: string,
  onCloseFunc: VoidFunction
}

export default function Alert(props: PopUpProps) {
  const { isOpen, title, message, onCloseFunc, type } = props

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
          <IconButton onClick={() => onCloseFunc()}>
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
      </Container>
    </Modal>
)
}