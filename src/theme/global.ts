import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
  }

  body {
    background: ${props => props.theme.colors.background};
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  @media print {
    * {
      background:transparent !important;
      color:#000 !important;
      text-shadow:none !important;
      filter:none !important;
      -ms-filter:none !important;
    }

    body {
      margin:0;
      padding:0;
      line-height: 1.4em;
    }

    nav, footer, video, audio, object, embed { 
    display:none; 
    }
  }
`