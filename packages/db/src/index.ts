import { PrismaClient } from './generated/prisma/client';  
import { PrismaPg } from '@prisma/adapter-pg';
import "dotenv/config";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:secretp@localhost:5432/postgres";

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({ adapter });