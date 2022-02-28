import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components'

import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  LinearScale
} from 'chart.js'

import GlobalStyles from './theme/global'
import theme from './theme/theme'

import Routes from './routes'
import { AuthProvider } from './contexts/Auth';

Chart.register(RadialLinearScale)
Chart.register(PointElement)
Chart.register(LineElement)
Chart.register(LinearScale)

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);