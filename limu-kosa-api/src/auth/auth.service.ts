import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import * as crypto from "crypto";
import * as nodemailer from "nodemailer";
import { PrismaService } from "../prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  private hashToken(rawToken: string): string {
    return crypto.createHash("sha256").update(rawToken).digest("hex");
  }

  async forgotPassword(email: string) {
    const cleanEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email: cleanEmail } });

    if (user) {
      await this.prisma.passwordResetToken.updateMany({
        where: { userId: user.id, used: false },
        data: { used: true },
      });

      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = this.hashToken(rawToken);
      const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await this.prisma.passwordResetToken.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt,
        },
      });

      const frontendUrl = (process.env.FRONTEND_URL || "http://localhost:3000").replace(/\/+$/, "");
      const resetUrl = `${frontendUrl}/admin?resetToken=${rawToken}&email=${encodeURIComponent(cleanEmail)}`;

      if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        try {
          const smtpPort = Number(process.env.SMTP_PORT || 465);
          const isSecure = process.env.SMTP_SECURE !== undefined ? process.env.SMTP_SECURE === "true" : smtpPort === 465;

          const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: smtpPort,
            secure: isSecure,
            auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
            connectionTimeout: 10000,
            greetingTimeout: 5000,
            socketTimeout: 10000,
          });

          await transporter.sendMail({
            from: process.env.SMTP_FROM || `"Limu Kosa Admin" <${process.env.SMTP_USER}>`,
            to: cleanEmail,
            subject: "Reset your Limu Kosa Admin Password",
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; rounded: 8px;">
                <h2 style="color: #1E5631; margin-bottom: 16px;">Limu Kosa Woreda Administration</h2>
                <p style="font-size: 14px; color: #333;">Hello ${user.name},</p>
                <p style="font-size: 14px; color: #333;">We received a request to reset your password for the Limu Kosa Admin Portal. Click the button below to set a new password:</p>
                <div style="margin: 24px 0;">
                  <a href="${resetUrl}" style="background-color: #1E5631; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 6px; display: inline-block;">Reset Password</a>
                </div>
                <p style="font-size: 12px; color: #666;">Or copy and paste this link into your browser:</p>
                <p style="font-size: 12px; color: #1E5631; word-break: break-all;">${resetUrl}</p>
                <p style="font-size: 12px; color: #888; margin-top: 24px;">This link is valid for 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
              </div>
            `,
          });
        } catch (mailErr) {
          console.error("Failed to send reset email via SMTP:", mailErr);
          console.log(`[PASSWORD RESET LINK FOR ${cleanEmail}]: ${resetUrl}`);
        }
      } else {
        console.log(`\n======================================================`);
        console.log(`[PASSWORD RESET LINK GENERATED FOR ${cleanEmail}]`);
        console.log(`RESET URL: ${resetUrl}`);
        console.log(`======================================================\n`);
      }
    }

    return {
      message: "If an account exists with that email, a password reset link has been sent.",
    };
  }

  async resetPasswordWithToken(email: string, rawToken: string, newPassword: string) {
    const cleanEmail = email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({ where: { email: cleanEmail } });

    if (!user) {
      throw new BadRequestException("Invalid email or reset token.");
    }

    const tokenHash = this.hashToken(rawToken);
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken || resetToken.userId !== user.id || resetToken.used || resetToken.expiresAt < new Date()) {
      throw new BadRequestException("Invalid, used, or expired password reset token.");
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    await this.prisma.passwordResetToken.update({
      where: { id: resetToken.id },
      data: { used: true },
    });

    await this.prisma.refreshToken.updateMany({
      where: { userId: user.id },
      data: { revoked: true },
    });

    return { message: "Password updated successfully. You can now sign in with your new password." };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Invalid credentials");
    }

    const accessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshTokenStr = crypto.randomBytes(40).toString("hex");
    const tokenHash = this.hashToken(refreshTokenStr);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      accessToken,
      refreshToken: refreshTokenStr,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async refreshToken(rawRefreshToken: string) {
    if (!rawRefreshToken) {
      throw new UnauthorizedException("Refresh token is required");
    }

    const tokenHash = this.hashToken(rawRefreshToken);
    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { tokenHash },
      include: { user: true },
    });

    if (!storedToken || storedToken.revoked || storedToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    // Revoke current token (rotation)
    await this.prisma.refreshToken.update({
      where: { id: storedToken.id },
      data: { revoked: true },
    });

    const user = storedToken.user;
    const newAccessToken = await this.jwtService.signAsync({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshTokenStr = crypto.randomBytes(40).toString("hex");
    const newTokenHash = this.hashToken(newRefreshTokenStr);
    const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await this.prisma.refreshToken.create({
      data: {
        tokenHash: newTokenHash,
        userId: user.id,
        expiresAt: newExpiresAt,
      },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshTokenStr,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async logout(rawRefreshToken: string) {
    if (rawRefreshToken) {
      const tokenHash = this.hashToken(rawRefreshToken);
      await this.prisma.refreshToken.updateMany({
        where: { tokenHash },
        data: { revoked: true },
      });
    }
    return { message: "Logged out successfully" };
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException("Current password is incorrect");
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newHash },
    });

    // Revoke all existing sessions for this user on password change
    await this.prisma.refreshToken.updateMany({
      where: { userId },
      data: { revoked: true },
    });

    return { message: "Password changed successfully" };
  }

  // ── User Management (ADMIN only) ──────────────────────────────

  async listUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, createdAt: true },
      orderBy: { createdAt: "asc" },
    });
    return users;
  }

  async createUser(name: string, email: string, password: string, role: "ADMIN" | "EDITOR") {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new UnauthorizedException("A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { name, email, passwordHash, role },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return user;
  }

  async resetUserPassword(targetUserId: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: targetUserId },
      data: { passwordHash: newHash },
    });

    // Revoke all sessions for the target user
    await this.prisma.refreshToken.updateMany({
      where: { userId: targetUserId },
      data: { revoked: true },
    });

    return { message: `Password reset successfully for ${user.email}` };
  }

  async deleteUser(targetUserId: string, requestingUserId: string) {
    if (targetUserId === requestingUserId) {
      throw new UnauthorizedException("You cannot delete your own account.");
    }

    const user = await this.prisma.user.findUnique({ where: { id: targetUserId } });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    await this.prisma.user.delete({ where: { id: targetUserId } });
    return { message: `User ${user.email} deleted successfully` };
  }
}
