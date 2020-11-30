import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tblDetalhePedido } from "./DetalhesPedido";
import { tblEstoque } from "./Estoque";
import { tblFornecedor } from "./Fornecedor";
import { tblProgEntrega } from "./ProgEntrega";

@ObjectType()
@Entity()
export class tblProduto extends BaseEntity {
    // both idProduto and idFornecedor shoud eventually be replaced back to uuid and string
    // SPOILER: they won't
    @Field()
    @PrimaryGeneratedColumn()
    idProduto!: number

    @Field()
    @Column('varchar', {length: 40})
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
    
    @Field({nullable: true})
    @Column('varchar', {length: 10, nullable: true})
    tarja?: string
    
    @Field({nullable: true})
    @Column('varchar', {length: 60, nullable: true})
    principioAtivo?: string

    @Field()
    @Column('varchar', {length: 1200})
    imagem: string 
    
    @Field({nullable: true})
    @Column('varchar', {length: 10, nullable: true})
    concentracao?: string 
    
    @Field()
    @Column('int')
    numeroDeUnidades?: Number

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