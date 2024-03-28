import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { Tatuador } from "../../models/Tatuador";
import { Cliente } from "../../models/Cliente";
import { getRandomValueFromArray } from "../../helpers/common";
import { Cita } from "../../models/Cita";

export class CitaSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { TATUADORES, CLIENTE, CITAS } = SeederConfig;

        const tatuadores = await Tatuador.find();
        const clientes = await Cliente.find();

        const citas = Cita.createMany(CITAS);
        citas.forEach((cita: Cita) => {
            cita.Tatuador = getRandomValueFromArray(tatuadores);
            cita.Cliente = getRandomValueFromArray(clientes);
        });

        await Cita.save(citas);
    }
}
