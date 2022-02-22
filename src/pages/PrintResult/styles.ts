import styled from 'styled-components'
import {
  Box as MuiBox,
  Container as MuiContainer
} from '@mui/material'

export const Container = styled(MuiBox)`
  .do_not_print {
    @media print {
      display: none;
    }
  }
`

export const MainContent = styled(MuiContainer)`
  padding: 20px;
`

export const LatestResult = styled(MuiBox)`
  padding: 20px;
  border-radius: 5px;
  background: ${props => props.theme.colors.paper};

  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-weight: bold;
  }

  div.header {
    width: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;

    button {
      margin: 0 5px;
    }

    svg {
      fill: ${props => props.theme.colors.secondary.contrastText};
    }

    @media print {
      display: none;
    }
  }

  div.latest_result_chart {
    width: 850px;
    padding: 40px;
    margin-bottom: 20px;
  }
  
`

export const ShowQuestions = styled(MuiBox)`
  width: 100%;
  padding: 20px;
  border-top: 2px solid ${props => props.theme.colors.background};
`

export const PatientInformation = styled(MuiBox)`
  width: 100%;
  padding: 20px;
  border-top: 2px solid ${props => props.theme.colors.background};

  .user_data {
    width: 80%;
  }

  @media print {
    page-break-before: always
  }
`

export const PastResults = styled(MuiBox)`
  width: 100%;
`

export const Card = styled(MuiBox)``