import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/core';
import {useRecoilState} from 'recoil'
import { ShoppingCart } from '../../atoms/cart';
import { TabIndex } from '../../atoms/tabIndex';
import useGetTotal from '../../utils/getTotal';
import { useHistory } from 'react-router-dom';
import { DefaultButton } from '../DefaultButton';

// import { Container } from './styles';

const ListaProdutosCheckout: React.FC = () => {
  const [cart, setCart] = useRecoilState(ShoppingCart)
  const [tabIndex, setTabIndex] = useRecoilState(TabIndex)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const subtotal = useGetTotal()
  const history = useHistory()


  useEffect(() => {
    function handleResize () {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })

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

  const XButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 25px;
    height: 100%;
    background-color: red;
    color: white;
    border: none;
  `;

  const QuantityButtonsDiv = styled.div`
    display: flex;
    min-width: 30px;
    max-width: 40px;
    flex-basis: 35px;
    flex: 1;
    flex-direction: column;
    border: 1px solid #333;
    border-radius: 4px;
    margin-left: 5px;
  `

  const QuantityButton = styled.button`
    background: transparent;
    width: 100%;
    flex: 1;

    &:hover {
      background-color: #ccc
    }

    &:disabled {
      background-color: #aaa;
      cursor: default;
    }
  `;


  return (
      <Flex direction='column'>
        <Heading mt={4} fontSize={['2xl', '3xl', '4xl']} textAlign='center' alignSelf='center' >Informações do carrinho</Heading> 
        <Stack mt={4}>
          {cart.map(produto => (
            <Flex border='1px solid black' borderRadius={4}>
              <Flex key={produto.idProduto} backgroundColor='gray.200' pr={2} w='100%' justify='space-between'>
                <Flex p={2}>
                  <Image src='https://picsum.photos/200/300' borderRadius={4} w='20%' alt={produto.nomeProduto} mr={2}/>
                  <Text alignSelf='center' fontSize={windowWidth <= 350 ? 'sm' : windowWidth <= 420 ? 'md' : ['lg', 'lg', 'xl', '2xl']} color='gray.800' isTruncated>{produto.nomeProduto}</Text>
                </Flex>
                <Flex>
                  <Flex p={2}>
                    <Text fontSize={windowWidth <= 420 ? 'md' : ['lg', 'lg', 'xl', '2xl']} color='gray.800' alignSelf='center' >{produto.quantidade}</Text>
                    <QuantityButtonsDiv>
                        <QuantityButton onClick={() => handleIncreaseQuantity(produto.idProduto)}>+</QuantityButton>
                        {produto.quantidade === 1 ? (
                          <QuantityButton onClick={() => handleLowerQuantity(produto.idProduto)} disabled>–</QuantityButton>
                        ) : (
                          <QuantityButton onClick={() => handleLowerQuantity(produto.idProduto)}>–</QuantityButton>
                        )}
                        
                    </QuantityButtonsDiv>
                  </Flex>
                </Flex>
              </Flex>
              <Flex maxW='10%' flexShrink={1}>
                <XButton onClick={() => removeFromCart(produto.idProduto)}>X</XButton>
              </Flex>
            </Flex>
          ))}
          <Text fontSize={['xl', '2xl', '3xl']} >Subtotal: R$ {subtotal}</Text>
          <DefaultButton onClick={() => setTabIndex(prevValue => prevValue + 1)}>Prosseguir</DefaultButton>
        </Stack>
      </Flex>
  );
}

export default ListaProdutosCheckout;