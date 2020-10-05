import { Popover, PopoverTrigger, Box, Button, Avatar, PopoverContent, Text, PopoverHeader, PopoverArrow, PopoverBody } from '@chakra-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMeQuery } from '../../generated/graphql'
import { DefaultButton } from '../DefaultButton'

const AvatarComponent: React.FC = () => {
    const history = useHistory()
    const {data} = useMeQuery()
    return (
        <Popover placement='bottom-end'>
            <PopoverTrigger>
                <Box alignItems='center' justifyContent='space-between' w='100%'>
                    <Button background='transparent' _hover={{backgroundColor: '#555'}} h='100%' fontSize='lg' fontWeight='regular'>
                        <Avatar name={data?.me.nomeUser} mr={2} size='sm' />
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
                    <Text><strong>Nome:</strong> {data?.me.nomeUser}</Text>
                    <Text><strong>CPF:</strong> {data?.me.cpf}</Text>
                    <Text><strong>CEP:</strong> {data?.me.endereco.split(',')[0]}</Text>
                    <Text><strong>Endereço:</strong> {`${data?.me.endereco.split(',')[1]}, ${data?.me.endereco.split(',')[2]}` + data?.me.endereco.split(',')[3] ? `, ${data?.me.endereco.split(',')[3]}` : ''}</Text>
                    <DefaultButton w='100%' type='button' onClick={() => history.push('/editarConta')}>Editar informações da conta</DefaultButton>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default AvatarComponent