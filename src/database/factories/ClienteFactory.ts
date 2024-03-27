import { Cliente } from "../../models/Cliente";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class ClienteFactory extends Factory<Cliente>{
    protected generate():Cliente{
        return{
         area: faker.location.city()
            
        } as Cliente;
    }
}