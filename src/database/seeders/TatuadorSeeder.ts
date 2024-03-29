import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { Tatuador } from "../../models/Tatuador";
import { User } from "../../models/User";
import { TatuadorFactory } from "../factories/TatuadorFactory";

export class TatuadorSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { TATUADORES } = SeederConfig;

        const users = await User.find({
            where: {
                role: {
                    id: 2
                }
            }
        });

        const tatuadores = new TatuadorFactory().createMany(TATUADORES);
        tatuadores.forEach((tatuador, index) => {
            tatuador.user = users [index];
        });

        await Tatuador.save(tatuadores);
    }
}
