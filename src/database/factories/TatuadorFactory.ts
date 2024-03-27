import { Tatuador } from "../../models/Tatuador";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class TatuadorFactory extends Factory<Tatuador>{
    protected generate():Tatuador{
        return{
            style: faker.helpers.arrayElement([
                "Neotraditional",
                "Traditional",
                "Trashpolka",
                "Japanese",
                "Blackworks",
                "Minimalist",
                "Realism"
            ]),
            area: faker.location.city()
            
        } as Tatuador;
    }
}