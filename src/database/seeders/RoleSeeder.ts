import { Seeder } from "./Seeder";
import { Role } from "../../models/Role";
import { userRoles } from "../../constants/UserRoles";

export class RoleSeeder extends Seeder{
    protected async generate(): Promise<void> {
        const roles: Partial<Role>[] = [
            userRoles.ADMIN,
            userRoles.TATUADOR,
            userRoles.CLIENTE
        ];
        await Role.save(roles);
    }
}