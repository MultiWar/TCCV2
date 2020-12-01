import { Flex, Text, useToast } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { responsePathAsArray } from 'graphql';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { meioDeEnvio } from '../../atoms/meioDeEnvio';
import { subtotal as subtt } from '../../atoms/subtt';
import { useFazerPedidoMutation, useMeQuery } from '../../generated/graphql';
import CartComponent from '../CartComponent';
import { DefaultButton } from '../DefaultButton';
import { InputField } from '../inputField';

import { Container } from './styles';

interface ProdutoAdicionado {
    idProduto: number,
    nomeProduto: string,
    quantidade: number
}
 
const ConfirmPurchase: React.FC = () => {
    const toast = useToast()
    const history = useHistory()
    const {data} = useMeQuery()
    const [fazerPedido] = useFazerPedidoMutation()
    const [meioDeEnvioEscolhido] = useRecoilState(meioDeEnvio)
    const [cart, setCart] = useRecoilState(ShoppingCart)
    const [subtotal] = useRecoilState(subtt)

    let produtos: ProdutoAdicionado[] = []
    cart.map(produto => {
        const Produto = {
            idProduto: produto.idProduto,
            nomeProduto: produto.nomeProduto,
            quantidade: produto.quantidade
        }
        produtos.push(Produto)
    })
    console.log(meioDeEnvioEscolhido)

    return (
        <Formik
            initialValues={{numeroCartao: '', nomeCompleto: '', dataDeValidade: '', codigoVerificacao: ''}}
            onSubmit={async values => {
                const response = await fazerPedido({
                    variables: {
                        cpf: data?.me.cpf as string,
                        prazoDeEntrega: Number(meioDeEnvioEscolhido?.prazo.split(' ')[0]),
                        produtos: produtos,
                        valorFinal: subtotal + Number(meioDeEnvioEscolhido?.preco)
                    }
                })
                if(!response.errors) {
                    setCart([])
                }
                else {
                    alert('foda-se')
                }
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Flex mt={4}>
                        <Text>Número do cartão: </Text>
                        <InputField name='numeroCartao' placeholder='NÚMERO DO CARTÃO' ml={2} />
                    </Flex>
                    <Flex mt={2}>
                        <Text>Nome completo: </Text>
                        <InputField name='nomeCompleto' placeholder='NOME COMPLETO' ml={2} />
                    </Flex>
                    <Flex mt={2}>
                        <Text>Data de validade: </Text>
                        <InputField name='dataDeValidade' placeholder='DATA DE VALIDADE' ml={2} />
                    </Flex>
                    <Flex mt={2}>
                        <Text>Código de verificação: </Text>
                        <InputField name='codigoVerificacao' placeholder='CÓDIGO DE VERIFICAÇÃO' ml={2} />
                    </Flex>
                    <DefaultButton type='submit' isLoading={isSubmitting}>Enviar informações</DefaultButton>
                </Form>
            )}
        </Formik>
    );
}

export default ConfirmPurchase;