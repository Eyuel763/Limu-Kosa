/**
 * CLI Script: Reset Admin Password
 *
 * Usage:
 *   npm run reset-password -- --email=admin@limukosa.gov.et --password=NewSecurePass123!
 *
 * Or with ts-node directly:
 *   npx ts-node --compiler-options '{"module":"commonjs"}' scripts/reset-password.ts --email=admin@limukosa.gov.et --password=NewSecurePass123!
 */

import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

async function main() {
  const args = process.argv.slice(2);

  let email = "";
  let password = "";

  for (const arg of args) {
    if (arg.startsWith("--email=")) {
      email = arg.replace("--email=", "");
    } else if (arg.startsWith("--password=")) {
      password = arg.replace("--password=", "");
    }
  }

  if (!email || !password) {
    console.error("\n❌ Usage: npm run reset-password -- --email=<email> --password=<newPassword>\n");
    console.error("  Example: npm run reset-password -- --email=admin@limukosa.gov.et --password=NewSecurePass123!\n");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("\n❌ Password must be at least 8 characters long.\n");
    process.exit(1);
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.error(`\n❌ No user found with email: ${email}\n`);
      const allUsers = await prisma.user.findMany({
        select: { email: true, name: true, role: true },
      });
      if (allUsers.length > 0) {
        console.log("Available users:");
        allUsers.forEach((u) => console.log(`  - ${u.email} (${u.name}, ${u.role})`));
      }
      process.exit(1);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    // Revoke all active sessions
    await prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { revoked: true },
    });

    console.log(`\n✅ Password reset successfully for: ${user.email} (${user.name})`);
    console.log("   All active sessions have been revoked.\n");
  } catch (error) {
    console.error("\n❌ Failed to reset password:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
