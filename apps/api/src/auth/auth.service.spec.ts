import { BadRequestException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  const jwtService = {
    signAsync: jest.fn().mockResolvedValue('signed-token'),
  };

  const userService = {
    findUserByEmail: jest.fn(),
  };

  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
    passwordResetToken: {
      updateMany: jest.fn(),
      create: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  let service: AuthService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new AuthService(prisma as never, jwtService as never, userService as never);
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
    prisma.$transaction.mockResolvedValue([]);
  });

  it('creates a user and returns a login response on signup', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({
      id: 'user-id',
      email: 'user@example.com',
    });

    await expect(service.signup('user@example.com', 'password123')).resolves.toEqual({
      ok: true,
      accessToken: 'signed-token',
      user: {
        id: 'user-id',
        email: 'user@example.com',
        name: 'ゲストユーザー',
      },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: { email: 'user@example.com', passwordHash: 'hashed-password' },
      select: { id: true, email: true },
    });
  });

  it('rejects duplicate signup emails', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-id' });

    await expect(service.signup('user@example.com', 'password123')).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('issues a password reset token for an existing user', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-id' });
    prisma.passwordResetToken.create.mockResolvedValue({});

    const result = await service.requestPasswordReset('user@example.com');

    expect(result.ok).toBe(true);
    expect('resetToken' in result).toBe(true);
    expect(prisma.passwordResetToken.updateMany).toHaveBeenCalled();
    expect(prisma.passwordResetToken.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        userId: 'user-id',
        tokenHash: expect.any(String),
        expiresAt: expect.any(Date),
      }),
    });
  });

  it('does not reveal whether a reset email exists', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.requestPasswordReset('missing@example.com')).resolves.toEqual({
      ok: true,
    });
    expect(prisma.passwordResetToken.create).not.toHaveBeenCalled();
  });

  it('updates the password when the reset token is valid', async () => {
    const expiresAt = new Date(Date.now() + 1000);
    prisma.passwordResetToken.findUnique.mockResolvedValue({
      id: 'reset-id',
      userId: 'user-id',
      usedAt: null,
      expiresAt,
      user: {
        id: 'user-id',
        email: 'user@example.com',
      },
    });

    await expect(service.confirmPasswordReset('reset-token', 'newpassword')).resolves.toEqual({
      ok: true,
      accessToken: 'signed-token',
      user: {
        id: 'user-id',
        email: 'user@example.com',
        name: 'ゲストユーザー',
      },
    });
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: 'user-id' },
      data: { passwordHash: 'hashed-password' },
    });
  });

  it('rejects expired reset tokens', async () => {
    prisma.passwordResetToken.findUnique.mockResolvedValue({
      usedAt: null,
      expiresAt: new Date(Date.now() - 1000),
    });

    await expect(
      service.confirmPasswordReset('reset-token', 'newpassword'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
