import { Box, Checkbox, CheckboxGroup, Collapse, Flex, Heading, Image } from '@chakra-ui/core';
import React, { useState } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { useProdutosQuery } from '../../generated/graphql';
import {Link} from 'react-router-dom'
import { Card } from './styles';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'

const Loja: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [isShown, setIsShown] = useState(true)
    const [categoriasEscolhidas, setCategoriasEscolhidas] = useState<string[] | undefined>(undefined)
    const [tarjasEscolhidas, setTarjasEscolhidas] = useState<string[] | undefined>(undefined)
    const [concentracoesEscolhidas, setConcentracoesEscolhidas] = useState<string[] | undefined>(undefined)
    const [principioAtivoEscolhido, setPrincipioAtivoEscolhido] = useState<string[] | undefined>(undefined)
    const [pagina, setPagina] = useState(2)
    const {data, loading, error, fetchMore, variables} = useProdutosQuery({
        variables: {
            pagina: 1,
            categorias: categoriasEscolhidas,
            tarjas: tarjasEscolhidas,
            concentracoes: concentracoesEscolhidas,
            principioAtivo: principioAtivoEscolhido
        }
    })
    if(loading) {
        return (
            <Flex></Flex>
        )
    }
    return (
        <Flex direction='column' mt={0}>
            <DefaultButton type='button' onClick={() => setIsShown(prevState => !prevState)} backgroundColor='gray.400' _hover={{backgroundColor:'gray.500'}}>
                {isShown ? (<>Esconder Filtros <BsChevronUp /></>) : (<>Mostrar Filtros <BsChevronDown /></>)}
            </DefaultButton>
            <Collapse w='100%' isOpen={isShown}>
                <Flex w='100%' justify='center' mt={2}>
                    <Heading size='2xl'>FILTRAR PRODUTOS</Heading>
                </Flex>
                <Flex w='100%' direction={['column', 'column', 'row', 'row']} wrap='wrap' px={10} alignItems={['center', 'center', 'flex-start', 'flex-start']} justify={['center', 'center','space-between','space-between']}>
                    <Box mt={4} w={['100%', '100%', 'unset', 'unset']} >
                        <Heading size='xl' as='legend'>Categorias</Heading>
                        <CheckboxGroup size='lg' name='categorias' defaultValue={categoriasEscolhidas} 
                            onChange={
                                (value) => {
                                    setCategoriasEscolhidas((value as string[]).length > 0 ? value as string[] : undefined)
                                    setPagina(2)
                                }
                        }>
                            <Checkbox value='remedio' borderColor='blue.400'>Remédios</Checkbox>
                            <Checkbox value='cuidados pessoais' borderColor='blue.400'>Cuidados Pessoais</Checkbox>
                            <Checkbox value='higiene' borderColor='blue.400'>Higiene</Checkbox>
                        </CheckboxGroup>
                    </Box>
                    <Box mt={4} w={['100%', '100%', 'unset', 'unset']}>
                        <Heading size='xl' as='legend'>Tarjas</Heading>
                        <CheckboxGroup size='lg' name='tarjas' defaultValue={tarjasEscolhidas}
                            onChange={
                                (value) => {
                                    setTarjasEscolhidas((value as string[]).length > 0 ? value as string[] : undefined)
                                    setPagina(2)
                                }
                        }>
                            <Checkbox value='preta' borderColor='blue.400'>Preta</Checkbox>
                            <Checkbox value='vermelha' borderColor='blue.400'>Vermelha</Checkbox>
                            <Checkbox value='azul' borderColor='blue.400'>Azul</Checkbox>
                            <Checkbox value='vinho' borderColor='blue.400'>Vinho</Checkbox>
                        </CheckboxGroup>
                    </Box>
                    <Box mt={4} w={['100%', '100%', 'unset', 'unset']}>
                        <Heading size='xl' as='legend'>Concentrações</Heading>
                        <CheckboxGroup size='lg' name='concentracoes' defaultValue={concentracoesEscolhidas}
                            onChange={
                                (value) => {
                                    setConcentracoesEscolhidas((value as string[]).length > 0 ? value as string[] : undefined)
                                    setPagina(2)
                                }
                        }>
                            <Checkbox value='5mg' borderColor='blue.400'>5mg</Checkbox>
                            <Checkbox value='10mg' borderColor='blue.400'>10mg</Checkbox>
                            <Checkbox value='25mg' borderColor='blue.400'>25mg</Checkbox>
                        </CheckboxGroup>
                    </Box>
                    <Box mt={4} w={['100%', '100%', 'unset', 'unset']}>
                        <Heading size='xl' as='legend'>Principios Ativos</Heading>
                        <CheckboxGroup size='lg' name='principioAtivo' defaultValue={principioAtivoEscolhido}
                            onChange={
                                (value) => {
                                    setPrincipioAtivoEscolhido((value as string[]).length > 0 ? value as string[] : undefined)
                                    setPagina(2)
                                }
                        }>
                            <Checkbox value='principAtivo1' borderColor='blue.400'>Principio Ativo 1</Checkbox>
                            <Checkbox value='principAtivo2' borderColor='blue.400'>Principio Ativo 2</Checkbox>
                            <Checkbox value='principAtivo3' borderColor='blue.400'>Principio Ativo 3</Checkbox>
                        </CheckboxGroup>
                    </Box>
                </Flex>
            </Collapse>
            <Flex flexDirection='row' wrap='wrap' mx={10} mt={5} justifyContent={['center', 'center', 'center', 'space-between']}>
                {data?.produtos.produtos.map(produto => {
                    return (
                        <Card key={produto.idProduto}>
                            <Box w='100%' mb={2} textAlign='center'>
                                <Heading fontSize={['xl', 'xl', '3xl']}>{produto.nomeProduto}</Heading>
                            </Box>
                            <Flex h={['150px', '150px', '300px']} w={['100px', '100px','200px']}>
                                <Image objectFit='cover' src='https://bit.ly/sage-adebayo' htmlHeight='100%' htmlWidth='100%' borderRadius={8} />
                            </Flex>
                            <Flex direction={['column', 'column', 'row']} justify='space-between'>
                                <DefaultButton w={['100%','100%','48%']}>
                                    <Link to={`/produtos/${produto.nomeProduto}`}>+ informações</Link>
                                </DefaultButton>
                                <DefaultButton w={['100%','100%','48%']} mt={[2, 2, 4]}>+ carrinho</DefaultButton>
                            </Flex>
                        </Card>
                    )
                })}
            </Flex>
            <DefaultButton type='button' onClick={() => {
                console.log(variables)
                setPagina(prevPagina => prevPagina + 1)
                fetchMore({
                    variables: {
                        pagina: pagina,
                        categorias: categoriasEscolhidas,
                        tarjas: tarjasEscolhidas,
                        concentracoes: concentracoesEscolhidas,
                        principioAtivo: principioAtivoEscolhido
                    }
                })
            }}>Teste Paginação</DefaultButton>
        </Flex>
    );
}

export default Loja;