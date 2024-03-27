import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from "typeorm"
import { Tatuador } from "./Tatuador";
import { Cliente } from "./Cliente";

@Entity('Cita')
export class Appointment extends BaseEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name:"day_date" })
    day_date!: Date;

    @Column({ name: "Tatuador_id" })
    TatuadorID!: number;

    @Column({name:"Cliente_id"})
    ClienteID!: number;

    @Column({name:"description"})
    description!: string;

    @Column({name:"price"})
    price!: number;

    // Relation: Appointment {0..n}--{1} Tatuador
    @ManyToOne(()=>Tatuador,(Tatuador)=>Tatuador.id)
    @JoinColumn({name:"Tatuador_id"})
    Tatuador!:Tatuador;

    // Relation: Appointment {0..n}--{1} Cliente
    @ManyToOne(()=>Cliente,(Cliente)=>Cliente.id)
    @JoinColumn({name:"Cliente_id"})
    Cliente!:Cliente;

}