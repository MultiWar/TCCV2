import React, { useEffect } from 'react';
import GlobalStyles from './styles/global'
import {ThemeProvider} from 'styled-components'
import idk from './styles/themes/idk'
import customTheme from './theme'

import { CSSReset, ThemeProvider as ChakraThemeProvider } from '@chakra-ui/core';
import {ThemeProvider as EmotionThemeProvider} from 'emotion-theming'
import Header from './components/Header';
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { useRecoilState } from 'recoil';
import { accessToken } from './atoms/accessToken';
import { ProdutosComPaginacao } from './generated/graphql';
import SideMenu from './components/SideMenu';
import Routes from './Routes';

function App({ children }: any) {
  const [token, setToken] = useRecoilState(accessToken)

  useEffect(() => {
    fetch('http://localhost:3333/refresh-token', {
      method: 'POST',
      credentials: 'include'
    }).then(async response => {
      const {accessToken} = await response.json()
      setToken(accessToken)
    })
  }, [])

  const httpLink = createHttpLink({
    uri: 'http://localhost:3333/graphql',
    credentials: 'include'
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
    cache: new InMemoryCache({
      typePolicies: {
        me: {
          keyFields: ['idUser']
        },
        Query: {
          fields: {
            produtos: {
              keyArgs: ['categorias', 'tarjas', 'concentracoes', 'principioAtivo', 'orderBy'],
              merge(existing: ProdutosComPaginacao | undefined, incoming: ProdutosComPaginacao): ProdutosComPaginacao {
                return {
                  ...incoming,
                  produtos: [...(existing?.produtos || []), ...incoming.produtos ]
                }
              }
            }
          }
        }
      }
    })
  })
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={idk}>
        <ChakraThemeProvider theme={customTheme}>
          <EmotionThemeProvider theme={customTheme}>
            <CSSReset />
            {children}
            <Header />
            <SideMenu />
            <Routes />
            <GlobalStyles />
          </EmotionThemeProvider>
        </ChakraThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
