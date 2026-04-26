import { PrismaClient } from '@prisma/client';
import pg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const { Pool } = pg;
const connectionString = process.env.DATABASE_URL;

async function checkAccounts() {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  try {
    const accounts = await prisma.account.findMany({
      include: {
        user: {
          select: {
            email: true,
            role: true
          }
        }
      }
    });
    console.log('Registered Accounts:');
    accounts.forEach(acc => {
       console.log(`Email: ${acc.user.email} | Provider: ${acc.providerId} | Has Password: ${!!acc.password}`);
    });
  } catch (error) {
    console.error('Error fetching accounts:', error);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

checkAccounts();
