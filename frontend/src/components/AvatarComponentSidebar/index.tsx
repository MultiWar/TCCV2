import { Avatar, Flex } from '@chakra-ui/core';
import React from 'react';
import { useMeQuery } from '../../generated/graphql';

// import { Container } from './styles';

const AvatarComponentSidebar: React.FC = () => {
    const {data} = useMeQuery()
    return (
        <Flex w='100%' direction='column'>
            <Flex justify='center'>
                <Avatar name={data?.me.nomeUser} size='2xl' />
            </Flex>
        </Flex>
    );
}

export default AvatarComponentSidebar;