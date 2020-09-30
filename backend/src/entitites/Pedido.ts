import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @Field(() => String)
    @OneToOne(() => tblProgEntrega)
    @JoinColumn({name: 'idProgEntrega'})
    idProgEntrega: tblProgEntrega
    
    @Field()
    @Column('smalldatetime')
    dataPedido!: string
    
    @Field()
    @Column('smalldatetime')
    dataEntrega: string
    
    @Field()
    @Column('money')
    valorFinal: string
    
    @Field()
    @Column('varchar', {length: 8})
    status: string

    @Field(() => String)
    @ManyToOne(() => tblFuncionario, funcionario => funcionario.pedidos)
    @JoinColumn({name: 'idFuncionario'})
    idFuncionario: tblFuncionario

    @Field(() => String)
    @ManyToOne(() => tblUser, user => user.pedidos)
    @JoinColumn({name: 'idUser'})
    idUser!: tblUser

    @OneToMany(() => tblDetalhePedido, detalhePedido => detalhePedido.idPedido)
    detalhesPedido: tblDetalhePedido[]
}