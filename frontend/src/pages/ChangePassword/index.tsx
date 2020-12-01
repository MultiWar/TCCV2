import React, { useState } from 'react';
import { Box, Flex, useToast } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/inputField';
import { DefaultButton } from '../../components/DefaultButton';

import { Container, Title } from './styles';
import { useChangePasswordMutation } from '../../generated/graphql';
import { useHistory, useParams } from 'react-router-dom';
import { toErrorMap } from '../../utils/toErrorMap';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';
import { EyeIcon, SlashedEyeIcon } from './styles';

interface ParamTypes {
    paramToken: string
}

const ChangePassword: React.FC<ParamTypes> = () => {
    const [changePassword] = useChangePasswordMutation()
    const {paramToken} = useParams<ParamTypes>()
    const [, setToken] = useRecoilState(accessToken)
    const [isPassword, setIsPassword] = useState(true)
    const toast = useToast()
    const history = useHistory()
    return (
        <Flex w='100%' justify='center'>
            <Container>
                <Box textAlign='center'><Title>REDEFINIR SENHA</Title></Box>
                <Formik
                    initialValues={{senha: '', confirmarSenha: ''}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await changePassword({variables: {senha: values.senha, confirmarSenha: values.confirmarSenha, token: paramToken}})
                        console.log(response)
                        if(response.data?.changePassword.errors) {
                            setErrors(toErrorMap(response.data.changePassword.errors))
                        }
                        else {
                            setToken(response.data?.changePassword.accessToken as string)
                            toast({
                                position: 'top',
                                variant: 'solid',
                                status: 'success',
                                isClosable: true,
                                title: 'Sucesso!',
                                description: 'Senha redefinida com sucesso',
                                duration: 3000
                            })
                            setTimeout(() => history.push('/'), 3000)
                        }

                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <Box w='100%' mt={6}>
                                <InputField name='senha' type={isPassword ? 'password' : 'text'} placeholder='Digite sua nova senha' borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' />
                            </Box>
                            <Box w='100%' mt={4}>
                                <InputField name='confirmarSenha' type={isPassword ? 'password' : 'text'} placeholder='Por favor, repita sua senha' borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' />
                            </Box>
                            <Flex w='100%' justify='space-between' mt={4}>
                                <DefaultButton w='48%' type='button' onClick={() => setIsPassword(prevState => !prevState)}>{isPassword ? <>Mostrar senhas <EyeIcon /></> : <>Esconder senhas <SlashedEyeIcon /></>}</DefaultButton>
                                <DefaultButton w='48%' type='submit' isLoading={isSubmitting}>Redefinir senha</DefaultButton>
                            </Flex>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Flex>
    );
}

export default ChangePassword;