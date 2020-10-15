import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { Form, Formik } from 'formik';
import { InputField } from '../../components/inputField';
import { DefaultButton } from '../../components/DefaultButton';

import { Container, Title } from './styles';

const ChangePassword: React.FC = () => {
    return (
        <Flex w='100%' justify='center'>
            <Container>
                <Box textAlign='center'><Title>REDEFINIR SENHA</Title></Box>
                <Formik
                    initialValues={{senha: '', confirmarSenha: ''}}
                    onSubmit={(values, {setErrors}) => {}}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <Box w='100%' mt={6}>
                                <InputField name='senha' placeholder='Digite sua nova senha' borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' />
                            </Box>
                            <Box w='100%' mt={4}>
                                <InputField name='confirmarSenha' placeholder='Por favor, repita sua senha' borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' />
                            </Box>
                            <DefaultButton type='submit' mt={4} isLoading={isSubmitting}>Redefinir senha</DefaultButton>
                        </Form>
                    )}
                </Formik>
            </Container>
        </Flex>
    );
}

export default ChangePassword;