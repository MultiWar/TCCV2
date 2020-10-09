import { Flex, Image, Stack } from '@chakra-ui/core';
import React from 'react';

import { Container } from './styles';

const DesktopImageComponent: React.FC = () => {
    return (
        <Container>
            <Flex direction='column' w='100px' h='100%' justify='space-between'>
                <Stack spacing='20px'>
                    <Image w='60px' objectFit='fill' src='https://bit.ly/sage-adebayo' borderRadius={8} />
                    <Image w='60px' objectFit='fill' src='https://bit.ly/sage-adebayo' borderRadius={8} />
                    <Image w='60px' objectFit='fill' src='https://bit.ly/sage-adebayo' borderRadius={8} />
                    <Image w='60px' objectFit='fill' src='https://bit.ly/sage-adebayo' borderRadius={8} />
                </Stack>
            </Flex>
            <Flex>
                <Image w='300px' h='300px' objectFit='fill' src='https://bit.ly/sage-adebayo' borderRadius={8} />
            </Flex>
        </Container>
    );
}

export default DesktopImageComponent;