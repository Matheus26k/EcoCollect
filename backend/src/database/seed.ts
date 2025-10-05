import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const ADMIN_EMAIL = 'admin@ecocollect.com';
  const ADMIN_PASSWORD = 'admin123';
  const ADMIN_NAME = 'Administrador EcoCollect';
  const ADMIN_ROLE = 'admin';
  const BCRYPT_SALT_ROUNDS = 10;
  
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, BCRYPT_SALT_ROUNDS);
  
  await prisma.user.deleteMany({
    where: { email: ADMIN_EMAIL }
  });

  await prisma.user.create({
    data: {
      email: ADMIN_EMAIL,
      password: hashedPassword,
      name: ADMIN_NAME,
      role: ADMIN_ROLE
    }
  });

  const materialTypes = [
    { name: 'Papel', description: 'Jornais, revistas, papelão', category: 'seco' },
    { name: 'Plástico', description: 'Garrafas PET, embalagens', category: 'seco' },
    { name: 'Vidro', description: 'Garrafas, potes, frascos', category: 'seco' },
    { name: 'Metal', description: 'Latas de alumínio, ferro', category: 'seco' },
    { name: 'Eletrônicos', description: 'Celulares, computadores, pilhas', category: 'eletrônico' },
    { name: 'Óleo de Cozinha', description: 'Óleo usado de frituras', category: 'especial' }
  ];

  for (const material of materialTypes) {
    await prisma.materialType.upsert({
      where: { name: material.name },
      update: {},
      create: material
    });
  }

  console.log('✅ Seed executado com sucesso!');
  console.log('👤 Usuário admin criado: admin@ecocollect.com');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });