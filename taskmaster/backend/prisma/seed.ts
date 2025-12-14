import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';

// Загружаем переменные окружения из файла .env
config(); 

// Инициализация Prisma Client
const prisma = new PrismaClient();

export { prisma };
