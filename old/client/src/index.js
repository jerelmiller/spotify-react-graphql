import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import BackgroundColorProvider from './components/BackgroundColorProvider'
import client from './config/apollo'
import store from './config/store'
import theme from './styles/theme'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from '@apollo/react-hooks'
import { Provider } from 'react-redux'
import { ThemeProvider as LegacyThemeProvider } from 'styled-components'
import { ThemeProvider } from 'emotion-theming'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <LegacyThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <BackgroundColorProvider>
              <App />
            </BackgroundColorProvider>
          </ApolloProvider>
        </ThemeProvider>
      </LegacyThemeProvider>
    </Provider>
  </Router>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
