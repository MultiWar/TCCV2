import { Avatar, Flex, Heading, Stack, stringOrNumber, Text } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { InputField } from '../../components/inputField';
import { useMeQuery, useChangeUserInformationMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';

import { Container, EditIcon } from './styles';

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
    const [user, setUser] = useState<User>({
        nomeUser: data?.me.nomeUser as string, 
        cpf: data?.me.cpf as string, 
        email: data?.me.email as string, 
        fone: data?.me.fone as string, 
        endereco: data?.me.endereco as string
    })
    const [isEditable, setIsEditable] = useState(false)
    if(!data && !loading) {
        
    }
    return isEditable ? (
        <Container>
            <Flex w='100%' mt={0} align='center' direction='column'>
                <Heading size='2xl'>Informações da Conta</Heading>
                <Avatar size='2xl' mt={10} />
                <Heading size='xl' mt={2}>{data?.me.nomeUser}</Heading>
                <Flex w='100%' direction='column' mt={4}>
                    <Formik
                        initialValues={{
                            email: user.email, 
                            telefone: user.fone, 
                            cep: user.endereco.split(',')[0], 
                            rua: user.endereco.split(',')[1], 
                            numero: user.endereco.split(',')[2], 
                            complemento: user.endereco.split(',')[3] || ''
                        }}
                        onSubmit={async (values, {setErrors}) => {
                            const email = values.email || user.email as string
                            const telefone = values.telefone || user.fone as string
                            const cep =  values.cep || user.endereco.split(',')[0] as string
                            const rua = values.rua || user.endereco.split(',')[1] as string
                            const numero = values.numero || user.endereco.split(',')[2] as string
                            const response = await changeUserInformation({variables: {
                                email, telefone, cep, rua, numero, complemento: values.complemento
                            }})
                            console.log(response)
                            if(response.data?.changeInformations.errors) {
                                setErrors(toErrorMap(response.data.changeInformations.errors))
                            }
                            else {
                                setUser({cpf: user.cpf, nomeUser: user.nomeUser, email: values.email,fone: values.telefone, endereco: ([values.cep, values.rua, values.numero, values.complemento].join())})
                                setIsEditable(prevState => !prevState)
                            }
                        }}
                    >
                        {({isSubmitting}) => (
                            <Form>
                                <Stack w='100%'>
                                    <Text fontSize='2xl'><strong>CPF: </strong>{user.cpf}</Text>
                                    <Flex w='100%'>
                                        <Text fontSize='2xl' mr={3}><strong>Email: </strong></Text>
                                        <InputField name='email'  placeholder='Email' />
                                    </Flex>
                                    <Flex w='100%'>
                                        <Text fontSize='2xl' mr={3}><strong>Telefone: </strong></Text>
                                        <InputField name='telefone'  placeholder='CPF' />
                                    </Flex>
                                    <Flex w='100%'>
                                        <Text fontSize='2xl' mr={3}><strong>CEP: </strong></Text>
                                        <InputField name='cep' placeholder='CEP' />
                                    </Flex>
                                    <Flex w='100%'>
                                        <Text fontSize='2xl' mr={3}><strong>Rua: </strong></Text>
                                        <InputField name='rua' placeholder='Rua' />
                                    </Flex>
                                    <Flex w='100%'>
                                        <Text fontSize='2xl' mr={3}><strong>Número: </strong></Text>
                                        <InputField name='numero' placeholder='Número' />
                                    </Flex>
                                    <Flex w='100%'>
                                        <Text fontSize='2xl' mr={3}><strong>Complemento: </strong></Text>
                                        <InputField name='complemento' placeholder='Complemento' />
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
                <Heading size='xl' mt={2} textAlign='center'>{user.nomeUser}</Heading>
                <Flex w='100%' direction='column' mt={4}>
                    <Text fontSize='2xl'><strong>CPF: </strong>{user.cpf}</Text>
                    <Text fontSize='2xl'><strong>Email: </strong>{user.email}</Text>
                    <Text fontSize='2xl'><strong>Telefone: </strong>{user.fone}</Text>
                    <Text fontSize='2xl'><strong>CEP: </strong>{user.endereco.split(',')[0]}</Text>
                    <Text fontSize='2xl'><strong>Rua: </strong>{user.endereco.split(',')[1]}</Text>
                    <Text fontSize='2xl'><strong>Número: </strong>{user.endereco.split(',')[2]}</Text>
                    <Text fontSize='2xl'><strong>Complemento: </strong>{user.endereco.split(',')[3]}</Text>
                </Flex>
                <DefaultButton onClick={() => setIsEditable(prevState => !prevState)}>Editar Informações <EditIcon /></DefaultButton>
            </Flex>
        </Container>
    );
}

export default Conta;