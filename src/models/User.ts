import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, ManyToMany, OneToOne, OneToMany } from "typeorm"; 
import {Role} from "./Role"
import { Tatuadores } from "./Tatuador";
import { cliente } from "./Cliente";


@Entity('usuarios')
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name:"Nombre"})
    nombre!: string;

    @Column({name:"apellido"})
    apellido!:string;

    @Column({name:"email"})
    email!:string;

    @Column({name:"password", select:false})
    password!:string;

    @Column({name:"is_active"})
    isActive!:boolean;

    //Relacion N:1 con Roles
    @ManyToOne(()=>Role,(role)=>role.user)
    @JoinColumn({name:"role_id"})
    role!:Role;

    //Relation {1}--{0..n} clientes
    @OneToMany(() => cliente, (Cliente) => Cliente.user)
    cliente?: cliente[];

    //Relation {1}--{0..n} with tatuadores
    @OneToMany(() => Tatuadores, (artist) => Tatuadores.user)
    artists?: Tatuadores[];
}