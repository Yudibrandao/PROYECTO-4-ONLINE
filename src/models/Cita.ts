import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Role } from "./Role"; 

@Entity('citas')
export class Cita extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: "fecha" })
    day_date!: Date;

    @Column({ name: "estado" })
    estado!: string;

    @ManyToOne(() => Role, Role => Role.cita)
    @JoinColumn({ name: "role_id" })
    role!: Role;
    static cliente: any;
    static tatuador: any;
    client: any;
}
