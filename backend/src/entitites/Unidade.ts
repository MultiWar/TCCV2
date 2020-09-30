import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tblEstoque } from "./Estoque";
import { tblFuncionario } from "./Funcionario";

@Entity()
export class tblUnidade extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idUnidade!: string
    
    @Column('varchar', {length: 30})
    nomeUnidade!: string
    
    @Column('varchar', {length: 50})
    endereco!: string
    
    @OneToMany(() => tblFuncionario, funcionarios => funcionarios.idUnidade)
    funcionarios: tblFuncionario[]

    @OneToMany(() => tblEstoque, estoque => estoque.idUnidade)
    estoques: tblEstoque[]
}