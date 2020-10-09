import { Avatar, Flex, Text } from '@chakra-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';

// import { Container } from './styles';

const AvatarComponentSidebar: React.FC = () => {
    const {data} = useMeQuery()
    return (
        <Flex w='100%' direction='column'>
            <Flex justify='center' mb={2}>
                <Avatar size='2xl' />
            </Flex>
            <Flex direction='column'>
                <Text fontSize='xl'><strong>Nome: </strong>{data?.me.nomeUser}</Text>
                <Text fontSize='xl'><strong>CPF: </strong>{data?.me.cpf}</Text>
                <Text fontSize='xl'><strong>Email: </strong>{data?.me.email}</Text>
                <Text fontSize='xl'><strong>Telefone: </strong>{data?.me.fone}</Text>
                <Text fontSize='xl'><strong>Endereço: </strong>{data?.me.endereco}</Text>
            </Flex>
        </Flex>
    );
}

export default AvatarComponentSidebar;