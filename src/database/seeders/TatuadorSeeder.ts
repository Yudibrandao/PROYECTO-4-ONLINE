import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./seeder";
import { Tatuador } from "../../models/Tatuador";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { TatuadorFactory } from "../factories/TatuadorFactory";


export class TATUADORESSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {TATUADORES} = SeederConfig;

        const users = await User.find(
            {
                where:{
                    role:{
                        id:2
                    }
                }
            }
        );
        const TATUADORESs = new TatuadorFactory().createMany(TATUADORES);
        TATUADORES.forEach((TATUADORES: { user: User; }) =>{
            TATUADORES.user= getRandomValueFromArray(users)
        })
        await TATUADORES.save(TATUADORES);
    }
}