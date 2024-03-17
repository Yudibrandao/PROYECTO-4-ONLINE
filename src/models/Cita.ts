import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Role } from "./Role"; // Asegúrate de importar la entidad Role

@Entity('citas')
export class Cita extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: "fecha" })
    day_date!: Date;

    @Column({ name: "estado" })
    estado!: string;

    // Relación con Role
    @ManyToOne(() => Role, role => role.cita)
    @JoinColumn({ name: "role_id" })
    role!: Role;
    static cliente: any;
    static tatuador: any;
}
