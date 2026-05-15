import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { createHash, randomBytes } from 'crypto';

type JwtPayload = { sub: string; email: string };
type AuthUser = { id: string; email: string };

const PASSWORD_RESET_TTL_MS = 60 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) throw new UnauthorizedException('Invalid credentials');

    return this.createLoginResponse(user);
  }

  async signup(email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new ConflictException('User already exists');

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { email, passwordHash },
      select: { id: true, email: true },
    });

    return this.createLoginResponse(user);
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (!user) return { ok: true as const };

    await this.prisma.passwordResetToken.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
        expiresAt: { gt: new Date() },
      },
      data: { usedAt: new Date() },
    });

    const resetToken = randomBytes(32).toString('base64url');
    const tokenHash = this.hashResetToken(resetToken);
    const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);

    await this.prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt,
      },
    });

    return {
      ok: true as const,
      resetToken,
      expiresAt,
    };
  }

  async confirmPasswordReset(token: string, password: string) {
    const tokenHash = this.hashResetToken(token);
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
      include: { user: { select: { id: true, email: true } } },
    });

    if (
      !resetToken ||
      resetToken.usedAt ||
      resetToken.expiresAt.getTime() <= Date.now()
    ) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: resetToken.userId },
        data: { passwordHash },
      }),
      this.prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
      }),
    ]);

    return this.createLoginResponse(resetToken.user);
  }

  private async createLoginResponse(user: AuthUser) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      ok: true as const,
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: 'ゲストユーザー',
      },
    };
  }

  private hashResetToken(token: string) {
    return createHash('sha256').update(token).digest('hex');
  }
}
