import React, { useEffect, useState } from 'react';
import GlobalStyles from './styles/global'
import {ThemeProvider} from 'styled-components'
import idk from './styles/themes/idk'
import customTheme from './theme'

import { CSSReset, ThemeProvider as ChakraThemeProvider } from '@chakra-ui/core';
import {ThemeProvider as EmotionThemeProvider} from 'emotion-theming'
import Header from './components/Header';
import { ApolloClient, ApolloLink, ApolloProvider, createHttpLink, from, fromPromise, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { onError } from "@apollo/client/link/error";
import { useRecoilState } from 'recoil';
import { accessToken } from './atoms/accessToken';
import { ProdutosComPaginacao } from './generated/graphql';
import SideMenu from './components/SideMenu';
import Routes from './Routes';
import Footer from './components/Footer';

function App({ children }: any) {
  const [token, setToken] = useRecoilState(accessToken)
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3333/refresh-token', {
      method: 'POST',
      credentials: 'include'
    }).then(async response => {
      const {accessToken} = await response.json()
      setToken(accessToken)
    })
  })

  async function handleRefreshToken(): Promise<String> {
    return fetch('http://localhost:3333/refresh-token', {
      method: 'POST',
      credentials: 'include'
    }).then(async response => {
      const {accessToken} = await response.json()
      setToken(accessToken)
      return accessToken
    })
  }

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

  const handleExpiredTokenLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if(err.message.includes('jwt expired')) {
          // error code is set to UNAUTHENTICATED
          // when AuthenticationError thrown in resolver
          return fromPromise(
            handleRefreshToken()
          )
            .filter(value => Boolean(value))
            .flatMap(accessToken => {
              // modify the operation context with a new token
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `bearer ${accessToken}`,
                },
              });
              // retry the request, returning the new observable
              return forward(operation);
            })
        }
      }

    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
      // if you would also like to retry automatically on
      // network errors, we recommend that you use
      // @apollo/client/link/retry
    }
  });

  const link = from([
    authLink,
    handleExpiredTokenLink,
    httpLink
  ])

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            produtos: {
              keyArgs: ['categorias', 'tarjas', 'concentracoes', 'principioAtivo', 'orderBy'],
              merge(existing: ProdutosComPaginacao | undefined, incoming: ProdutosComPaginacao, {args}): ProdutosComPaginacao {
                console.log(args)
                return {
                  ...incoming,
                  produtos: [...(existing?.produtos || []), ...incoming.produtos ]
                }
              }
            },
            me: {
              keyArgs: ['idUser']
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
            <Footer />
            <GlobalStyles />
          </EmotionThemeProvider>
        </ChakraThemeProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
