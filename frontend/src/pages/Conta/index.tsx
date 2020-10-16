import { Avatar, Flex, Heading } from '@chakra-ui/core';
import React, { useState } from 'react';
import { useMeQuery } from '../../generated/graphql';

import { Container, Title } from './styles';

const Conta: React.FC = () => {
    const {data, loading} = useMeQuery()
    const [isEditable, setIsEditable] = useState(false)
    return isEditable ? (
        <div></div>
    ) :  (
        <Container>
            <Flex w='100%' mt={0} align='center' direction='column'>
                <Heading>Informações da Conta</Heading>
                <Avatar size='2xl' mt={10} />
                <Heading size='lg' mt={2}>{data?.me.nomeUser}</Heading>
            </Flex>
        </Container>
    );
}

export default Conta;