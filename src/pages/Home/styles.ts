import styled from 'styled-components'
import {
  Box as MuiBox,
  Container as MuiContainer,
  Grid as MuiGrid
} from '@mui/material'

import banner_image_lg from '../../assets/images/imdlh_banner_lg.png'
import banner_image_md from '../../assets/images/imdlh_banner_md.png'
import banner_image_sm from '../../assets/images/imdlh_banner_sm.png'

export const Container = styled(MuiBox)`
  width: 100vw;
  height: 100%;
`

export const MainContent = styled(MuiContainer)`
  height: 100%;
  margin-top: 80px;
  margin-bottom: 20px;
  padding: 20px;
  background: ${props => props.theme.colors.paper};

  @media(max-width: 768px) {
    margin-top: 100px;
  }

  @media(max-width: 600px) {
    margin-top: 280px;
  }
  
  button.send {
    height: 52px;
    margin-top: 10px;
    margin-bottom: 20px;
    background: ${props => props.theme.colors.primary.main};

    &:hover {
      background: ${props => props.theme.colors.secondary.main};
    }
  }
`

export const Banner = styled(MuiBox)`
  position: relative;
  width: 100%;
  height: 300px;
  background-image:url('${banner_image_lg}');
  background-size: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  
  @media(max-width: 768px) {
    background-image:url('${banner_image_md}');
  }

  @media(max-width: 411px) {
    background-image:url('${banner_image_sm}');
  }
`

export const GridCards = styled(MuiGrid)`
  position: absolute;
  width: 100%;
  max-width: 960px;
  padding: 0 20px;
  bottom: -60px;

  @media(max-width: 600px) {
    top: 50px;
  }
`

export const Card = styled(MuiBox)`
  width: 100%;
  height: 150px;
  border-radius: 5px;
  background: ${props => props.theme.colors.primary.main};
  padding: 20px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  svg {
    width: 42px;
    height: 42px;
    margin-bottom: 10px;
    fill: ${props => props.theme.colors.primary.contrastText};
  }

  p {
    font-size: 16px;
    font-weight: 500;
    color: ${props => props.theme.colors.primary.contrastText};
    text-transform: uppercase;
  }
`

export const FlexQuestions = styled(MuiBox)``

export const Question = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  align-items: center;

  h5 {
    margin-bottom: 20px;
    text-align: center;
  }

  & + div {
    margin: 40px 0;
  }

  @media(max-width: 768px) {
    h5 {
      font-size: 22px;
    }
  }

  @media(max-width: 411px) {
    h5 {
      font-size: 18px;
    }
  }
`

export const GridOptions = styled(MuiGrid)`
  justify-content: center;
`

export const Option = styled.div`
  position: relative;
  width: 52px;
  height: 52px;
  margin: 0 10px;
  border-radius: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  label {
    position: absolute;
    font-size: 14px;
    font-weight: bold;
    color: ${props => props.theme.colors.secondary.contrastText};
  }

  input {
    width: 100%;
    height: 100%;
    background: none;
    caret-color: ${props => props.theme.colors.primary.main};
  }
`