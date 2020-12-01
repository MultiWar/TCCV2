import { Button, Flex, Text } from '@chakra-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ShoppingCart } from '../../atoms/cart';
import { DefaultButton } from '../../components/DefaultButton';
// import DesktopImageComponent from '../../components/DesktopImageComponent';
import {useProdutoQuery, useProdutosSimilaresQuery} from '../../generated/graphql'
import { Card, CardComprar, Categoria, DivConcentracao, DivImagem, NomeRemedio, Similares, Tarja, DivMassa, Descricao, Quantidades, BotaoTrocarQuantidade, ProdutosSim, ProdutoSimilar, BotoesProdutosSimilares } from './styles';

interface ParamTypes {
    produto: string
}

interface Produto {
    //idProduto should eventuaylly return to being a string. Also change in recoilState and in all function parameters, incluind from this file and from cart component
    idProduto: number,
    nomeProduto: string,
    preco: string,
    quantidade: number,
    imagem: string
}

const Produtos: React.FC = () => {
    const {produto} = useParams<ParamTypes>()
    const produtoId = produto
    const [cart, setCart] = useRecoilState(ShoppingCart)
    const [isInCart, setIsInCart] = useState<Boolean>(false)
    const [quantity, setQuantity] = useState(1)
    const history = useHistory()
    const {data} = useProdutoQuery({
        variables: {
            idProduto: produtoId
        }
    })

    useEffect(() => {
        setIsInCart(false)
        cart.map(p => {
            if(p.idProduto === Number(produtoId)) {
                setIsInCart(true)
            }
        })
    }, [cart, data])

    setTimeout(() => {}, 500)

    const produtosSimilares = useProdutosSimilaresQuery({
        variables: {
            categoria: data?.produto.categoria as string
        }
    })

    if(!data) {
        return null
    }


    const getColorCode = (): {background: string, text: string} => {
        if(data.produto.tarja === 'preta') {
            return {
                background: '#111',
                text: '#eee'
            }
        }
        if(data.produto.tarja === 'vermelha') {
            return {
                background: '#e00',
                text: '#eee'
            }
        }
        if(data.produto.tarja === 'amarela') {
            return {
                background: '#fcec16',
                text: '#333'
            }
        }
        else {
            return {
                background: 'transparent',
                text: '#333'
            }
        }
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
    
    const removeFromCart = () => {
        let carrinhoAntigo = [...cart]
        let carrinhoNovo = carrinhoAntigo.filter(produto => produto.idProduto !== Number(produtoId))
        setCart(carrinhoNovo)
        localStorage.setItem('carrinho', JSON.stringify(carrinhoNovo))
        setIsInCart(false)
    }

    // const handleIncreaseQuantity = () => {
    //     const newCart = cart.map(produto => {
    //         if(produto.idProduto === Number(produtoId)) {
    //             return {...produto, quantidade: produto.quantidade + 1}
    //         }
    //         return produto
    //     })
    //     setCart(newCart)
    //     localStorage.setItem('carrinho', JSON.stringify(newCart))
    // }

    // const handleLowerQuantity = () => {
    //     const newCart = cart.map(produto => {
    //         if(produto.idProduto === Number(produtoId)) {
    //             return {...produto, quantidade: produto.quantidade - 1}
    //         }
    //         return produto
    //     })
    //     setCart(newCart)
    //     localStorage.setItem('carrinho', JSON.stringify(newCart))
    // }

    return (
        <Card>
            <Categoria><h4>{`<${data.produto.categoria}>`}</h4></Categoria>
            <DivImagem />
            <Similares>
                <h3>Produtos similares</h3>
                <h4>(clique nas imagens para ver mais informações)</h4>
                <ProdutosSim>
                    {produtosSimilares.data?.produtosSimilares.map(
                        produto => {
                            if(produto.idProduto !== Number(produtoId)) {
                                return (
                                    <Link key={produto.idProduto} to={`/produtos/${produto.idProduto}`}>
                                        <ProdutoSimilar key={produto.idProduto}>
                                            <Text isTruncated={true} as='h4'>{produto.nomeProduto}</Text>
                                            <div />
                                        </ProdutoSimilar>
                                    </Link>
                                )
                            }
                        }
                    )}
                </ProdutosSim>
            </Similares>
            <Tarja cor={getColorCode()}>{data.produto.tarja ? (<h2>Tarja {data.produto.tarja}</h2>) : (<h2>Não possui tarja</h2>)}</Tarja>
            <CardComprar>
                <h1>R${data.produto.preco}</h1>
                <Quantidades>
                    <BotaoTrocarQuantidade mr={3} background='transparent' onClick={() => setQuantity(prevValue => prevValue - 1)} _hover={{background: '#ccc'}} isDisabled={quantity > 1 ? false : true}> - </BotaoTrocarQuantidade>
                    <h2>{quantity}</h2>
                    <BotaoTrocarQuantidade ml={3} background='transparent' onClick={() => setQuantity(prevValue => prevValue + 1)} _hover={{background: '#ccc'}}> + </BotaoTrocarQuantidade>
                </Quantidades>
                {isInCart ? 
                    <Button mt={4} variantColor='red' onClick={() => removeFromCart()}>Remover do carrinho</Button>
                    : 
                    <>
                        <DefaultButton onClick={() => addToCart({...data.produto, quantidade: quantity, idProduto: Number(produtoId), imagem: ''})}>Adicionar ao carrinho</DefaultButton>
                        <Button mt={2} w='100%' variantColor='green' onClick={() => {addToCart({...data.produto, quantidade: quantity, idProduto: Number(produtoId), imagem: ''}); history.push('/confirmarCompra')}}>Comprar</Button>
                    </>}
            </CardComprar>
            <NomeRemedio><h1>{data.produto.nomeProduto}</h1></NomeRemedio>
            <DivConcentracao>{data.produto.concentracao ? (<h3>concentração: {data.produto.concentracao}</h3>) : null}</DivConcentracao>
            <DivMassa><h3>Número de unidades: {data.produto.numeroDeUnidades}</h3></DivMassa>
            <Descricao><strong>Descrição do produto: </strong>{data.produto.descricao}</Descricao>
        </Card>
    );
} 

export default Produtos;