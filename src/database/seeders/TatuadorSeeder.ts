import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { Tatuadores } from "../../models/Tatuador";
import { User } from "../../models/User";
import { getRandomValueFromArray } from "../../helpers/common";
import { Tatuadore} from "../factories/TatuadorFactory";
import { TatuadoresFactory } from "../factories/TatuadorFactory";


export class TatuadorSeeder extends Seeder{
    protected async generate():Promise <void>{
        const {TATUADOR} = SeederConfig;

        const users = await User.find(
            {
                where:{
                    role:{
                        id:2
                    }
                }
            }
        );
        const artists = new TatuadoresFactory().createMany(TATUADOR);
        artists.forEach((artist: { user: User; }) =>{
            artist.user= getRandomValueFromArray(users)
        })
        await Tatuador.save(artists);
    }
}