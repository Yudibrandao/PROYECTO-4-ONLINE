import { faker } from "@faker-js/faker";
import { Cita } from "../../models/Cita";
import { Factory } from "./Factory";

export class AppointmentFactory extends Factory<Cita>{
    protected generate():Cita{
        return{
            day_date: faker.date.future(),
            description: faker.lorem.sentence(),
            price: faker.number.int({ min: 1000, max: 10000 })
        } as unknown as Cita 
    }
}