import { Form, Formik } from 'formik';
import React, {useContext, useState} from 'react';
import { useLoginMutation, useForgotPasswordMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useHistory } from "react-router-dom";
import { Container, EyeIcon, SlashedEyeIcon, Title } from './styles';
import { Box, Flex, Heading, Modal, ModalContent, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/core';
import { InputField } from '../../components/inputField';
import { DefaultButton } from '../../components/DefaultButton';
import { ThemeContext } from 'styled-components';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';

const Login: React.FC = () => {
    const [login] = useLoginMutation()
    const [forgotPassword] = useForgotPasswordMutation()
    const themeContext = useContext(ThemeContext)
    const history = useHistory()
    const [, setToken] = useRecoilState(accessToken)
    const [isPassword, setIsPassword] = useState<Boolean>(true)

    const {isOpen, onOpen, onClose} = useDisclosure()
    const toast = useToast()

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                <ModalOverlay />
                <ModalContent>
                    <Flex p='30px' borderRadius={8}>
                        <Formik initialValues={{email: ''}} onSubmit={
                            async values => {
                                const response = await forgotPassword({variables: values})
                                if(response.data?.forgotPassword !== true) {
                                    return toast({
                                        position: 'top',
                                        title: 'Falha',
                                        description: 'Email não cadastrado. Por favor, crie uma conta clicando em "Não estou cadastrado".',
                                        status: 'error',
                                        duration: 10000,
                                        isClosable: true
                                    })
                                }
                                return toast({
                                    position: 'top',
                                    title: 'Sucesso!',
                                    description: 'Email enviado com sucesso. Clique no link enviado para recuperar sua senha.',
                                    status: 'success',
                                    duration: 10000,
                                    isClosable: true
                                })

                            }
                        }>
                            {({isSubmitting}) => (
                                <Form>
                                    <Heading as='legend' fontSize='2xl'>Insira seu email para receber o link para trocar sua senha</Heading>
                                    <InputField name='email' placeholder='Email   ex: carlos.alberto@gmail.com' mt={4} />
                                    <DefaultButton type='submit' isLoading={isSubmitting} mt={4}>Enviar email de recuperação de senha</DefaultButton>
                                </Form>
                            )}
                        </Formik>
                    </Flex>
                </ModalContent>
            </Modal>
            <Container>
                <Box textAlign='center'><Title>ENTRAR</Title></Box>
                <Formik
                    initialValues={{cpf: '', senha: ''}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await login({variables: values})
                        if(response.data?.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors))
                        }
                        else {
                            setToken(response.data?.login.accessToken as string)
                            history.push('/')
                        }
                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <Box mt={4}>
                                <InputField name='cpf' placeholder='CPF    ex: 12345678910' borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' />
                            </Box>
                            <Box mt={4} display='flex'>
                                <Box w='100%'>
                                    <InputField name='senha' placeholder='Senha    ex: senha123' variant='flushed' type={isPassword ? 'password' : 'text'} borderColor='blue.200' focusBorderColor='blue.400' size='lg' />
                                </Box>
                                {/* <Box w='10%' display='flex' justifyContent='center'>
                                    <Button type='button' onClick={() => setIsPassword(!isPassword)} >{ isPassword ? (<SlashedEyeIcon />) : (<EyeIcon />) }</Button>
                                </Box> */}
                            </Box>     
                            <Box mt={2} w='100%' display='flex' justifyContent='flex-end' color={themeContext.colors.primary}>
                            </Box>
                            <Box mt={2} display='flex' justifyContent='space-between'>
                                <DefaultButton w='48%' type='button' onClick={() => setIsPassword(!isPassword)}>{ isPassword ? (<><EyeIcon />Mostrar senha</>) : (<><SlashedEyeIcon />Esconder senha</>) }</DefaultButton>
                                <DefaultButton w='48%' type='submit' isLoading={isSubmitting} loadingText='Enviando informações' >Entrar</DefaultButton>
                            </Box>
                            <Box mt={1} w='100%' display='flex' justifyContent='space-between'>
                                <DefaultButton w='48%' type='button' onClick={() => history.push('/cadastro')}>Não estou cadastrado</DefaultButton>
                                <DefaultButton w='48%' type='button' onClick={onOpen}>Esqueci minha senha</DefaultButton>
                            </Box>
                            <Box mt={1} w='100%'>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Container>
        </>
    );
}

export default Login;