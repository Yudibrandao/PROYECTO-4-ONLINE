import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { TatuadorSeeder } from "./TatuadorSeeder";
import { ClienteSeeder } from "./ClienteSeeder";
import { TatuadorSeeder } from "./TatuadorSeeder";

(async () =>{
    console.log('starting seeding')
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new TatuadorSeeder().start();
    await new ClienteSeeder().start();
    await new TatuadorSeeder().start();
})()