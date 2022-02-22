import styled from 'styled-components'
import {
  Box as MuiBox,
  Container as MuiContainer,
} from '@mui/material'

export const Container = styled(MuiBox)``

export const MainContent = styled(MuiContainer)`
  height: calc(100vh - 104px);

  form.login {
    width: 100%;
    padding: 20px;
    border-radius: 5px;
    background: ${props => props.theme.colors.paper};

    display: flex;
    flex-direction: column;

    div.title_group {
      margin-bottom: 20px;

      h5 {
        font-weight: bold;
        line-height: 20px;
      }
      h6 {
        line-height: 20px;
      }
    }

    button.signin_button{
      height: 52px;
      margin-top: 10px;
      margin-bottom: 20px;
      background: ${props => props.theme.colors.primary.main};

      &:hover {
        background: ${props => props.theme.colors.secondary.main};
      }
    }

    span#create_new_account {
      font-weight: bold;
      color: ${props => props.theme.colors.primary.main};
      text-decoration: underline;
      cursor: pointer;
    }
  }
`