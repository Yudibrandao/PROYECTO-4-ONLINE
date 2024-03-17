import { Tatuadores } from "../../models/Tatuador";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class TatuadoresFactory extends Factory<Tatuadores>{
    protected  generate(): Tatuadores {
        return {
            style: faker.helpers.arrayElement([
                    "Pequeno_BlancoNegro",
                    "Pequeno_Color",
                    "Mediano_BlancoNegro", 
                    "Mediano_Color",
                    "Grande_BlancoNegro",
                    "Grande_Color"
                ]), 
                area: faker.location.city()
                
                } as Tatuadores;
        
    }
}