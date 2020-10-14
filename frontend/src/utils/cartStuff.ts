import { useRecoilState } from 'recoil'
import { ShoppingCart } from '../atoms/cart'

const [cart, setCart] = useRecoilState(ShoppingCart)

export function useIsInCart (idProduto: string): Boolean {
    cart.map(produto => {
        if(produto.idProduto === idProduto) {
            return true
        }
    })
    return false
}