import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
       const { ADMINS, TATUADORES, CLIENTE } = SeederConfig;
 
       const userFactory = new UserFactory();
 
       // admins
       const adminUsers = userFactory.createMany(ADMINS);
       adminUsers.forEach((user) => {
          user.role = UserRoles.ADMIN;
       });
 
       // managers
       const tatuadorUsers = userFactory.createMany(TATUADORES);
       tatuadorUsers.forEach((user) => {
          user.role = UserRoles.TATUADOR;
       });
 
       // CLIENTE
       const clienteUsers = userFactory.createMany(CLIENTE);
       clienteUsers.forEach((user) => {
          user.role = UserRoles.CLIENTE;
       });
 
       // save to database
       const allUsers = [...adminUsers, ...tatuadorUsers, ...clienteUsers];
       await User.save(allUsers);
    }
 }