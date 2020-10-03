import { Form, Formik } from 'formik';
import React, {useContext, useState} from 'react';
import { useLoginMutation } from '../../generated/graphql';
import { toErrorMap } from '../../utils/toErrorMap';
import { useHistory } from "react-router-dom";
import { Button, Container, EyeIcon, SlashedEyeIcon, Title } from './styles';
import { Box } from '@chakra-ui/core';
import { InputField } from '../../components/inputField';
import { DefaultButton } from '../../components/DefaultButton';
import { ThemeContext } from 'styled-components';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';

const Login: React.FC = () => {
    const [login] = useLoginMutation()
    const themeContext = useContext(ThemeContext)
    const history = useHistory()
    const [token, setToken] = useRecoilState(accessToken)
    const [isPassword, setIsPassword] = useState<Boolean>(true)

    return (
        <Container>
            <Box textAlign='center'><Title>Entrar</Title></Box>
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
                            <InputField label='CPF' name='cpf' placeholder='Ex: 12345678910' />
                        </Box>
                        <Box mt={4} display='flex'>
                            <Box w='90%'>
                                <InputField label='Senha' name='senha' placeholder='Ex: senha123' type={isPassword ? 'password' : 'text'} />
                            </Box>
                            <Box w='10%' display='flex' justifyContent='center'>
                                <Button type='button' onClick={() => setIsPassword(!isPassword)} >{ isPassword ? (<SlashedEyeIcon />) : (<EyeIcon />) }</Button>
                            </Box>
                        </Box>     
                        <Box mt={2} w='100%' display='flex' justifyContent='flex-end' color={themeContext.colors.primary}>
                        </Box>
                        <Box mt={2} display='flex' justifyContent='space-between'>
                            <DefaultButton w='48%' type='button' onClick={() => history.push('/cadastro')}>Não estou cadastrado</DefaultButton>
                            <DefaultButton w='48%' type='submit' isLoading={isSubmitting} loadingText='Enviando informações' >Entrar</DefaultButton>
                        </Box>
                        <Box mt={1} w='100%'>
                            <DefaultButton w='100%' type='button' onClick={() => history.push('/forgotPassword')}>Esqueci minha senha</DefaultButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default Login;