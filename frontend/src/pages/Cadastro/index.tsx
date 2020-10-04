import { Box } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React, {useContext, useState} from 'react';
import { ThemeContext } from 'styled-components';
import { DefaultButton } from '../../components/DefaultButton';
import { InputField } from '../../components/inputField';
import { toErrorMap } from '../../utils/toErrorMap';
import {useHistory} from 'react-router-dom'

import { Container, EyeIcon, SlashedEyeIcon, Title } from './styles';
import { request } from 'http';
import { useRegisterMutation } from '../../generated/graphql';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';
import { darken, shade } from 'polished';

const Cadastro: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const [register] = useRegisterMutation()
  const history = useHistory()
  const [isPassword, setIsPassword] = useState<Boolean>(true)
  const [token, setToken] = useRecoilState(accessToken)

  return (
    <Container>
      <Box textAlign='center'>
        <Title>CADASTRE-SE</Title>
      </Box>
      <Formik
        initialValues={{nome: '', cpf: '', email: '', senha: '', cep: '', rua: '', numero: '', complemento: ''}}
        onSubmit={async (values, {setErrors}) => {
          const response = await register({variables: values})
          if(response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors))
          }
          else {
            setToken(response.data?.register.accessToken as string)
            history.push('/')
          }
        }}
      >
        {({isSubmitting}) => (
          <Form>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='CPF   ex: 12143476789' name='cpf' />
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder="Nome completo   ex: Carlos Alberto de Nóbrega" name='nome' />
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='Senha   ex: senha123' name='senha' type={isPassword ? 'password' : 'text'} />
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='Email   ex: carlos.alberto@gmail.com' name='email' />
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='CEP   ex: 45879000' name='cep' />              
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='Nome da Rua   ex: Zike Tuma' name='rua' />
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='Número   ex: 123' name='numero' />
            </Box>
            <Box mt={4}>
              <InputField borderColor='blue.200' focusBorderColor='blue.400' variant='flushed' size='lg' placeholder='Complemento   ex: Apartamento 34, bloco C' name='complemento' />
            </Box>
            {/* <CustomButton w='100%' type='submit'>Cadastrar</CustomButton> */}
            <Box mt={4} justifyContent='space-between' display='flex'>
              <DefaultButton w='48%' type='button' onClick={() => history.push('/login')} >Já tenho cadastro</DefaultButton>
              <DefaultButton w='48%' isLoading={isSubmitting} type='submit' loadingText="Enviando informações">Cadastrar</DefaultButton>
            </Box>
            <Box mt={1}>
              <DefaultButton w='100%' type='button' onClick={() => setIsPassword(!isPassword)}>{ isPassword ? (<><EyeIcon />Mostrar senha</>) : (<><SlashedEyeIcon />Esconder senha</>) }</DefaultButton>
            </Box>
          </Form>
        )}
      </Formik> 
    </Container>
  )
}

export default Cadastro;