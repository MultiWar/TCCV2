import { Button, Flex, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import { useCookies } from 'react-cookie';
import {useHistory} from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';
import { useMeQuery } from '../../generated/graphql';
import AvatarComponent from '../AvatarComponent';
import { Container } from './styles';

const Header: React.FC = () => {
  const [, setToken] = useRecoilState(accessToken)
  const [cookies, setCookie, removeCookie] = useCookies(['jid'])
  const history = useHistory()
  const {data, loading} = useMeQuery()

  function clearSession() {
    removeCookie('jid', {})
    setToken('')
  }

  let endOfNavbar
  if(loading) {
    return (
      <Container />
    )
  }
  if(!data?.me && !loading) {
    endOfNavbar = (
      <>
        <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' px={5} fontSize='lg' fontWeight='regular' type='button' onClick={() => history.push('/login')}>
          <Text>Entrar</Text>
        </Button>
        <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' px={5} fontSize='lg' fontWeight='regular' type='button' onClick={() => history.push('/cadastro')}>
          <Text>Se cadastrar</Text>
        </Button>      
      </>
    )
  }
  else {
    endOfNavbar = (
      <>
        <Flex maxWidth='200px'>
          <AvatarComponent />
        </Flex>
        <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' px={5} type='button' onClick={clearSession} fontSize='lg' fontWeight='regular'>
          <Text>Sair da conta</Text>
        </Button>
      </>
    )
  }

  return (
      <Container>
          <Flex>
            <Stack>
              <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' px={5} fontSize='xl' fontWeight='regular' type='button' onClick={() => history.push('/')}>
                <Text>Página Inicial</Text>
              </Button>
            </Stack>
          </Flex>
          <Flex>
            {endOfNavbar}
          </Flex>
      </Container>
  );
}

export default Header;