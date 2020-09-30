import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { tblProduto } from "./Produto";
import { tblUnidade } from "./Unidade";

@Entity()
export class tblEstoque extends BaseEntity {

    @ManyToOne(() => tblProduto, produto => produto.estoques)
    @PrimaryColumn('uuid')
    @JoinColumn({name: 'idProduto'})
    idProduto: tblProduto

    @ManyToOne(() => tblUnidade, unidade => unidade.estoques)
    @PrimaryColumn('uuid')
    @JoinColumn({name: 'idUnidade'})
    idUnidade: tblUnidade

    @Column('varchar', {length: 20})
    qtde: string
}