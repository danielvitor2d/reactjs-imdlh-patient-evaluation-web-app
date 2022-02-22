import styled from 'styled-components'
import { Box as MuiBox } from '@mui/material'

export const Container = styled(MuiBox)`
  height: 52px;
  padding: 0 20px;
  background: ${props => props.theme.colors.primary.main};

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    color: ${props => props.theme.colors.primary.contrastText};
    font-size: 16px;
    font-weight: 400;

    span {
      font-weight: bold;
    }
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.theme.colors.paper};
  }

  img#logo_image {
    width: 50px;
  }
`