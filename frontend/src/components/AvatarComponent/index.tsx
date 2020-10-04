import { Popover, PopoverTrigger, Box, Button, Avatar, PopoverContent, Flex, Text, PopoverHeader, PopoverArrow, PopoverBody } from '@chakra-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import {ThemeContext} from 'styled-components'
import { accessToken } from '../../atoms/accessToken'
import { DefaultButton } from '../DefaultButton'

const AvatarComponent: React.FC = () => {
    const history = useHistory()
    const [token, setToken] = useRecoilState(accessToken)
    return (
        <Popover placement='bottom-end'>
            {({onClose}) => (
                <>
                    <PopoverTrigger>
                        <Box alignItems='center' justifyContent='space-between' w='100%'>
                            <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%'>
                                <Avatar name="Carlos Alberto de Nóbrega" mr={2} size='sm' />
                                <Text>Gerenciar Conta</Text>
                            </Button>
                        </Box>
                    </PopoverTrigger>
                    <PopoverContent zIndex={4} bg='gray.200' border='0' width='300px'>
                        <PopoverHeader fontWeight='bold' color='gray.800'>
                            <Text justifySelf='center'>Informações da conta</Text>
                        </PopoverHeader>
                        <PopoverArrow />
                        <PopoverBody color='gray.800'>
                            <h3><strong>Nome:</strong> Carlos Alberto</h3>
                            <h3><strong>Token:</strong>{token}</h3>
                            <h3><strong>CPF:</strong> 412.983.788-50</h3>
                            <h3><strong>CEP:</strong> 12345000</h3>
                            <h3><strong>Endereço:</strong> Rua sei lá, número 38, em frente ao lixão</h3>
                            <DefaultButton w='100%' type='button' onClick={() => history.push('/editarConta')}>Editar informações da conta</DefaultButton>
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    )
}

export default AvatarComponent