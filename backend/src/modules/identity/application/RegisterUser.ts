import { v4 as uuid } from "uuid";
import { UserRepositoryPrisma } from "../infrastructure/prisma/UserRepositoryPrisma";


export class RegisterUser {
constructor(private repo: UserRepositoryPrisma, private hasher: any) {}


async execute(input: { email: string; password: string; firstName?: string; lastName?: string }) {
const existing = await this.repo.findByEmail(input.email);
if (existing) throw new Error("Email exists");
const id = uuid();
const hash = await this.hasher.hash(input.password);
const user = { id, email: input.email, passwordHash: hash, firstName: input.firstName, lastName: input.lastName };
await this.repo.save(user);
return user;
}
}