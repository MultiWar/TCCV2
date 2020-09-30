import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { tblAgenda } from "./Agenda";
import { tblPedido } from "./Pedido";
import { tblProgEntrega } from "./ProgEntrega";

@ObjectType()
@Entity()
export class tblUser extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    idUser!: string

    @Field()
    @Column('varchar', {length: 50})
    email!: string

    @Field()
    @Column('varchar', {length: 11, unique: true})
    cpf!: string

    @Field()
    @Column('varchar', {length: 64})
    salt: string

    @Column('varchar', {length: 100})
    senhaUser!: string

    @Field()
    @Column('varchar', {length: 40})
    nomeUser!: string

    @Field()
    @Column('varchar', {length: 16, nullable: true})
    fone!: string

    @Field()
    @Column('varchar', {length: 50, nullable: true})
    endereco!: string

    @OneToMany(() => tblPedido, pedidos => pedidos.idUser)
    pedidos: tblPedido[]

    @OneToMany(() => tblProgEntrega, progEntrega => progEntrega.idUser)
    progEntrega: tblProgEntrega[]

    @OneToMany(() => tblAgenda, agenda => agenda.idUser)
    agendas: tblAgenda[]
}