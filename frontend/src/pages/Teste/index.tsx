import { Heading } from '@chakra-ui/core';
import React from 'react';

import { Container, InputTeste, DivInput } from './styles';

const Teste: React.FC = () => {
    return (
        <Container>
            <DivInput>
                <InputTeste />
            </DivInput>
        </Container>
    );
}


export default Teste;