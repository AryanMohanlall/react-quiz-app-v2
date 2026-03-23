import { PrismaClient } from '@prisma/client';

// PrismaClient is instantiated globally to prevent multiple instances
// in development due to Next.js hot-reloading. This is a common pattern.

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient({
  log: ['query'], // Optional: logs all queries to the console for debugging
});

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;
