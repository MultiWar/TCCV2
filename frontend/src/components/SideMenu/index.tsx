import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Image, Stack, Text, useDisclosure } from '@chakra-ui/core';
import React, { useState } from 'react';
import { DefaultButton } from '../DefaultButton';
import {useHistory} from 'react-router-dom'

import { Container, SearchIcon } from './styles';
import AvatarComponentSidebar from '../AvatarComponentSidebar';
import { useLogoutMutation, useMeQuery } from '../../generated/graphql';
import logoBranca from '../../testImages/logoBrancoHorizontal.png'
import CartComponent from '../CartComponent';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { accessToken } from '../../atoms/accessToken';
import { motion } from 'framer-motion';
import SearchBar from '../SearchBar';

const SideMenu: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSearch, setIsSearch] = useState(false)
  const history = useHistory()
  const {data} = useMeQuery()
  const [, setToken] = useRecoilState(accessToken)
  const [, setCart] = useRecoilState(ShoppingCart)
  const [logout, {client}] = useLogoutMutation()

  async function clearSession() {
      setToken('')
      await logout()
      await client.resetStore()
      setCart([])
      localStorage.setItem('carrinho', JSON.stringify([]))
  }

  const buttonVariants = {
    Default: {
      width: '100%',
      paddingTop: 3,
      paddingBottom: 3,
      backgroundColor: 'transparent',
      borderRadius: 4,
      rotate: 0
    },
    SearchIconButton: {
      width: 40,
      padding: 7.5,
      height: 40,
      backgroundColor: '#258BE9',
      borderRadius: 20,
      rotate: -270
    }
  }
  
  return (
    <Container>
      <Flex direction='row' w='100%' backgroundColor='gray.800' justify='space-between' pr={3}>
        <Flex w='50px' h='100%' borderRadius={8}>
          <Button backgroundColor='gray.800' color='gray.200' _hover={{ backgroundColor: 'gray.900' }} onClick={onOpen} alignSelf='center' h='55px' w='55px'>
            <Text fontSize='3xl'> = </Text>
          </Button>
        </Flex>
        <Flex w='100%' textAlign='center' justify='center' justifySelf='center' mr={['8','-90px']}>
          {/* <Text ml='-50px' fontSize='3xl' color='gray.200' justifySelf='center' alignSelf='center' textAlign='center'>MediCare</Text> */}
          <Image h='50px' mb={2} src={logoBranca} />
        </Flex>
        <Flex color='gray.200'>
          <CartComponent />
        </Flex>
      </Flex>

      <Drawer isFullHeight={true} placement='left' size='xs' isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent backgroundColor='gray.800' color='gray.200'>
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody mt={2}>
            <Flex direction='column' justify='space-between'>
              <Stack mb={20}>
                <Button type='button' background='transparent' _hover={{backgroundColor: 'gray.900'}} onClick={() => {history.push('/'); onClose()}}>
                  <Text fontSize='xl'>Página Inicial</Text>
                </Button>
                <Flex background='transparent' borderRadius='20px' >
                  <SearchBar />
                  {/* <Search ref={searchInput} />
                  <DefaultButton
                    w='40px'
                    h='40px'
                    borderRadius='50%'
                    border='1px solid black'
                    mt={0}
                    p={3}
                    onClick={() => {history.push(`/?query=${searchInput.current?.value}`); onClose()}}
                  ><SearchIcon /></DefaultButton> */}
                </Flex>
                  
              </Stack>
            </Flex>
          </DrawerBody>
          <DrawerFooter>
            {data?.me ?
              <Flex w='100%' direction='column'>
                <CartComponent />
                <DefaultButton w='100%' type='button' fontSize='xl' onClick={() => history.push('/conta')}>Gerenciar Conta</DefaultButton>
                <DefaultButton w='100%' type='button' fontSize='xl' onClick={clearSession}>Sair da conta</DefaultButton>
              </Flex> :
              <Flex w='100%' direction='column' justify='space-between' >
                <DefaultButton type='button' w='100%' fontSize='xl' onClick={() => {history.push('/cadastro'); onClose()}}>Se cadastrar</DefaultButton>
                <DefaultButton type='button' w='100%' fontSize='xl' onClick={() => {history.push('/login'); onClose()}}>Entrar</DefaultButton>
              </Flex>
            }
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Container>
  );
}

export default SideMenu;