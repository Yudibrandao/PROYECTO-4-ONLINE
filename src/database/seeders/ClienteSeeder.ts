import { cliente } from "../../models/Cliente";
import { Seeder } from "./Seeder";
import { SeederConfig } from "../../config/seeders";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { ClienteFactory } from "../factories/ClienteFactory";

export class ClientSeeder extends Seeder{
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
        const clients = new ClienteFactory().createMany(CLIENTE);
        clients.forEach((client: { user: User; })=>{
            client.user=getRandomValueFromArray(users)
        })
        await cliente.save(clients);
    } 
}