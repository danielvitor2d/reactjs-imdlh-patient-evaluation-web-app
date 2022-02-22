import styled from 'styled-components'
import {
  Container as MuiContainer
} from '@mui/material'

export const MainContent = styled(MuiContainer)`
  width: 100vw;
  height: calc(100vh - 104px);

  display: flex;
  flex-direction: column;
  justify-content: center;

  form.register {
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

    button.signup_button {
      max-width: 230px;
      height: 52px;
      margin: 20px 0;
      background: ${props => props.theme.colors.primary.main};

      &:hover {
        background: ${props => props.theme.colors.secondary.main};
      }
    }

    span#login_with_existing_account {
      font-weight: bold;
      color: ${props => props.theme.colors.primary.main};
      text-decoration: underline;
      cursor: pointer;
    }
  }
`