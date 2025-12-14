import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

config();

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo users with hashed passwords
  const adminPassword = await bcrypt.hash('admin123', 12);
  const demoPassword = await bcrypt.hash('demo123', 12);

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@taskmaster.io' },
    update: {},
    create: {
      email: 'admin@taskmaster.io',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isActive: true,
      isEmailVerified: true,
    },
  });
  console.log('✅ Created admin user:', admin.email);

  // Regular user - John
  const john = await prisma.user.upsert({
    where: { email: 'john@taskmaster.io' },
    update: {},
    create: {
      email: 'john@taskmaster.io',
      passwordHash: demoPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
      isActive: true,
      isEmailVerified: true,
    },
  });
  console.log('✅ Created user:', john.email);

  // Regular user - Jane
  const jane = await prisma.user.upsert({
    where: { email: 'jane@taskmaster.io' },
    update: {},
    create: {
      email: 'jane@taskmaster.io',
      passwordHash: demoPassword,
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'USER',
      isActive: true,
      isEmailVerified: true,
    },
  });
  console.log('✅ Created user:', jane.email);

  console.log('🎉 Seeding completed!');
  console.log('\n📝 Demo credentials:');
  console.log('   Admin: admin@taskmaster.io / admin123');
  console.log('   User:  john@taskmaster.io / demo123');
  console.log('   User:  jane@taskmaster.io / demo123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export { prisma };
