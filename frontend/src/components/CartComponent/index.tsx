import { Popover, PopoverTrigger, Box, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverBody, Text, Icon, Stack, Flex, Image, Select } from '@chakra-ui/core';
import React from 'react';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { FiShoppingCart } from 'react-icons/fi'
import { DefaultButton } from '../DefaultButton';

// import { Container } from './styles';

const CartComponent: React.FC = () => {

    const removeFromCart = (id: string) => {
        let carrinhoAntigo = [...cart]
        let carrinhoNovo = carrinhoAntigo.filter(produto => produto.idProduto !== id)
        setCart(carrinhoNovo)
        localStorage.setItem('carrinho', JSON.stringify(carrinhoNovo))
    }

    const [cart, setCart] = useRecoilState(ShoppingCart)
    return (
        <Popover placement='bottom-end' closeOnBlur={false}>
            <PopoverTrigger>
                <Box alignItems='center' justifyContent='space-between' w='100%'>
                    <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' fontSize='lg' fontWeight='regular'>
                        <Box as={FiShoppingCart} mr={2}/>
                        <Text>Carrinho</Text>
                    </Button>
                </Box>
            </PopoverTrigger>
            <PopoverContent zIndex={4} bg='gray.200' border='0' width='300px'>
                <PopoverHeader fontWeight='bold' color='gray.800'>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverBody color='gray.800'>
                    <Stack>
                        {cart.map(produto => (
                            <Flex backgroundColor='gray.300' border='1px solid black' pl={2} w='100%' justify='space-between' borderRadius={4}>
                                <Flex>
                                    <Image src='https://bit.ly/sage-adebayo' w='20%' alt={produto.nomeProduto} mr={2}/>
                                    <Text alignSelf='center' fontSize='xl' color='gray.800'>{produto.nomeProduto}</Text>

                                </Flex>
                                <Flex>
                                    <Flex>
                                        <Text fontSize='xl' color='gray.800' alignSelf='center' >{produto.quantidade}</Text>
                                        <Flex direction='column'>
                                            <Button size='xs' background='transparent' border='1px solid black'>+</Button>
                                            <Button size='xs' background='transparent' border='1px solid black'>-</Button>
                                        </Flex>
                                    </Flex>
                                    <Button ml={4} variantColor='red' onClick={() => removeFromCart(produto.idProduto)}>X</Button>
                                </Flex>
                            </Flex>
                        ))}
                    </Stack>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}

export default CartComponent;