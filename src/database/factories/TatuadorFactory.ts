import { Tatuadores } from "../../models/Tatuador";
import { Factory } from "./Factory";
import { faker} from "@faker-js/faker"; 

export class TatuadoresFactory extends Factory<Tatuadores>{
    protected  generate(): Tatuadores {
        return {
            style: faker.helpers.arrayElement([
                    "Blackwork",
                    "Old School",
                    "Neotradicional", 
                    "Dotwork",
                    "Black & Grey",
                    "Japonés Tradicional"
                ]), 
                area: faker.location.city()
                
                } as Tatuadores;
        
    }
}