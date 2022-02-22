import styled from 'styled-components'
import { Box as MuiBox } from '@mui/material'

export const Container = styled(MuiBox)`
  width: 100%;
  height: 52px;
  background: ${props => props.theme.colors.paper};

  display: flex;
  align-items: center;

  h6 {
    margin: 0 auto;
    line-height: 0;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    svg {
      width: 20px;
      height: 20px;
      margin: 0 5px;
    }
  }

  a {
    color: ${props => props.theme.colors.primary.main};
    font-weight: bold;
  }
`