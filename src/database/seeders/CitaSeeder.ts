import { SeederConfig } from "../../config/seeders";
import { Citas } from "../factories/CitasFactory";
import { Seeder } from "./Seeder";
import { Tatuadores } from "../../models/Tatuador";
import { cliente } from "../../models/Cliente";
import { getRandomValueFromArray } from "../../helpers/common";
import { Cita } from "../../models/Cita";

export class AppointmentSeeder extends Seeder{
    protected async generate():Promise<void>{
        const {TATUADORES} = SeederConfig;
        const {CLIENTE}= SeederConfig;
        const {CITAS} = SeederConfig;

        const artists= await Tatuadores.find();
        const clients= await cliente.find();

        const appointments = new Citas().createMany(Cita);
        appointments.forEach((appointment: { artist: Tatuadores; client: cliente; }) =>{
            appointment.artist=getRandomValueFromArray(artists);
            appointment.client=getRandomValueFromArray(clients);
        })
        await Citas.save(appointments);
    }
}