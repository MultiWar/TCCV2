import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { tblDetalhePedido } from "./DetalhesPedido";
import { tblFuncionario } from "./Funcionario";
import { tblProgEntrega } from "./ProgEntrega";
import { tblUser } from "./User";

@ObjectType()
@Entity()
export class tblPedido extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    idPedido!: string

    @Field(() => String, {nullable: true})
    @OneToOne(() => tblProgEntrega, {nullable: true})
    @JoinColumn({name: 'idProgEntrega'})
    idProgEntrega?: tblProgEntrega
    
    @Field()
    @Column('varchar', {length: 15})
    dataPedido!: string
    
    @Field()
    @Column('varchar', {length: 15})
    dataEntrega: string
    
    @Field()
    @Column('money')
    valorFinal: string
    
    @Field()
    @Column('varchar', {length: 8})
    status: string

    @Field(() => String, {nullable: true})
    @ManyToOne(() => tblFuncionario, funcionario => funcionario.pedidos, {nullable: true})
    @JoinColumn({name: 'idFuncionario'})
    idFuncionario?: tblFuncionario

    @Field(() => String)
    @ManyToOne(() => tblUser, user => user.pedidos, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'idUser'})
    idUser!: tblUser

    @Field(() => [tblDetalhePedido])
    @OneToMany(() => tblDetalhePedido, detalhePedido => detalhePedido.idPedido, {
        eager: true
    })
    @JoinTable()
    detalhesPedido: tblDetalhePedido[]
}