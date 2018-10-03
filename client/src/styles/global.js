import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: spotify-circular, "Helvetica Neue", Helvetica, Arial, "Hiragino Kaku Gothic Pro", Meiryo, "MS Gothic", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }


  @font-face {
    font-family: spotify-circular;
    src:
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Light.woff2) format("woff2"),
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Light.woff) format("woff"),
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Light.ttf) format("ttf");
    font-weight: 200;
    font-style: normal;
    font-display:swap
  }

  @font-face {
    font-family: spotify-circular;
    src:
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff2) format("woff2"),
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Book.woff) format("woff"),
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Book.ttf) format("ttf");
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: spotify-circular;
    src:
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff2) format("woff2"),
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Bold.woff) format("woff"),
      url(https://open.scdn.co/fonts/CircularSpUIv3T-Bold.ttf) format("ttf");
    font-weight: 600;
    font-style: normal;
    font-display: swap
  }
`

export default GlobalStyle
