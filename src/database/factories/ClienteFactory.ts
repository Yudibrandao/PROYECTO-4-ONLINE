import { cliente } from "../../models/Cliente";
import {faker} from "@faker-js/faker";
import { Factory } from "./Factory";

export class ClientFactory extends Factory<cliente> {
    protected generate():cliente{
        return{
         area: faker.location.city()
            
        } as cliente;
    }
}