import {atom} from 'recoil'

interface Produto {
    idProduto: string,
    nomeProduto: string,
    preco: string,
    quantidade: number,
    imagemProduto: ImageBitmap
}

const carrinhoInicial = localStorage.getItem('carrinho')

export const ShoppingCart = atom<Produto[]>({
    key: 'cart',
    default: carrinhoInicial ? JSON.parse(carrinhoInicial) : []
})