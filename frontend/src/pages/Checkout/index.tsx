import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';

import { Card } from './styles';

const Checkout: React.FC = () => {
  return (
    <Flex justify='center'>
      <Card>
        <Heading>Finalizar compra</Heading>
      </Card>
    </Flex>
  );
}

export default Checkout;