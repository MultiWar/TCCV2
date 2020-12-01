import {useRecoilState} from 'recoil'
import { ShoppingCart } from '../atoms/cart';

export default function useGetTotal (): number {
    const [cart] = useRecoilState(ShoppingCart)

    let somaPrecos = 0;
    cart.map(produto => {
        somaPrecos += (produto.quantidade * Number(produto.preco))
    })
    return Math.round((somaPrecos + Number.EPSILON) * 100) / 100
}