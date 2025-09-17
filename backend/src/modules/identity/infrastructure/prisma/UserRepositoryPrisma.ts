import { PrismaClient } from "@prisma/client";


export class UserRepositoryPrisma {
constructor(private prisma: PrismaClient) {}


async findByEmail(email: string) {
return this.prisma.user.findUnique({ where: { email } });
}


async save(user: any) {
return this.prisma.user.create({ data: user });
}
}