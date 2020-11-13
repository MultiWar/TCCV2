import React from 'react';
import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/core';
import { useMeQuery } from '../../generated/graphql';
import {useRecoilState} from 'recoil'
import { ShoppingCart } from '../../atoms/cart';
import { TabIndex } from '../../atoms/tabIndex';
import { DefaultButton } from '../DefaultButton';

// import { Container } from './styles';

const VerificarInformacoes: React.FC = () => {
    const {data} = useMeQuery()
    const [_, setTabIndex] = useRecoilState(TabIndex)
    const [cart] = useRecoilState(ShoppingCart)

    const handlePrazoEntrega = () => {

    }

    return (
        <Flex direction='column'>
            <Heading alignSelf='center' mt={4}>Verificar Informações</Heading>
            <Stack>{cart.map(produto => (
                <Flex key={produto.idProduto} direction='column'>
                    <Text>{produto.nomeProduto}</Text>
                </Flex>
            ))}</Stack>
            <Flex justify='space-around' mt={4}>
                <Button w='48%' variantColor='red' onClick={() => setTabIndex(prevValue => prevValue - 1)}>Voltar</Button>
                <DefaultButton mt={0} w='48%' onClick={() => setTabIndex(prevValue => prevValue + 1)}>Prosseguir</DefaultButton>
            </Flex>
        </Flex>
    );
}

export default VerificarInformacoes;