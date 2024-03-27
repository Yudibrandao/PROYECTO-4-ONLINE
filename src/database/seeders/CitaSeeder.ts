import { SeederConfig } from "../../config/seeders";
import { Cita } from "../factories/Cita";
import { Seeder } from "./seeder";
import { Tatuador } from "../../models/Tatuador";
import { Cliente } from "../../models/Cliente";
import { getRandomValueFromArray } from "../../helpers/common";
import { Cita } from "../../models/Cita";

export class CitaSeeder extends Seeder{
    protected async generate():Promise<void>{
        const {Tatuador} = SeederConfig;
        const {Cliente}= SeederConfig;
        const {Cita} = SeederConfig;

        const Tatuadors= await Tatuador.find();
        const Clientes= await Cliente.find();

        const Citas = new Cita().createMany(Cita);
        Citas.forEach((Cita: { Tatuador: Tatuador; Cliente: Cliente; }) =>{
            Cita.Tatuador=getRandomValueFromArray(Tatuador);
            Cita.Cliente=getRandomValueFromArray(Cliente);
        })
        await Cita.save(Cita);
    }
}
