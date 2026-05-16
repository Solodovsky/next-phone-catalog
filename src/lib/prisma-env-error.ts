import { Prisma } from "@prisma/client";

export function isPrismaDatabaseUnavailableError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }
  const msg = error instanceof Error ? error.message : String(error);
  return (
    msg.includes("DATABASE_URL") ||
    msg.includes("Environment variable not found") ||
    msg.includes("Can't reach database server")
  );
}
