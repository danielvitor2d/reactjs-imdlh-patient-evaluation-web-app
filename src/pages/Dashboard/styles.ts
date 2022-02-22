import styled from 'styled-components'
import {
  Box as MuiBox,
  Container as MuiContainer
} from '@mui/material'

export const Container = styled(MuiBox)``

export const MainContent = styled(MuiContainer)`
  padding: 20px;
`

export const Topbar = styled(MuiBox)`
  width: 100%;
  background: ${props => props.theme.colors.paper};
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 3px;

  display: flex;
  flex-direction: row;
  align-items: center;

  button.styled_button {
    width: 200px;
    height: 40px;
    background: ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.paper};
    margin-left: 20px;

    &:hover {
      background: ${props => props.theme.colors.secondary.main};
    }
  }

  form {
    width: 100%;
    height: 100%;

    input {
      width: 300px;
    }
  }
`