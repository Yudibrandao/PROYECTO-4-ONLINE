import { seederConfig } from "../../config/seeders";
import { userRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder {
    protected async generate(): Promise<void> {
       const { ADMINS, TATUADORES, CLIENTE } = seederConfig;
 
       const userFactory = new UserFactory();
 
       // admins
       const adminUsers = userFactory.createMany(ADMINS);
       adminUsers.forEach((user) => {
          user.role = userRoles.ADMIN;
       });
 
       // managers
       const tatuadorUsers = userFactory.createMany(TATUADORES);
       tatuadorUsers.forEach((user) => {
          user.role = userRoles.TATUADOR;
       });
 
       // CLIENTE
       const clienteUsers = userFactory.createMany(CLIENTE);
       clienteUsers.forEach((user) => {
          user.role = userRoles.CLIENTE;
       });
 
       // save to database
       const allUsers = [...adminUsers, ...tatuadorUsers, ...clienteUsers];
       await User.save(allUsers);
    }
 }