import { useRecoilState } from 'recoil'
import { ShoppingCart } from '../atoms/cart'

const [cart, setCart] = useRecoilState(ShoppingCart)

interface Produto {
    idProduto: string,
    nomeProduto: string,
    preco: string,
    quantidade: number,
    imagemProduto: ImageBitmap
}

export const addToCart = (produto: Produto) => {
    setCart(prevCart => [...prevCart, produto])
    localStorage.setItem('carrinho', JSON.stringify(cart))
}

// export const getCart = (): Produto[] => {

// }