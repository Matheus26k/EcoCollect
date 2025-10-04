import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class MaterialTypeRepository {
  async findActive() {
    return await prisma.materialType.findMany({
      where: { active: true },
      orderBy: { name: 'asc' }
    });
  }

  async findAll() {
    return await prisma.materialType.findMany({
      orderBy: { name: 'asc' }
    });
  }

  async findById(id: string) {
    return await prisma.materialType.findUnique({
      where: { id }
    });
  }
}