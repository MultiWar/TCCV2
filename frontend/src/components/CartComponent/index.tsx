import { Popover, PopoverTrigger, Box, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverBody, Text, Icon, Stack, Flex, Image } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { FiShoppingCart } from 'react-icons/fi'
import { DefaultButton } from '../DefaultButton';
import { Link, useHistory } from 'react-router-dom';
import { LinkBloco } from './styles';

// import { Container } from './styles';

const CartComponent: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [cart, setCart] = useRecoilState(ShoppingCart)

    const history = useHistory()

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

    return (
        <Popover placement='bottom-end' closeOnBlur={false}>
            <PopoverTrigger>
                <Box alignItems='center' justifyContent='space-between' w='100%' display={['none', 'unset']}>
                    <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' fontSize='lg' fontWeight='regular'>
                        <Box as={FiShoppingCart} mr={2}/>
                        <Text>Carrinho</Text>
                    </Button>
                </Box>
            </PopoverTrigger>
            <PopoverContent zIndex={4} bg='gray.200' border='1px solid black' width='350px'>
                <PopoverHeader fontWeight='bold' color='gray.800'>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody color='gray.800'>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : 
                    <Stack spacing={4}>
                        {cart.map((produto, index) => (
                            <Flex key={produto.idProduto} backgroundColor='gray.300' border='1px solid black' pr={2} w='100%' justify='space-between' borderRadius={4}>
                                <Flex p={1}>
                                    <Image src='https://picsum.photos/200/300' borderRadius={4} w='20%' alt={produto.nomeProduto} mr={2}/>
                                    <Text alignSelf='center' fontSize='xl' color='gray.800' isTruncated>{produto.nomeProduto}</Text>
                                </Flex>
                                <Flex>
                                    <Flex p={1}>
                                        <Text fontSize='xl' color='gray.800' alignSelf='center' >{produto.quantidade}</Text>
                                        <Flex direction='column' ml={2}>
                                            <Button size='xs' type='button' onClick={() => handleIncreaseQuantity(produto.idProduto)} background='transparent' p={1} border='1px solid black' fontSize='lg'>+</Button>
                                            <Button size='xs' type='button' onClick={() => handleLowerQuantity(produto.idProduto)} background='transparent' p={1} isDisabled={produto.quantidade === 1 ? true : false} border='1px solid black' fontSize='lg'>-</Button>
                                        </Flex>
                                    </Flex>
                                    <Button alignSelf='center' ml={2} variantColor='red' onClick={() => removeFromCart(produto.idProduto)}>X</Button>
                                </Flex>
                            </Flex>
                        ))}
                    <DefaultButton mt={2} onClick={() => history.push('/confirmarCompra')}>Finalizar Compra</DefaultButton>
                </Stack>}
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default CartComponent;