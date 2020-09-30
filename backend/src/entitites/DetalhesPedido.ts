import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { tblPedido } from "./Pedido";
import { tblProduto } from "./Produto";

@ObjectType()
@Entity()
export class tblDetalhePedido extends BaseEntity {

    @Field(() => String)
    @PrimaryColumn('uuid')
    @ManyToOne(() => tblPedido, pedido => pedido.detalhesPedido)
    @JoinColumn({name: 'idPedido'})
    idPedido!: tblPedido

    @Field(() => String)
    @PrimaryColumn('uuid')
    @ManyToOne(() => tblProduto, produto => produto.detalhesPedido)
    @JoinColumn({name: 'idProduto'})
    idProduto!: tblProduto

    @Field()
    @Column('int')
    qtde!: number
}