import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { tblPedido } from "./Pedido";
import { tblProduto } from "./Produto";

@ObjectType()
@Entity()
export class tblDetalhePedido extends BaseEntity {

    @Field(() => String)
    @PrimaryColumn('uuid')
    @ManyToOne(() => tblPedido, pedido => pedido.detalhesPedido, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'idPedido'})
    idPedido!: tblPedido

    @Field(() => Number)
    @PrimaryColumn('int')
    @ManyToOne(() => tblProduto, produto => produto.detalhesPedido, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'idProduto'})
    idProduto!: tblProduto

    @Field(() => String)
    @Column('varchar', {length: 30})
    nomeProduto: string

    @Field()
    @Column('int')
    qtde!: number
}