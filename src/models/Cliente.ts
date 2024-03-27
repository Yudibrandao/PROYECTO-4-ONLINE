import { Entity, PrimaryGeneratedColumn,Column,OneToOne,JoinColumn,OneToMany, BaseEntity } from "typeorm"
import { User } from "./User";
import { Cita } from "./Cita";

@Entity('Cliente')
export class Cliente extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!:number;

    @Column({name:"user_id"})
    userID!: number;

    @Column({name:"area"})
    area!: string;

    
    //Relation: Client {1}--{1} User
    @OneToOne(()=>User,(user)=>user.id)
    @JoinColumn({name:"user_id"})
    user!:User

    //Relation Client {1}--{0..n} Citas
    @OneToMany(() => Cita, (Cita) => Cita.cliente)
    Citas?: Cita[];

   
}