import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Tatuador } from "./Tatuador";
import { Cliente } from "./Cliente";

@Entity('citas')
export class Cita extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: "day_date" })
    day_date!: Date;

    @Column({ name: "tatuador_id" })
    TatuadorID!: number;

    @Column({ name: "cliente_id" })
    ClienteID!: number;

    @Column({ name: "description" })
    description!: string;

    @Column({ name: "price" })
    price!: number;

    // Relación: Cita {0..n}--{1} Tatuador
    @ManyToOne(() => Tatuador, (tatuador) => tatuador.citas)
    @JoinColumn({ name: "tatuador_id" })
    tatuador!: Tatuador;

    // Relación: Cita {0..n}--{1} Cliente
    @ManyToOne(() => Cliente, (cliente) => cliente.id)
    @JoinColumn({ name: "cliente_id" })
    cliente!: Cliente;
}
