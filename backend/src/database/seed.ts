import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Criar usuário administrador
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  // Deletar usuário existente se houver
  await prisma.user.deleteMany({
    where: { email: 'admin@ecocollect.com' }
  });

  // Criar novo usuário
  await prisma.user.create({
    data: {
      email: 'admin@ecocollect.com',
      password: hashedPassword,
      name: 'Administrador EcoCollect',
      role: 'admin'
    }
  });

  // Criar tipos de materiais
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
  console.log('👤 Usuário admin criado: admin@ecocollect.com / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });