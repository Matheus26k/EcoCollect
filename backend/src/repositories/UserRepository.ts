import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async findByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    });
  }

  async create(data: { email: string; password: string; name: string }) {
    return await prisma.user.create({
      data
    });
  }
}