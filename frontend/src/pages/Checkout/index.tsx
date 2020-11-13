import React from 'react';
import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';

import { Card } from './styles';
import { useRecoilState } from 'recoil';
import ListaProdutosCheckout from '../../components/ListaProdutosCheckout';
import { TabIndex } from '../../atoms/tabIndex';
import VerificarInformacoes from '../../components/VerificarInformacoes';

const Checkout: React.FC = () => {
  const [tabIndex, setTabIndex] = useRecoilState(TabIndex)

  const handleTabChange = (index: any) => {
    setTabIndex(index)
  } 

  return (
    <Flex justify='center'>
      <Card>
        <Tabs index={tabIndex} onChange={handleTabChange} size='lg'>
          <TabList>
            <Tab>Produtos</Tab>
            <Tab>Verificar</Tab>
            <Tab>Pagamento</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ListaProdutosCheckout />
            </TabPanel>
            <TabPanel>
              <VerificarInformacoes />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Flex>
  );
}

export default Checkout;