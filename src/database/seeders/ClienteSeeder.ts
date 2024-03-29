import { Cliente } from "../../models/Cliente";
import { Seeder } from "./Seeder";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { ClienteFactory } from "../factories/ClienteFactory";

export class ClienteSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {CLIENTE} = SeederConfig;

        const users =await User.find(
            {
                where:{
                    role:{
                        id:3
                    }
                }
            }
        );
        const Clientes = new ClienteFactory().createMany(CLIENTE);
        Clientes.forEach((Cliente, index)=>{
            Cliente.user= users[index]
        })
        await Cliente.save(Clientes);
    } 
}