import { Box, Flex, Heading, Image } from '@chakra-ui/core';
import React, { useState } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { useProdutosQuery } from '../../generated/graphql';
import {Link} from 'react-router-dom'
import { Card } from './styles';

const Loja: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const {data, loading, error, fetchMore, variables} = useProdutosQuery({
        variables: {
            pagina: 1
        }
    })
    // useEffect(() => {
    // }, [pagina])
    console.log(isLoading)
    if(loading) {
        return (
            <Flex></Flex>
        )
    }
    return (
        <>
        <Flex flexDirection='row' wrap='wrap' mx={10} mt={5} justifyContent={['center', 'center', 'center', 'space-between']}>
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
        <DefaultButton type='button' onClick={() => {
            fetchMore({
                variables: {
                    pagina: variables?.pagina ? variables.pagina + 1 : 1
                }
            })
        }}>Teste Paginação</DefaultButton>
        </>
    );
}

export default Loja;