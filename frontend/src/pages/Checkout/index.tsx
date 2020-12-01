import React, { useEffect, useState } from 'react';
import { Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/core';

import { Card } from './styles';
import { useRecoilState } from 'recoil';
import ListaProdutosCheckout from '../../components/ListaProdutosCheckout';
import { TabIndex } from '../../atoms/tabIndex';
import VerificarInformacoes from '../../components/VerificarInformacoes';
import ConfirmPurchase from '../../components/ConfirmPurchase';

const Checkout: React.FC = () => {
  const [tabIndex, setTabIndex] = useRecoilState(TabIndex)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize () {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  })
  
  const handleTabChange = (index: any) => {
    setTabIndex(index)
  }


  return (
    <Flex justify='center'>
      <Card>
        <Tabs index={tabIndex} onChange={handleTabChange} size={windowWidth > 420 ? 'md' : 'sm'}>
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
            <TabPanel>
              <ConfirmPurchase />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Card>
    </Flex>
  );
}

export default Checkout;