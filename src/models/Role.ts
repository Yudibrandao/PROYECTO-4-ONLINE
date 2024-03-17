import { BaseEntity, Entity, PrimaryGeneratedColumn,Column, OneToMany } from "typeorm"
import { User } from "./User";

@Entity('roles')
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name:"name"})
    name!: string;

    // Relation 1:N con tabla user
    @OneToMany(()=> User,(user)=>user.role)
    user!:User[];
    cita: any;

}