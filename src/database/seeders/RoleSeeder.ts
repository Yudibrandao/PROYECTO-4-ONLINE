// En RoleSeeder.ts
import { Role } from '../models/Role';

export class RoleSeeder {
    async start(): Promise<void> {
        // Crear roles
        const rolesToCreate: Partial<Role>[] = [
            { name: "admin" },
            { name: "tatuador" },
            { name: "user" }
        ];

        // Guardar roles en la base de datos
        await Role.insert(rolesToCreate);
    }
}
