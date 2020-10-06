import React from 'react';
import styled from 'styled-components'

import { Container, DivLaranja, DivsVerde, WrapperDivsVerde } from './styles';

const Teste: React.FC = () => {
  return (
      <Container>
          <DivLaranja></DivLaranja>
          <WrapperDivsVerde>
              <DivsVerde></DivsVerde>
              <DivsVerde></DivsVerde>
              <DivsVerde></DivsVerde>
          </WrapperDivsVerde>
      </Container>
  );
}


export default Teste;