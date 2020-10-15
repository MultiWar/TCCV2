import { useRecoilState } from 'recoil'
import { ShoppingCart } from '../atoms/cart'

const [cart, setCart] = useRecoilState(ShoppingCart)

export function useIsInCart (idProduto: string): Boolean {
    cart.map(produtoNoCarrinho => {
        if(produtoNoCarrinho.idProduto === idProduto) {
            return true
        }
    })
    return false
}