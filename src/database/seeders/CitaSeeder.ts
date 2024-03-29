import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { Tatuador } from "../../models/Tatuador";
import { Cliente } from "../../models/Cliente";
import { getRandomValueFromArray } from "../../helpers/common";
import { Cita } from "../../models/Cita";
import { CitaFactory } from "../factories/CitasFactory";

export class CitaSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const { TATUADORES, CLIENTE, CITAS } = SeederConfig;

        const tatuadores = await Tatuador.find();
        const clientes = await Cliente.find();

        const citas = new CitaFactory().createMany(CITAS);
        citas.forEach((cita: Cita) => {
            cita.Tatuador = getRandomValueFromArray(tatuadores);
            cita.cliente = getRandomValueFromArray(clientes);
        });

        await Cita.save(citas);
    }
}
