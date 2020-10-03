import { Box } from '@chakra-ui/core';
import { Formik, Form } from 'formik';
import React, {useContext} from 'react';
import { ThemeContext } from 'styled-components';
import { DefaultButton } from '../../components/DefaultButton';
import { InputField } from '../../components/inputField';
import { toErrorMap } from '../../utils/toErrorMap';
import {useHistory} from 'react-router-dom'

import { Container, Title } from './styles';
import { request } from 'http';
import { useRegisterMutation } from '../../generated/graphql';
import { useRecoilState } from 'recoil';
import { accessToken } from '../../atoms/accessToken';

const Cadastro: React.FC = () => {
  const themeContext = useContext(ThemeContext)
  const [register] = useRegisterMutation()
  const history = useHistory()
  const [token, setToken] = useRecoilState(accessToken)

  return (
    <Container>
      <Box textAlign='center'>
        <Title>Faça seu cadastro</Title>
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
              <InputField label='CPF' placeholder='Ex: 12143476789' name='cpf' />
            </Box>
            <Box mt={4}>
              <InputField label="Nome Completo" placeholder="Ex: Carlos Alberto de Nóbrega" name='nome' />
            </Box>
            <Box mt={4}>
              <InputField label='Senha' placeholder='Ex: senha123' name='senha' type='password' />
            </Box>
            <Box mt={4}>
              <InputField label='Email' placeholder='Ex: carlos.alberto@gmail.com' name='email' />
            </Box>
            <Box mt={4}>
              <InputField label='CEP' placeholder='Ex: 45879000' name='cep' />              
            </Box>
            <Box mt={4}>
              <InputField label='Rua' placeholder='Ex: Zike Tuma' name='rua' />
            </Box>
            <Box mt={4}>
              <InputField label='Número' placeholder='Ex: 123' name='numero' />
            </Box>
            <Box mt={4}>
              <InputField label='Complemento' placeholder='Ex: Apartamento 34, bloco C' name='complemento' />
            </Box>
            {/* <CustomButton w='100%' type='submit'>Cadastrar</CustomButton> */}
            <Box mt={4} justifyContent='space-between' display='flex'>
              <DefaultButton w='48%' type='button' onClick={() => history.push('/login')} >Já tenho cadastro</DefaultButton>
              <DefaultButton w='48%' isLoading={isSubmitting} type='submit' loadingText="Enviando informações">Cadastrar</DefaultButton>
            </Box>
          </Form>
        )}
      </Formik> 
    </Container>
  )
}

export default Cadastro;