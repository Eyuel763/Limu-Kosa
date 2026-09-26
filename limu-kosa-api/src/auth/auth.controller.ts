import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";
import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

class LoginDto {
  @ApiProperty({ example: "admin@limukosa.gov.et" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "password123", minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;
}

class ChangePasswordDto {
  @ApiProperty({ example: "Admin@12345" })
  @IsString()
  currentPassword!: string;

  @ApiProperty({ example: "NewSecurePassword123!", minLength: 8 })
  @IsString()
  @MinLength(8)
  newPassword!: string;
}

const REFRESH_COOKIE_NAME = "refreshToken";

function setRefreshCookie(res: Response, token: string) {
  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path: "/api/auth",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

function clearRefreshCookie(res: Response) {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    path: "/api/auth",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
}

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Log in as an administrator" })
  @Post("login")
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(dto.email, dto.password);
    setRefreshCookie(res, result.refreshToken);
    return {
      accessToken: result.accessToken,
      user: result.user,
    };
  }

  @ApiOperation({ summary: "Refresh access token using HttpOnly cookie" })
  @Post("refresh")
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenStr = req.cookies?.[REFRESH_COOKIE_NAME];
    if (!refreshTokenStr) {
      return { accessToken: null, user: null };
    }
    try {
      const result = await this.authService.refreshToken(refreshTokenStr);
      setRefreshCookie(res, result.refreshToken);
      return {
        accessToken: result.accessToken,
        user: result.user,
      };
    } catch {
      clearRefreshCookie(res);
      return { accessToken: null, user: null };
    }
  }

  @ApiOperation({ summary: "Log out administrator and clear session cookie" })
  @Post("logout")
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshTokenStr = req.cookies?.[REFRESH_COOKIE_NAME];
    await this.authService.logout(refreshTokenStr);
    clearRefreshCookie(res);
    return { message: "Logged out successfully" };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Change password for logged-in admin" })
  @Post("change-password")
  async changePassword(
    @Req() req: any,
    @Body() dto: ChangePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.changePassword(req.user.id, dto.currentPassword, dto.newPassword);
    clearRefreshCookie(res);
    return result;
  }
}
