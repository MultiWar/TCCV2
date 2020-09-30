import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tblUser } from "./User";

@Entity()
export class tblAgenda extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idAgenda: string

    @ManyToOne(() => tblUser, user => user.agendas)
    @JoinColumn({name: 'idUser'})
    idUser!: tblUser

    @Column('time')
    intervalo: string

    @Column('time')
    duracao: string

    @Column('varchar', {length: 20})
    dose: string
}