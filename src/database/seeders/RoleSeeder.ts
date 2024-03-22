import { Role } from "../../models/Role";
import { Seeder } from "./Seeder";

export class RoleSeeder extends Seeder {
    protected async generate(): Promise<void> {
        const roles: Partial<Role>[] = [
            { nombre : "admin"},
            { nombre : "tatuador"},
            { nombre : "user"},  
        ];
        
        await Role.save(roles);
    }
}
