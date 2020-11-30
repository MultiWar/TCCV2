import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox, Flex, Heading, Radio, RadioGroup, Skeleton, Stack, Text } from '@chakra-ui/core';
import { useMeQuery } from '../../generated/graphql';
import {useRecoilState} from 'recoil'
import { ShoppingCart } from '../../atoms/cart';
import { TabIndex } from '../../atoms/tabIndex';
import { DefaultButton } from '../DefaultButton';

import { Field, Form, Formik } from 'formik';
import { InputField } from '../inputField';
import { meioDeEnvio } from '../../atoms/meioDeEnvio';

interface Address {
    cep: string | undefined,
    rua: string | undefined,
    numero: string | undefined,
    complemento: string | undefined
}

interface PrecoPrazo {
    preco: number,
    prazo: string
}

const VerificarInformacoes: React.FC = () => {
    const {data} = useMeQuery()
    const [isEditable, setIsEditable] = useState(false)
    const [_, setTabIndex] = useRecoilState(TabIndex)
    const [address, setAddress] = useState<Address | undefined>()
    const [informacoesSedex, setInformacoesSedex] = useState<PrecoPrazo>()
    const [informacoesPAC, setInformacoesPAC] = useState<PrecoPrazo>()
    const [servico, setServico] = useState('sedex')
    const [meioDeEnvioEscolhido, setMeioDeEnvioEscolhido] = useRecoilState(meioDeEnvio)

    // const cepRef = useRef<HTMLInputElement>(null)
    // const ruaRef = useRef<HTMLInputElement>(null)
    // const numeroRef = useRef<HTMLInputElement>(null)
    // const complementoRef = useRef<HTMLInputElement>(null)

    useEffect(() => { setData() }, [data])

    useEffect(() => {
        const cep = address?.cep ? address.cep : data?.me.endereco.split(',')[0] as string
        setInformacoesSedex({
            preco: ((Number(cep) % 7) + 1) * 5,
            prazo: ((Number(cep) % 4) + 1) * 7 + ' dias'
        })
        setInformacoesPAC({
            preco:  ((Number(cep) % 6) + 1) * 5,
            prazo:  ((Number(cep) % 6) + 2) * 8 + ' dias'
        })
    }, [address])

    const setData = () => {
        setAddress({
            cep: data?.me.endereco.split(',')[0],
            rua: data?.me.endereco.split(',')[1],
            numero: data?.me.endereco.split(',')[2],
            complemento: data?.me.endereco.split(',')[3] as string,
        })
        // const coisasSedex = await fetch(`http://ws.correios.com.br/calculador//calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo?nCdEmpresa=string&sDsSenha=string&nCdServico=04014&sCepOrigem=04458000&sCepDestino=${address?.cep}&nVlPeso=0.250&nCdFormato=1&nVlComprimento=100&nVlAltura=50&nVlLargura=40&nVlDiametro=string&sCdMaoPropria=N&nVlValorDeclarado=0&sCdAvisoRecebimento=N`, {mode: "no-cors"})
        // console.log(coisasSedex)
    }

    const handleConfirmShippingAddress = (servico: string) => {
        servico === 'sedex' ? 
            setMeioDeEnvioEscolhido({servico: 'sedex', preco: informacoesSedex?.preco as number, prazo: informacoesSedex?.prazo as string}) : 
            setMeioDeEnvioEscolhido({servico: 'pac', preco: informacoesPAC?.preco as number, prazo: informacoesPAC?.prazo as string})
        setTabIndex(prevValue => prevValue + 1)
    }


    if(!data || !address) {
        return (
            <Skeleton />
        )
    }

    return (
        <Flex direction='column'>
            <Heading textAlign='center' alignSelf='center' mt={4}>Verificar Informações de envio</Heading>
            {isEditable ? (
                <Formik
                    initialValues={{
                        cep: address?.cep,
                        rua: address?.rua,
                        numero: address?.numero,
                        complemento: address?.complemento
                    }}
                    onSubmit={async (values, {setErrors}) => {
                        const cep = values.cep || address?.cep
                        const rua = values.rua || address?.rua
                        const numero = values.numero || address?.numero
                        const complemento = values.complemento || address?.complemento
                        setAddress({
                            cep, rua, numero, complemento
                        })
                        setIsEditable(false)
                    }}
                >
                    {() => (
                        <Form>
                            <Stack>
                                <Flex wrap='wrap'>
                                    <Text as='label' fontSize='2xl' mr={2}><strong>CEP:</strong></Text>
                                    <InputField name='cep' placeholder='CEP' outline='blue.400' />
                                </Flex>
                                <Flex wrap='wrap'>
                                    <Text as='label' fontSize='2xl' mr={2}><strong>Rua:</strong></Text>
                                    <InputField name='rua' placeholder='rua' outline='blue.400' />
                                </Flex>
                                <Flex wrap='wrap'>
                                    <Text as='label' fontSize='2xl' mr={2}><strong>Número:</strong></Text>
                                    <InputField name='numero' placeholder='numero' outline='blue.400' />
                                </Flex>
                                <Flex wrap='wrap'>
                                    <Text as='label' fontSize='2xl' mr={2}><strong>Complemento:</strong></Text>
                                    <InputField name='complemento' placeholder='complemento' outline='blue.400' />
                                </Flex>
                                <DefaultButton type='submit'>Alterar endereço</DefaultButton>
                            </Stack>
                        </Form>
                    )}
                </Formik>
            ) : (
                <Flex direction='column'>
                    <Stack spacing={0}>
                        <Text fontSize='2xl'><strong>CEP: </strong>{address.cep}</Text>
                        <Text fontSize='2xl'><strong>Rua: </strong>{address.rua}</Text>
                        <Text fontSize='2xl'><strong>Número: </strong>{address.numero}</Text>
                        <Text fontSize='2xl'><strong>Complemento: </strong>{address.complemento}</Text>
                    </Stack>
                    <Text textAlign='center' fontSize='3xl' mt={6}><strong>Opções de envio</strong></Text>
                    <Formik
                        initialValues={{servico: 'sedex'}}
                        onSubmit={(values) => {
                            handleConfirmShippingAddress(values.servico)
                            console.log(meioDeEnvioEscolhido)
                        }}
                    >
                        {() => (
                            <Form>
                                <Stack direction='row'>
                                    <Flex direction='column'>
                                        <Flex>
                                            <Field type='radio' name='servico' value='sedex' />
                                            <Text fontSize='2xl' ml={2}><strong>SEDEX: </strong></Text>
                                        </Flex>
                                        <Text fontSize='xl'>preço: <strong>R${informacoesSedex?.preco},00</strong></Text>
                                        <Text fontSize='xl'>Entrega em até <strong>{informacoesSedex?.prazo}</strong></Text>
                                    </Flex>
                                    <Flex direction='column'>
                                        <Flex>
                                            <Field type='radio' name='servico' value='pac' />
                                            <Text ml={2} fontSize='2xl'><strong>PAC: </strong></Text>
                                        </Flex>
                                        <Text fontSize='xl'>preço: <strong>R${informacoesPAC?.preco},00</strong></Text>
                                        <Text fontSize='xl'>Entrega em até <strong>{informacoesPAC?.prazo}</strong></Text>
                                    </Flex>
                                </Stack>
                                <DefaultButton onClick={() => setIsEditable(true)}>Editar endereço de entrega</DefaultButton>
                                <Flex justify='space-around' mt={4}>
                                    <Button w='48%' variantColor='red' onClick={() => setTabIndex(prevValue => prevValue - 1)}>Voltar</Button>
                                    <DefaultButton mt={0} w='48%' type='submit'>Prosseguir</DefaultButton>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            )}
        </Flex>
    );
}

export default VerificarInformacoes;