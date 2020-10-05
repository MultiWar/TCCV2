import { Box, Flex, Heading, Image } from '@chakra-ui/core';
import React, { useState } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { useProdutosQuery } from '../../generated/graphql';
import {Link} from 'react-router-dom'
import { Card } from './styles';

const Loja: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [pagina, setPagina] = useState(1)
    const {data, loading} = useProdutosQuery({variables: {pagina: pagina}})
    // useEffect(() => {
    // }, [pagina])
    console.log(isLoading)
    if(loading) {
        return (
            <Flex></Flex>
        )
    }
    return (
        <Flex flexDirection='row' wrap='wrap' mx={10} mt={5} justify='space-between'>
            {data?.produtos.map(produto => {
                return (
                    <Card key={produto.idProduto}>
                        <Box w='100%' mb={2} textAlign='center'>
                            <Heading>{produto.nomeProduto}</Heading>
                        </Box>
                        <Flex h='300px' w='200px'>
                            <Image objectFit='cover' src='https://bit.ly/sage-adebayo' htmlHeight='100%' htmlWidth='100%' />
                        </Flex>
                        <Flex justify='space-between'>
                            <DefaultButton w='48%'>
                                <Link to={`/produtos/${produto.nomeProduto}`}>+ informações</Link>
                            </DefaultButton>
                            <DefaultButton w='48%'>+ carrinho</DefaultButton>
                        </Flex>
                    </Card>
                )
            })}
        </Flex>
    );
}

export default Loja;