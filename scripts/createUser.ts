import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  await prisma.user.create({
    data: {
      email: "test@test.com",
      password: hashedPassword,
      name: "Jimena",
    },
  });
}

main();
