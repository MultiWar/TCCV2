import { Button, Flex, Image, Stack, Text } from '@chakra-ui/core';
import React from 'react';
import {useHistory} from 'react-router-dom'
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';
import { useMeQuery, useLogoutMutation } from '../../generated/graphql';
import AvatarComponent from '../AvatarComponent';
import { Container } from './styles';
import logoBranca from '../../testImages/logoBrancoHorizontal.png'
import CartComponent from '../CartComponent';

const Header: React.FC = () => {
  const [, setToken] = useRecoilState(accessToken)
  const [logout, {client}] = useLogoutMutation()
  const history = useHistory()
  const {data, loading} = useMeQuery()

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
        <Flex maxWidth='330px'>
          <CartComponent />
          <AvatarComponent />
        </Flex>
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
          <Image h='50px' mb={2} src={logoBranca} mr = {(!data && !loading) ? ['unset', '-72px', '-72px', '-75px'] : ['unset', '-50px', '-170px', '-170px']} />
          <Flex>
            {endOfNavbar}
          </Flex>
      </Container>
  );
} 

export default Header;