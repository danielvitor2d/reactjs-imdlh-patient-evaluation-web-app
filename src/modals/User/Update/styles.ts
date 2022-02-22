import styled from 'styled-components'
import {
  Box as MuiBox
} from '@mui/material'

export const Container = styled(MuiBox)`
  width: 40%;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.paper};
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`

export const Header = styled(MuiBox)`
  width: 100%;
  height: 52px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const Content = styled(MuiBox)`
  margin: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    width: 96px;
    height: 96px;
    fill: ${props => props.theme.colors.secondary.contrastText};
  }

  p {
    flex: 1;
    margin-left: 20px;
  }
`

export const Footer = styled(MuiBox)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;

  button.execute_button {
    width: 100px;
    height: 40px;
    background: ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.paper};
    margin-left: 20px;

    &:hover {
      background: ${props => props.theme.colors.secondary.main};
    }
  }
  
  button.cancel_button {
    width: 100px;
    height: 40px;
    border: 1px solid ${props => props.theme.colors.primary.main};
    color: ${props => props.theme.colors.secondary.contrastText};
    margin-left: 20px;
  }
`