import React from 'react';
import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/core';
import {useHistory} from 'react-router-dom'
import { atom, useRecoilState } from 'recoil';
import { useMeQuery } from '../../generated/graphql';
import AvatarComponent from '../AvatarComponent';
import { Container } from './styles';
import logoBranca from '../../testImages/logoBrancoHorizontal.png'
import CartComponent from '../CartComponent';
import SearchBar from '../SearchBar';

export const isSearchBarVisible = atom({
  key: 'isVisible',
  default: false
})

const Header: React.FC = () => {
  const [isVisible] = useRecoilState(isSearchBarVisible)
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
        <CartComponent />
        <AvatarComponent />
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
          <Flex w='100%' justify='space-between'>
            <Box w='40px' />
            {isVisible ? (null) : <Image h='50px' mr = {(!data && !loading) ? ['unset', '-72px', '-72px', '-75px'] : ['unset', '-50px', '-170px', '-170px']} mb={2} src={logoBranca}  justifySelf='center' />}
            <SearchBar />
          </Flex>
          <Flex>
            {endOfNavbar}
          </Flex>
      </Container>
  );
} 

export default Header;