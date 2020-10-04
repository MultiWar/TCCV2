import React from 'react';
import GlobalStyles from './styles/global'
import {ThemeProvider} from 'styled-components'
import idk from './styles/themes/idk'
import customTheme from './theme'

import { CSSReset, ThemeProvider as ChakraThemeProvider } from '@chakra-ui/core';
import {ThemeProvider as EmotionThemeProvider} from 'emotion-theming'
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { useRecoilState } from 'recoil';
import { accessToken } from './atoms/accessToken';

function App({ children }: any) {

  const [token, setToken] = useRecoilState(accessToken)

  const httpLink = createHttpLink({
    uri: 'http://localhost:3333/graphql'
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : ''
      }
    }
  })

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    credentials: 'include'
  })

  console.log('accessToken: ', token)

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={idk}>
        <ChakraThemeProvider theme={customTheme}>
          <EmotionThemeProvider theme={customTheme}>
            <CSSReset />
            {children}
            <Header />
            <Switch>
              {/* <Route exact path='/' component={} /> */}
              <Route path='/cadastro' component={Cadastro} />
              <Route path='/login' component={Login} />
            </Switch>
            <GlobalStyles />
          </EmotionThemeProvider>
        </ChakraThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
