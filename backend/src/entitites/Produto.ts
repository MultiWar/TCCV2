import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tblDetalhePedido } from "./DetalhesPedido";
import { tblEstoque } from "./Estoque";
import { tblFornecedor } from "./Fornecedor";
import { tblProgEntrega } from "./ProgEntrega";

@ObjectType()
@Entity()
export class tblProduto extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    idProduto!: string

    @Field()
    @Column('varchar', {length: 20})
    nomeProduto!: string
    
    @Field()
    @Column('varchar', {length: 400})
    descricao?: string
    
    @Field()
    @Column('varchar', {length: 50})
    categoria!: string
    
    @Field()
    @Column('money')
    preco!: string
    
    @Field()
    @Column('varchar', {length: 10})
    tarja?: string
    
    @Field()
    @Column('varchar', {length: 50})
    principioAtivo?: string
    
    @Field()
    @Column('varchar', {length: 5})
    concentracao?: string

    @Field(() => String)
    @ManyToOne(() => tblFornecedor, fornecedor => fornecedor.produtos)
    @JoinColumn({name: 'idFornecedor'})
    idFornecedor: tblFornecedor

    @OneToMany(() => tblEstoque, estoque => estoque.idProduto)
    estoques: tblEstoque[]

    @OneToMany(() => tblProgEntrega, progEntrega => progEntrega.idProduto)
    progEntrega: tblProgEntrega[]

    @OneToMany(() => tblDetalhePedido, detalhePedido => detalhePedido.idProduto)
    detalhesPedido: tblDetalhePedido[]
}