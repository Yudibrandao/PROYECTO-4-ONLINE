import { Cliente } from "../../models/Cliente";
import { Seeder } from "./Seeder";
import { seederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { ClienteFactory } from "../factories/ClienteFactory";
import { getRandomValueFromArray } from "../../helpers/common";

export class ClienteSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {CLIENTE} = seederConfig;

        const users =await User.find(
            {
                where:{
                    role:{
                        id:3
                    }
                }
            }
        );
        const clientes = new ClienteFactory().createMany(CLIENTE);
        clientes.forEach((cliente: {user:User;})=> {
            cliente.user= getRandomValueFromArray(users)
        })
        await Cliente.save(clientes);
    } 
}