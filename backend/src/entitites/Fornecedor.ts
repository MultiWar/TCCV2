import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tblProduto } from "./Produto";

@Entity()
export class tblFornecedor extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idFornecedor!: string

    @Column('varchar', {length: 32})
    representante!: string

    @Column('varchar', {length: 32})
    endereco?: string

    @Column('int')
    fone!: number

    @OneToMany(() => tblProduto, produtos => produtos.idFornecedor)
    produtos: tblProduto[]

}