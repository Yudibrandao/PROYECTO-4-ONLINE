import { Entity,Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity, OneToMany } from "typeorm"
import { User } from "./User"
import { Cita } from "./Cita"

@Entity('tatuadores')
export class Tatuador extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({name:"user_id"})
    userID!: number;

    @Column({name:"style"})
    style!: string;

    @Column({name:"area"})
    area!: string;


    //Relation Tatuador {1}--{1} User
    @OneToOne(()=>User,(user)=>user.id)
    @JoinColumn({name:"user_id"})
    user!:User

    // Relation: Tatuador {1}--{0..n} Citas
    @OneToMany(() => Cita, (cita) => cita.Tatuador)
    citas?: Cita[];
    
}