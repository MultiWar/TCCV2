import { Flex, Stack } from '@chakra-ui/core';
import React from 'react';
import {Link} from 'react-router-dom'
import AvatarComponent from '../AvatarComponent';
import { Container } from './styles';

const Header: React.FC = () => {
  return (
      <Container>
          <Flex>
            <Stack>
              <Link to='/'>Home</Link>
            </Stack>
          </Flex>
          <Flex mr={2}>
            <AvatarComponent />
          </Flex>
      </Container>
  );
}

export default Header;