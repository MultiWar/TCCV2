import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tblProduto } from "./Produto";
import { tblUser } from "./User";

@Entity()
export class tblProgEntrega extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    idProgEntrega: string
    
    @Column('time')
    intervaloEntrega!: string
    
    @Column('date')
    inicioProg!: Date
    
    @Column('date')
    fimProg!: Date

    @ManyToOne(() => tblProduto, produto => produto.progEntrega)
    @JoinColumn({name: 'idProduto'})
    idProduto!: tblProduto

    @ManyToOne(() => tblUser, user => user.progEntrega)
    @JoinColumn({name: 'idUser'})
    idUser!: tblUser
}