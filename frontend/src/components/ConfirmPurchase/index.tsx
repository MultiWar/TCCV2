import { Flex, Text } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { meioDeEnvio } from '../../atoms/meioDeEnvio';
import { subtotal as subtt } from '../../atoms/subtt';
import { TabIndex } from '../../atoms/tabIndex';
import { useFazerPedidoMutation, useMeQuery } from '../../generated/graphql';
import { DefaultButton } from '../DefaultButton';
import { InputField } from '../inputField';


interface ProdutoAdicionado {
    idProduto: number,
    nomeProduto: string,
    quantidade: number
}
 
const ConfirmPurchase: React.FC = () => {
    const history = useHistory()
    const {data} = useMeQuery()
    const [fazerPedido] = useFazerPedidoMutation()
    const [meioDeEnvioEscolhido] = useRecoilState(meioDeEnvio)
    const [cart, setCart] = useRecoilState(ShoppingCart)
    const [,setTabIndex] = useRecoilState(TabIndex)
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
                    setTabIndex(0)
                    history.push('/')
                }
                else {
                    alert('foda-se')
                }
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Flex mt={4}>
                        <Text><strong>Número do cartão: </strong></Text>
                        <InputField name='numeroCartao' placeholder='NÚMERO DO CARTÃO' ml={2} />
                    </Flex>
                    <Flex mt={2}>
                        <Text><strong>Nome completo: </strong></Text>
                        <InputField name='nomeCompleto' placeholder='NOME COMPLETO' ml={2} />
                    </Flex>
                    <Flex mt={2}>
                        <Text><strong>Data de validade: </strong></Text>
                        <InputField name='dataDeValidade' placeholder='DATA DE VALIDADE' ml={2} />
                    </Flex>
                    <Flex mt={2}>
                        <Text><strong>Código de verificação: </strong></Text>
                        <InputField name='codigoVerificacao' placeholder='CÓDIGO DE VERIFICAÇÃO' ml={2} />
                    </Flex>
                    <DefaultButton type='submit' isLoading={isSubmitting}>Enviar informações</DefaultButton>
                </Form>
            )}
        </Formik>
    );
}

export default ConfirmPurchase;