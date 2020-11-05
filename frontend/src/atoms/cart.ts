import {atom} from 'recoil'

interface Produto {
    idProduto: number,
    nomeProduto: string,
    preco: string,
    imagem: string,
    quantidade: number
    // imagemProduto: ImageBitmap
}

const carrinhoInicial = localStorage.getItem('carrinho')

export const ShoppingCart = atom<Produto[]>({
    key: 'cart',
    default: carrinhoInicial ? JSON.parse(carrinhoInicial) : []
})