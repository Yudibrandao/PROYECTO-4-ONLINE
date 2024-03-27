import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./seeder";
import { Tatuador } from "../../models/Tatuador";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { TatuadorFactory } from "../factories/TatuadorFactory";


export class TatuadorSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {Tatuador} = SeederConfig;

        const users = await User.find(
            {
                where:{
                    role:{
                        id:2
                    }
                }
            }
        );
        const Tatuadors = new TatuadorFactory().createMany(Tatuador);
        Tatuadors.forEach((Tatuador: { user: User; }) =>{
            Tatuador.user= getRandomValueFromArray(users)
        })
        await Tatuador.save(Tatuador);
    }
}