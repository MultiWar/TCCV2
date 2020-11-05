import { Heading } from '@chakra-ui/core';
import React from 'react';

import { Container, Title, Card, CardContainer, ImageReplacer, TextoEBotoes, Texto, Botoes } from './styles';

const Teste: React.FC = () => {
    return (
        <Container>
            <Card>
                <Title>
                    <Heading>asdasdasd</Heading>
                </Title>
                <CardContainer>
                    <ImageReplacer />
                    <TextoEBotoes> 
                        <Texto>sdasdasdasdasd</Texto>
                        <Botoes> 
                            <button>1</button>
                            <button>2</button>
                        </Botoes>
                    </TextoEBotoes>
                </CardContainer>
            </Card>
        </Container>
    );
}


export default Teste;