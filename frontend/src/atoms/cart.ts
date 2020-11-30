import {atom} from 'recoil'

interface Produto {
    idProduto: number,
    nomeProduto: string,
    preco: string,
    quantidade: number
    // imagemProduto: ImageBitmap
}

const carrinhoInicial = localStorage.getItem('carrinho')

export const ShoppingCart = atom<Produto[]>({
    key: 'cart',
    default: carrinhoInicial ? JSON.parse(carrinhoInicial) : []
})

// SELECT * FROM tblProduto WHERE idProduto IN (SELECT idProduto FROM tblFavoritos WHERE idUsuario = idUsuarioLogado)