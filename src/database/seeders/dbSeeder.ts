import { UserFactory } from "../factories/UserFactory";

const users = new UserFactory().createMany(4);
console.log(users);