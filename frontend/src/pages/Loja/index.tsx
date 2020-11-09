import { Box, Button, Checkbox, CheckboxGroup, Collapse, Flex, Heading, Image, Radio, RadioGroup, Skeleton, Stack, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { useProdutosQuery } from '../../generated/graphql';
import {useHistory} from 'react-router-dom'
import { FlechaBaixo, FlechaCima, Card, CardContainer, CardImageContainer, ProductButtons, ProductInformationAndButtons, ProductInformations } from './styles';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart'

const Loja: React.FC = () => {
    const [isShown, setIsShown] = useState(false)
    const [concentracoes1, setConcentracoes1] = useState<string[]>([])
    const [concentracoes2, setConcentracoes2] = useState<string[]>([])
    const [concentracoesEscolhidas, setConcentracoesEscolhidas] = useState<string[] | undefined>(undefined)
    const [categoriasEscolhidas, setCategoriasEscolhidas] = useState<string[] | undefined>(undefined)
    const [tarjasEscolhidas, setTarjasEscolhidas] = useState<string[] | undefined>(undefined)
    const [principioAtivoEscolhido, setPrincipioAtivoEscolhido] = useState<string[] | undefined>(undefined)
    const [orderBy, setOrderBy] = useState<string | undefined>(undefined)

    const [pagina, setPagina] = useState(2)

    const [cart, setCart] = useRecoilState(ShoppingCart)

    interface Produto {
        //idProduto should eventuaylly return to being a string. Also change in recoilState and in all function parameters, incluind from this file and from cart component
        idProduto: number,
        nomeProduto: string,
        preco: string,
        quantidade: number,
        imagem: string
        // imagemProduto: ImageBitmap
    }
    
    const addToCart = (produto: Produto) => {
        setCart(prevCart => [...prevCart, produto])
        const carrinhoAntigo = localStorage.getItem('carrinho')
        let carrinhoAntigoJson
        let carrinhoNovo
        if(carrinhoAntigo) {
            carrinhoAntigoJson = JSON.parse(carrinhoAntigo)
            carrinhoNovo = [...carrinhoAntigoJson, produto]
        }
        else {
            carrinhoAntigoJson = undefined
            carrinhoNovo = [produto]
        }
        localStorage.setItem('carrinho', JSON.stringify(carrinhoNovo))
    }
    
    const getCart = (): Produto[] => {
        return cart
    }
    
    const removeFromCart = (id: number) => {
        let carrinhoAntigo = [...cart]
        let carrinhoNovo = carrinhoAntigo.filter(produto => produto.idProduto !== id)
        setCart(carrinhoNovo) 
        localStorage.setItem('carrinho', JSON.stringify(carrinhoNovo))
    }
    
    const clearCart = () => {
        setCart([])
        localStorage.removeItem('carrinho')
    }

    const getDefaultValue = (): string[] | undefined => {
        if(concentracoes1.length > 0 && concentracoes2.length > 0) {
            return concentracoes1.concat(concentracoes2)
        }
        if(concentracoes1.length > 0 && concentracoes2.length === 0) {
            return concentracoes1
        }
        if(concentracoes2.length > 0 && concentracoes1.length === 0) {
            return concentracoes2
        }
        return undefined
    }

    const history = useHistory()

    const {data, loading, fetchMore, variables} = useProdutosQuery({
        variables: {
            pagina: 1,
            categorias: categoriasEscolhidas,
            tarjas: tarjasEscolhidas,
            concentracoes: getDefaultValue(),
            principioAtivo: principioAtivoEscolhido,
            orderBy: orderBy
        }
    })
    console.log(variables)
    if(loading) {
        return (
            <>
                <Box w='100%' mt={0}>
                    <Skeleton w='100%' h='40px'/>
                </Box>
                <Flex flexDirection='row' wrap='wrap' mx={10} mt={5} justifyContent={['center', 'center', 'center', 'space-between']}>
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '593px']} borderRadius={8} mt={6} mx='20px' />
                </Flex>
            </>
        )
    }
    return (
        <Flex direction='column' mt={0}>
            <DefaultButton mt={0} fontSize='xl' borderRadius={0} type='button' onClick={() => setIsShown(prevState => !prevState)} backgroundColor='gray.400' _hover={{backgroundColor:'gray.500'}}>
                {isShown ? (<>Esconder Filtros <FlechaCima /></>) : (<>Mostrar Filtros <FlechaBaixo /></>)}
            </DefaultButton>
            <Collapse w='100%' isOpen={isShown}>
                <Flex w='100%' justify='center' mt={2}>
                    <Heading size='2xl'>FILTRAR PRODUTOS</Heading>
                </Flex>
                <Flex w='100%' direction={['column', 'column', 'row']} wrap='wrap' px={10} alignItems={['center', 'center', 'flex-start']} justify={['center', 'center','space-around']}>
                    <Box mt={4} w={['100%', '100%', 'unset']}>
                        <Heading size='xl' as='legend' mb={2}>Categorias</Heading>
                        <CheckboxGroup size='lg' name='categorias' defaultValue={categoriasEscolhidas} 
                            onChange={
                                (value) => {
                                    setCategoriasEscolhidas((value as string[]).length > 0 ? value as string[] : undefined)
                                    setPagina(2)
                                }
                        }>
                            <Checkbox value='remedio' borderColor='blue.400'>Remédios</Checkbox>
                            <Checkbox value='higiene pessoal' borderColor='blue.400'>Higiene pessoal</Checkbox>
                            <Checkbox value='beleza' borderColor='blue.400'>Beleza</Checkbox>
                            <Checkbox value='curativo' borderColor='blue.400'>Curativo</Checkbox>
                            <Checkbox value='suplemento' borderColor='blue.400'>Suplemento</Checkbox>
                        </CheckboxGroup>
                    </Box>
                    <Box mt={4} w={['100%', '100%', 'unset']}>
                        <Heading size='xl' as='legend' mb={2}>Tarjas</Heading>
                        <CheckboxGroup size='lg' name='tarjas' defaultValue={tarjasEscolhidas}
                            onChange={
                                (value) => {
                                    setTarjasEscolhidas((value as string[]).length > 0 ? value as string[] : undefined)
                                    setPagina(2)
                                }
                        }>
                            <Checkbox value='preta' borderColor='blue.400'>Preta</Checkbox>
                            <Checkbox value='vermelha' borderColor='blue.400'>Vermelha</Checkbox>
                            <Checkbox value='amarela' borderColor='blue.400'>Amarela</Checkbox>
                        </CheckboxGroup>
                    </Box>
                    <Flex mt={4} w={['100%', '100%', 'unset']} direction='column'>
                        <Heading size='xl' as='legend' mb={2}>Concentrações</Heading>
                        <Flex justify={['unset', 'unset','space-around']}>
                            <CheckboxGroup mr={[8, 8, 'unset']} size='lg' name='concentracoes1' defaultValue={concentracoes1}
                                onChange={
                                    (value) => {
                                        setConcentracoes1((value as string[]).length > 0 ? value as string[] : [])
                                        setConcentracoesEscolhidas(concentracoes1?.concat(concentracoes2 || []) || undefined)
                                        setPagina(2)
                                    }
                            }>

                                <Checkbox value='1%' borderColor='blue.400'>1%</Checkbox>
                                <Checkbox value='2.5%' borderColor='blue.400'>2,5%</Checkbox>
                                <Checkbox value='3%' borderColor='blue.400'>3%</Checkbox>
                                <Checkbox value='3.5%' borderColor='blue.400'>3,5%</Checkbox>
                                <Checkbox value='4%' borderColor='blue.400'>4%</Checkbox>
                                <Checkbox value='4.5%' borderColor='blue.400'>4,5%</Checkbox>
                            </CheckboxGroup>
                            <CheckboxGroup size='lg' name='concentracoes2' defaultValue={concentracoes2}
                                onChange={
                                    (value) => {
                                        setConcentracoes2((value as string[]).length > 0 ? value as string[] : [])
                                        setConcentracoesEscolhidas(concentracoes1?.concat(concentracoes2 || []) || undefined)
                                        setPagina(2)
                                    }
                            }>
                                <Checkbox value='5%' borderColor='blue.400'>5%</Checkbox>
                                <Checkbox value='6%' borderColor='blue.400'>6%</Checkbox>
                                <Checkbox value='7%' borderColor='blue.400'>7%</Checkbox>
                                <Checkbox value='8%' borderColor='blue.400'>8%</Checkbox>
                                <Checkbox value='9%' borderColor='blue.400'>9%</Checkbox>
                                <Checkbox value='10%' borderColor='blue.400'>10%</Checkbox>
                            </CheckboxGroup>
                        </Flex>
                    </Flex>
                    <Box mt={4} w={['100%', '100%', 'unset']}>
                        <Heading size='xl' as='legend' mb={2}>Principios Ativos</Heading>
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
                    <Box mt={4} w={['100%', '100%', 'unset']}>
                        <Heading size='xl' as='legend' mb={2}>Ordernar por:</Heading>
                        <RadioGroup size='lg' name='orderBy' defaultValue={orderBy}
                            onChange={
                                (e) => {
                                    setOrderBy(e.target.value)
                                    setPagina(2)
                                }
                        }>
                            <Radio value='nomeProduto' borderColor='blue.400'>Nome do produto</Radio>
                            <Radio value='preco' borderColor='blue.400'>Preço</Radio>
                            <Radio value='principioAtivo' borderColor='blue.400'>Principio Ativo</Radio>
                        </RadioGroup>
                    </Box>
                </Flex>
            </Collapse>
            <Flex flexDirection='row' wrap='wrap' mx={[4, 10]} mt={5} justifyContent={['center', 'center', 'center', 'space-between']}>
                {data?.produtos.produtos.map(produto => {
                    let isAlreadyInCart = false
                    cart.map(produtoNoCarrinho => {
                        if(produtoNoCarrinho.idProduto === produto.idProduto) {
                            isAlreadyInCart = true
                        }
                        })
                    return (
                        <Card key={produto.idProduto}>
                            <Box w='100%' mb={2} textAlign='center' pt={2}>
                                <Heading fontSize={['2xl', '3xl']}>{produto.nomeProduto}</Heading>
                            </Box>
                            <CardContainer>
                                <CardImageContainer>
                                    <Image objectFit='cover' src='https://picsum.photos/200/300' h='100%' width={['100%', '100px','200px']} borderRadius={8} />
                                </CardImageContainer>
                                <ProductInformationAndButtons>
                                    <ProductInformations>
                                        <Text alignSelf='center' fontSize={['2xl', '3xl']}><strong>R${produto.preco}</strong></Text>
                                        <Text fontSize={['lg', 'xl']}><strong>Concentração:</strong> {produto.concentracao}</Text>
                                        <Text><strong>Princípio ativo:</strong> {produto.principioAtivo}</Text>
                                    </ProductInformations>
                                    <ProductButtons>
                                        <DefaultButton w={['100%','48%']} type='button' onClick={() => history.push(`/produtos/${produto.idProduto}`)}>
                                            <Text fontSize='lg'>+ informações</Text>
                                        </DefaultButton>
                                        { isAlreadyInCart
                                            ? <Button w={['100%', '48%']} mt={[2, 4]} variantColor='red' type='button' onClick={() => removeFromCart(produto.idProduto)}><Text fontSize='lg'>- carrinho</Text></Button> 
                                            : <DefaultButton w={['100%','48%']} mt={[2, 4]} type='button' onClick={() => addToCart({...produto, quantidade: 1})} ><Text fontSize='lg'>+ carrinho</Text></DefaultButton>
                                        }
                                    </ProductButtons>
                                </ProductInformationAndButtons>
                            </CardContainer>
                        </Card>
                    )
                })}
            </Flex>
            {data?.produtos.hasMore ? 
                <DefaultButton alignSelf='center' mt={6} fontSize='xl' maxWidth={['421px', 'unset']} type='button' w={['100%','250px']} onClick={() => {
                    setPagina(prevPagina => prevPagina + 1)
                    fetchMore({
                        variables: {
                            pagina: pagina,
                            categorias: categoriasEscolhidas,
                            tarjas: tarjasEscolhidas,
                            concentracoes: concentracoesEscolhidas,
                            principioAtivo: principioAtivoEscolhido,
                            orderBy: orderBy
                        }
                    })
                }}>Carregar mais produtos</DefaultButton> :
                <Text alignSelf='center' mt={6} fontWeight='semibold' fontSize='2xl'>Não há mais produtos em nosso catálogo</Text>
            }
        </Flex>
    );
}

export default Loja;