import { Box, Button, Checkbox, CheckboxGroup, Collapse, Flex, Heading, Image, Radio, RadioGroup, Skeleton, Text } from '@chakra-ui/core';
import React, { useState } from 'react';
import { DefaultButton } from '../../components/DefaultButton';
import { useProdutosQuery } from '../../generated/graphql';
import {useHistory} from 'react-router-dom'
import { FlechaBaixo, FlechaCima, Card, CardContainer, CardImageContainer, ProductButtons, ProductInformationAndButtons, ProductInformations } from './styles';
import { storePage } from '../../atoms/storePage';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart'
import {useIsInCart} from '../../utils/cartStuff'

const Loja: React.FC = () => {
    const [isShown, setIsShown] = useState(false)
    const [categoriasEscolhidas, setCategoriasEscolhidas] = useState<string[] | undefined>(undefined)
    const [tarjasEscolhidas, setTarjasEscolhidas] = useState<string[] | undefined>(undefined)
    const [concentracoesEscolhidas, setConcentracoesEscolhidas] = useState<string[] | undefined>(undefined)
    const [principioAtivoEscolhido, setPrincipioAtivoEscolhido] = useState<string[] | undefined>(undefined)
    const [orderBy, setOrderBy] = useState<string | undefined>(undefined)

    const [pagina, setPagina] = useRecoilState(storePage)

    const [cart, setCart] = useRecoilState(ShoppingCart)

    interface Produto {
        idProduto: string,
        nomeProduto: string,
        preco: string,
        quantidade: number
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
    
    const removeFromCart = (id: string) => {
        let carrinhoAntigo = [...cart]
        let carrinhoNovo = carrinhoAntigo.filter(produto => produto.idProduto !== id)
        setCart(carrinhoNovo)
        localStorage.setItem('carrinho', JSON.stringify(carrinhoNovo))
    }
    
    const clearCart = () => {
        setCart([])
        localStorage.removeItem('carrinho')
    }

    const history = useHistory()

    const {data, loading, fetchMore, variables} = useProdutosQuery({
        variables: {
            pagina: 1,
            categorias: categoriasEscolhidas,
            tarjas: tarjasEscolhidas,
            concentracoes: concentracoesEscolhidas,
            principioAtivo: principioAtivoEscolhido,
            orderBy: orderBy
        }
    })
    if(loading) {
        return (
            <>
                <Box w='100%' mt={0}>
                    <Skeleton w='100%' h='40px'/>
                </Box>
                <Flex flexDirection='row' wrap='wrap' mx={10} mt={5} justifyContent={['center', 'center', 'center', 'space-between']}>
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
                    <Skeleton w={['100%', '150px', '300px']} h={['200px', '200px', '400px']} borderRadius={8} mt={6} mx='20px' />
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
                    <Box mt={4} w={['100%', '100%', 'unset', 'unset']}>
                        <Heading size='xl' as='legend'>Ordernar por:</Heading>
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
                            <Box w='100%' mb={2} textAlign='center'>
                                <Heading fontSize={['2xl', '2xl', '3xl']}>{produto.nomeProduto}</Heading>
                            </Box>
                            <CardContainer>
                                <CardImageContainer>
                                    <Image objectFit='cover' src='https://bit.ly/sage-adebayo' h='100%' width={['100%', '100px','200px']} borderRadius={8} />
                                </CardImageContainer>
                                <ProductInformationAndButtons>
                                    <ProductInformations>
                                        <Text alignSelf='center' fontSize={['2xl', '3xl']}><strong>R${produto.preco}</strong></Text>
                                        <Text fontSize={['lg', 'xl']}><strong>Concentração:</strong> {produto.concentracao}</Text>
                                        <Text><strong>Princípio ativo:</strong> {produto.principioAtivo}</Text>
                                    </ProductInformations>
                                    <ProductButtons>
                                        <DefaultButton w={['100%','100%','48%']} type='button' onClick={() => history.push(`/produtos/${produto.idProduto}`)}>
                                            <Text fontSize='lg'>+ informações</Text>
                                        </DefaultButton>
                                        { isAlreadyInCart
                                            ? <Button w={['100%','100%','48%']} mt={[2, 2, 4]} variantColor='red' type='button' onClick={() => removeFromCart(produto.idProduto)}><Text fontSize='lg'>- carrinho</Text></Button> 
                                            : <DefaultButton w={['100%','100%','48%']} mt={[2, 2, 4]} type='button' onClick={() => addToCart({...produto, quantidade: 1})} ><Text fontSize='lg'>+ carrinho</Text></DefaultButton>
                                        }
                                    </ProductButtons>
                                </ProductInformationAndButtons>
                            </CardContainer>
                        </Card>
                    )
                })}
            </Flex>
            <DefaultButton type='button' onClick={() => {
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
            }}>Teste Paginação</DefaultButton>
        </Flex>
    );
}

export default Loja;