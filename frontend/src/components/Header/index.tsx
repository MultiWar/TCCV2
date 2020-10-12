import { Button, Flex, Image, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import {useHistory} from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import AvatarComponent from '../AvatarComponent';
import { Container } from './styles';
import logoBranca from '../../testImages/logoBrancoHorizontal.png'

const Header: React.FC = () => {
  const [, setToken] = useRecoilState(accessToken)
  const [logout, {client}] = useLogoutMutation()
  const history = useHistory()
  const {data, loading} = useMeQuery()

  async function clearSession() {
    setToken('')
    await logout()
    await client.resetStore()
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
      <Flex direction='row' flexShrink={1}>
        <Flex maxWidth='200px'>
          <AvatarComponent />
        </Flex>
        <Button display={['none', 'none', 'none', 'unset']} background='transparent' _hover={{backgroundColor: '#555'}} h='100%' px={5} type='button' onClick={clearSession} fontSize='lg' fontWeight='regular'>
          <Text>Sair da conta</Text>
        </Button>
      </Flex>
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
          <Image h='50px' mb={2} src={logoBranca} mr = {(!data && !loading) ? ['unset', '-72px', '-72px', '-75px'] : ['unset', '-50px', '-50px', '-200px']} />
          <Flex>
            {endOfNavbar}
          </Flex>
      </Container>
  );
} 

export default Header;