import styled from 'styled-components'
import {
  Box as MuiBox,
  Container as MuiContainer
} from '@mui/material'

export const Container = styled(MuiBox)`
  @media print {
    .do_not_print {
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

`

export const PastResults = styled(MuiBox)`
  width: 100%;
  margin-top: 20px;
  padding: 20px;
  border-radius: 5px;
  background: ${props => props.theme.colors.paper};

  @media print {
    display: none;
  }
`

export const Card = styled(MuiBox)`
  height: 380px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

export const HeaderCard = styled(MuiBox)`
  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const ContentCard = styled(MuiBox)`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div.latest_result_chart {
    width: 250px;
    height: 250px;
  }
`

export const FooterCard = styled(MuiBox)`
  width: 100%;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;
`