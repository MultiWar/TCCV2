import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tblPedido } from "./Pedido";
import { tblUnidade } from "./Unidade";

@Entity()
export class tblFuncionario extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idFuncionario!: string
    
    @Column('varchar', {length: 15})
    cargo!: string
    
    @Column('varchar', {length: 40})
    nomeFuncionario!: string
    
    @Column('varchar', {length: 11, unique: true})
    cpf!: string

    @ManyToOne(() => tblUnidade, unidade => unidade.funcionarios)
    @JoinColumn({name: 'idUnidade'})
    idUnidade: tblUnidade

    @OneToMany(() => tblPedido, pedido => pedido.idFuncionario)
    pedidos: tblPedido[]
}