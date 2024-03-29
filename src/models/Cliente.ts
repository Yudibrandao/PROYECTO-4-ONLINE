import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany, BaseEntity } from "typeorm";
import { User } from "./User";
import { Cita } from "./Cita";

@Entity('clientes')
export class Cliente extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "user_id" })
    userID!: number;

    @Column({ name: "area" })
    area!: string;

    // Relación: Cliente {1}--{1} User
    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User;

    // Relación: Cliente {1}--{0..n} Citas
    @OneToMany(() => Cita, (Cita) => Cita.cliente)
    Citas?: Cita[];
}
