import { Flex } from '@chakra-ui/core';
import React from 'react';
import { useMeQuery, useMeusPedidosQuery } from '../../generated/graphql';

import { Container, Card, Status, Produtos, Data, Preco } from './styles';

const MeusPedidos: React.FC = () => {
    const me = useMeQuery()
    const {data} = useMeusPedidosQuery({
        variables: {
            cpf: me.data?.me.cpf as string
        }
    })

    if(!data) {
        return <Card></Card>
    }

    if(data?.meusPedidos.length === 0) {
        return (
            <Card>
                <h1>você ainda não tem nenhum pedido</h1>
            </Card>
        )
    }

    return (
        <Container>
            {data.meusPedidos.map(pedido => (
                <Card key={pedido.idPedido}>
                    <Flex direction='column'>
                        <Flex justify='center'><Status>{pedido.status}</Status></Flex>
                        <Produtos>
                            <h3>Produtos: </h3>
                            {pedido.detalhesPedido.map(produto => (
                                <p key={produto.idProduto}>{produto.nomeProduto} ({produto.qtde} unidades)</p>
                            ))}
                        </Produtos>
                    </Flex>
                    <Flex direction='column'>
                        <Flex mt={8}><Data>{pedido.dataPedido} - {pedido.dataEntrega}</Data></Flex>
                        <Flex justifySelf='flex-end' justify='center'><Preco>R${pedido.valorFinal}</Preco></Flex>
                    </Flex>
                </Card>
            ))}
        </Container>
    );
}

export default MeusPedidos;