import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, BaseEntity, OneToMany } from "typeorm"
import { User } from "./User"
import { Cita } from "./Cita"

@Entity('tatuadores')
export class Tatuadores extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_id" })
    userID!: number;

    @Column({ name: "style" })
    style!: string;

    @Column({ name: "area" })
    area!: string;


    //Relation 1:1 with user
    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User


    //Relation {1}--{0..n} with appointments
    @OneToMany(() => Cita, (appointment) => Cita.tatuador)
    appointments?: Cita[];
    static user: any;
}