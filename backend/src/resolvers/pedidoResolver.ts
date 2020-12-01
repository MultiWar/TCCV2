import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import { getConnection } from 'typeorm';
import { tblDetalhePedido } from '../entitites/DetalhesPedido';
import { tblPedido as Pedido } from '../entitites/Pedido'
import { tblProduto } from '../entitites/Produto';
import { tblUser } from '../entitites/User';

@InputType()
export class ProdutoAdicionado {
    @Field(() => Number)
    idProduto: number

    @Field(() => Number)
    quantidade: number
}

@ObjectType()
export class MeusPedidos {
    @Field(() => String)
    idPedido: string

    @Field(() => Number)
    valorFinal: number

    @Field(() => String)
    status: string

    @Field(() => [tblDetalhePedido])
    detalhesPedidos: tblDetalhePedido[]
}

@Resolver()
export class PedidoResolver {

    @Query(() => [Pedido])
    async meusPedidos(
        @Arg('cpf', () => String) cpf: string,
    ): Promise<Pedido[]> {
        const user = await tblUser.findOne({cpf})
        return await Pedido.find({idUser: user})
    }

    @Mutation(() => Boolean)
    async fazerPedido(
        @Arg('produtos', () => [ProdutoAdicionado]) produtos: ProdutoAdicionado[],
        @Arg('cpf', () => String) cpf: string,
        @Arg('prazoDeEntrega', () => Number) prazoDeEntrega: number,
        @Arg('valorFinal', () => Number) valorFinal: number,
    ): Promise<Boolean> {
        const user = await tblUser.findOne({cpf: cpf})

        const date = new Date()
        const orderDay = date.getDate()
        const orderMonth = date.getMonth()
        const orderYear = date.getFullYear()

        let dia = orderDay + prazoDeEntrega
        let dia2
        let ano
        let mes
        let DataEntrega
        if(((orderMonth === 1 || orderMonth === 3 || orderMonth === 5 || orderMonth === 7 || orderMonth === 8 || orderMonth === 10 || orderMonth === 12) && dia > 31)) {
            dia2 = dia - 31
            if(orderMonth === 12) {
                mes = 1
                ano = orderYear + 1
            }
            else {
                mes = orderMonth + 1
                ano = orderYear
            }
        }
        else if((orderMonth === 2) && orderDay > 28 && (orderYear % 4 !== 0)) {
            dia2 = dia - 28
            mes = 3
            ano = orderYear
        }
        else if((orderMonth === 4 || orderMonth === 6 || orderMonth === 9 || orderMonth === 11) && dia > 30) {
            dia2 = dia - 30
            mes = orderMonth + 1
            ano = orderYear
        }
        else {
            dia2 = dia
            mes = orderMonth
            ano = orderYear
        }
        
        DataEntrega = `${dia2}/${mes}/${ano}`

        try {
            const pedido = new Pedido()
            pedido.idUser = user as tblUser
            pedido.valorFinal = valorFinal.toString()
            pedido.dataPedido = `${orderDay}/${orderMonth}/${orderYear}`
            pedido.dataEntrega = `${dia2}/${mes}/${ano}`
            pedido.status = 'pendente'

            await getConnection().manager.save(pedido)

            let detalhesPedido: tblDetalhePedido[] = []

            produtos.forEach(async produto => {
                const product = await tblProduto.findOne(produto.idProduto)

                let Detalhe = new tblDetalhePedido()
                Detalhe.idPedido = pedido
                Detalhe.idProduto = product as tblProduto
                Detalhe.qtde = produto.quantidade

                detalhesPedido.push(Detalhe)
                await getConnection().manager.save(Detalhe)
            })

            pedido.detalhesPedido = detalhesPedido
            pedido.save()
            return true
        }
        catch(e) {
            console.log(e)
            return false
        }
    }
}