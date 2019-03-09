import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import BackgroundColorProvider from './components/BackgroundColorProvider'
import client from './config/apollo'
import store from './config/store'
import theme from './styles/theme'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client}>
          <BackgroundColorProvider>
            <App />
          </BackgroundColorProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
