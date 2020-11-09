import React from 'react';
import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/core';

import { Card } from './styles';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { DefaultButton } from '../../components/DefaultButton';

const Checkout: React.FC = () => {
  const [cart, setCart] = useRecoilState(ShoppingCart)

  const removeFromCart = (id: number) => {
    let carrinhoAntigo = [...cart]
    let carrinhoNovo = carrinhoAntigo.filter(produto => produto.idProduto !== id)
    setCart(carrinhoNovo)
    localStorage.setItem('carrinho', JSON.stringify(carrinhoNovo))
  }

  const handleIncreaseQuantity = (id: number) => {
      const newCart = cart.map(produto => {
          if(produto.idProduto === id) {
              return {...produto, quantidade: produto.quantidade + 1}
          }
          return produto
      })
      setCart(newCart)
      localStorage.setItem('carrinho', JSON.stringify(newCart))
  }

  const handleLowerQuantity = (id: number) => {
      const newCart = cart.map(produto => {
          if(produto.idProduto === id) {
              return {...produto, quantidade: produto.quantidade - 1}
          }
          return produto
      })
      setCart(newCart)
      localStorage.setItem('carrinho', JSON.stringify(newCart))
  }

  const getTotal = (): Number => {
    let somaPrecos = 0;
    cart.map(produto => {
        somaPrecos += (produto.quantidade * Number(produto.preco))
    })
    return somaPrecos
  }

  return (
    <Flex justify='center'>
      <Card>
        <Heading alignSelf='center' >Informações do carrinho</Heading>
        <Stack mt={4}>
          {cart.map(produto => (
            <Flex border='1px solid black' borderRadius={4}>
              <Flex key={produto.idProduto} backgroundColor='gray.200' pr={2} w='100%' justify='space-between'>
                <Flex p={2}>
                  <Image src='https://picsum.photos/200/300' borderRadius={4} w='20%' alt={produto.nomeProduto} mr={2}/>
                  <Text alignSelf='center' fontSize='3xl' color='gray.800' isTruncated>{produto.nomeProduto}</Text>
                </Flex>
                <Flex>
                  <Flex p={2}>
                    <Text fontSize='3xl' color='gray.800' alignSelf='center' >{produto.quantidade}</Text>
                    <Flex align='center' pb={0} direction='column' ml={2} border='1px solid black' borderRadius={4}>
                        <Button size='lg' p={0} m={0} _hover={{backgroundColor: 'gray.300'}} type='button' onClick={() => handleIncreaseQuantity(produto.idProduto)} background='transparent' fontSize='2xl'>+</Button>
                        <Button size='lg' p={0} m={0} _hover={{backgroundColor: 'gray.300'}} type='button' onClick={() => handleLowerQuantity(produto.idProduto)} background='transparent' isDisabled={produto.quantidade === 1 ? true : false} fontSize='2xl'>–</Button>
                    </Flex>
                  </Flex>
                </Flex>  
              </Flex>
              <Flex w='10%'>
                <Button w='100%' borderRadius={0} h='100%' alignSelf='center' variantColor='red' onClick={() => removeFromCart(produto.idProduto)}>X</Button>
              </Flex>
            </Flex>
          ))}
          <Text fontSize='3xl' >Subtotal: R$ {getTotal()}</Text>
          <DefaultButton >Finalizar compra</DefaultButton>
        </Stack>
      </Card>
    </Flex>
  );
}

export default Checkout;