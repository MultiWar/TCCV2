import { Avatar, Flex, Heading, Skeleton, Stack, Text } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DefaultButton } from '../../components/DefaultButton';
import { InputField } from '../../components/inputField';
import { useMeQuery, useChangeUserInformationMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';

import { Container, EditIcon, ListIcon } from './styles';

interface User {
    nomeUser: string,
    cpf: string,
    email: string,
    fone: string,
    endereco: string
}

const Conta: React.FC = () => {
    const {data, loading} = useMeQuery()
    const [changeUserInformation] = useChangeUserInformationMutation()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | undefined>(undefined)

    const history = useHistory()

    const getData = () => {
        setUser({
            nomeUser: data?.me.nomeUser as string, 
            cpf: data?.me.cpf as string, 
            email: data?.me.email as string, 
            fone: data?.me.fone as string, 
            endereco: data?.me.endereco as string
        })
        setTimeout(() => setIsLoading(false), 1500)
    }
    
    useEffect(() => getData(), [data])

    const [isEditable, setIsEditable] = useState(false)

    if(loading || isLoading || user?.endereco === undefined) {
        return (
            <Flex direction='column' align='center' w='100%' mt='80px'>
                <Flex direction='column' align='center' w={['420px', '420px', '480px']} > 
                    <Skeleton w='100%' h='50px' />
                    <Skeleton w='130px' h='130px' mt={8} borderRadius='50%' />
                    <Skeleton w='80%' h='40px' mt={6} />
                </Flex>
                <Flex direction='column' w={['420px', '420px', '480px']} mt={4} >
                    <Skeleton w='45%' h='28px' mt='10px' />
                    <Skeleton w='70%' h='28px' mt='10px' />
                    <Skeleton w='60%' h='28px' mt='10px' />
                    <Skeleton w='40%' h='28px' mt='10px' />
                    <Skeleton w='45%' h='28px' mt='10px' />
                    <Skeleton w='40%' h='28px' mt='10px' />
                    <Skeleton w='80%' h='28px' mt='10px' />
                    <Skeleton w='100%' h='40px' mt={5} />
                    <Skeleton w='100%' h='40px' mt={2} />
                </Flex>
            </Flex>
        )
    }

    if(!data && !loading && !isLoading) {
        return (<Text>Something's wrong here</Text>)
    }
    return isEditable ? (
        <Container>
            <Flex w='100%' mt={0} align='center' direction='column'>
                <Heading size='2xl' textAlign='center' >Informações da Conta</Heading>
                <Avatar size='2xl' mt={10} />
                <Heading size='xl' mt={2} textAlign='center'>{data?.me.nomeUser}</Heading>
                <Flex w='100%' direction='column' mt={4}>
                    <Formik
                        initialValues={{
                            email: user?.email, 
                            telefone: user?.fone, 
                            cep: user?.endereco.split(',')[0], 
                            rua: user?.endereco.split(',')[1], 
                            numero: user?.endereco.split(',')[2], 
                            complemento: user?.endereco.split(',')[3] || ''
                        }}
                        onSubmit={async (values, {setErrors}) => {
                            const email = values.email || user?.email as string
                            const telefone = values.telefone || user?.fone as string
                            const cep =  values.cep || user?.endereco.split(',')[0] as string
                            const rua = values.rua || user?.endereco.split(',')[1] as string
                            const numero = values.numero || user?.endereco.split(',')[2] as string
                            const response = await changeUserInformation({variables: {
                                email, telefone, cep, rua, numero, complemento: values.complemento
                            }})
                            console.log(response)
                            if(response.data?.changeInformations.errors) {
                                setErrors(toErrorMap(response.data.changeInformations.errors))
                            }
                            else {
                                if(user) {
                                    setUser({cpf: user.cpf, nomeUser: user.nomeUser, email: values.email as string, fone: values.telefone as string, endereco: ([values.cep, values.rua, values.numero, values.complemento].join())})
                                    setIsEditable(prevState => !prevState)
                                }
                                else {
                                    alert('vish')
                                }
                            }
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <Stack w='100%' spacing={[3, '']}>
                                    <Text fontSize='2xl'><strong>CPF: </strong>{user?.cpf}</Text>
                                    <Flex w='100%' direction={['column', 'row']}>
                                        <Text fontSize='2xl' mr={3}><strong>Email: </strong></Text>
                                        <InputField name='email'  placeholder='Email' borderColor='blue.400' />
                                    </Flex>
                                    <Flex w='100%' direction={['column', 'row']}>
                                        <Text fontSize='2xl' mr={3}><strong>Telefone: </strong></Text>
                                        <InputField name='telefone'  placeholder='Telefone' borderColor='blue.400' />
                                    </Flex>
                                    <Flex w='100%' direction={['column', 'row']}>
                                        <Text fontSize='2xl' mr={3}><strong>CEP: </strong></Text>
                                        <InputField name='cep' placeholder='CEP' borderColor='blue.400' />
                                    </Flex>
                                    <Flex w='100%' direction={['column', 'row']}>
                                        <Text fontSize='2xl' mr={3}><strong>Rua: </strong></Text>
                                        <InputField name='rua' placeholder='Rua' borderColor='blue.400' />
                                    </Flex>
                                    <Flex w='100%' direction={['column', 'row']}>
                                        <Text fontSize='2xl' mr={3}><strong>Número: </strong></Text>
                                        <InputField name='numero' placeholder='Número' borderColor='blue.400' />
                                    </Flex>
                                    <Flex w='100%' direction={['column', 'row']}>
                                        <Text fontSize='2xl' mr={3}><strong>Complemento: </strong></Text>
                                        <InputField name='complemento' placeholder='Complemento' borderColor='blue.400' />
                                    </Flex>
                                </Stack>
                                <DefaultButton isLoading={isSubmitting} loadingText='Enviando informações...' type='submit'>Salvar alterações</DefaultButton>
                            </Form>
                        )}
                    </Formik>
                </Flex>
            </Flex>
        </Container>
    ) :  (
        <Container>
            <Flex w='100%' mt={0} align='center' direction='column'>
                <Heading size='2xl' textAlign='center'>Informações da Conta</Heading>
                <Avatar size='2xl' mt={10} />
                <Heading size='xl' mt={2} textAlign='center'>{user?.nomeUser}</Heading>
                <Flex w='100%' direction='column' mt={4}>
                    <Text fontSize='2xl'><strong>CPF: </strong>{user?.cpf}</Text>
                    <Text fontSize='2xl'><strong>Email: </strong>{user?.email}</Text>
                    <Text fontSize='2xl'><strong>Telefone: </strong>{user?.fone}</Text>
                    <Text fontSize='2xl'><strong>CEP: </strong>{user?.endereco.split(',')[0]}</Text>
                    <Text fontSize='2xl'><strong>Rua: </strong>{user?.endereco.split(',')[1]}</Text>
                    <Text fontSize='2xl'><strong>Número: </strong>{user?.endereco.split(',')[2]}</Text>
                    {user?.endereco.split(',')[3] ? <Text fontSize='2xl'><strong>Complemento: </strong>{user?.endereco.split(',')[3]}</Text> : null}
                </Flex>
                <DefaultButton onClick={() => setIsEditable(prevState => !prevState)}>Editar Informações <EditIcon /></DefaultButton>
                <DefaultButton mt={2} onClick={() => history.push('/conta/pedidos')}>Meus Pedidos <ListIcon /></DefaultButton>
            </Flex>
        </Container>
    );
}

export default Conta;