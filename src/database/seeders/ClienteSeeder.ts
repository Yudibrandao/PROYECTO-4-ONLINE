import { Cliente } from "../../models/Cliente";
import { Seeder } from "./seeder";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { ClienteFactory } from "../factories/ClienteFactory";

export class ClienteSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {Cliente} = SeederConfig;

        const users =await User.find(
            {
                where:{
                    role:{
                        id:3
                    }
                }
            }
        );
        const Clientes = new ClienteFactory().createMany(ClienteS);
        Clientes.forEach((Cliente: { user: User; })=>{
            Cliente.user=getRandomValueFromArray(users)
        })
        await Cliente.save(Clientes);
    } 
}