import type { Request, Response } from 'express';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  const service = {
    login: jest.fn(),
    signup: jest.fn(),
    requestPasswordReset: jest.fn(),
    confirmPasswordReset: jest.fn(),
  };

  let controller: AuthController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new AuthController(service as never);
  });

  it('delegates login to the auth service', async () => {
    const response = { ok: true, accessToken: 'token' };
    service.login.mockResolvedValue(response);

    await expect(
      controller.login({ email: 'user@example.com', password: 'password123' }),
    ).resolves.toBe(response);
    expect(service.login).toHaveBeenCalledWith(
      'user@example.com',
      'password123',
    );
  });

  it('clears the access token cookie on logout', () => {
    const clearCookie = jest.fn();
    const res = {
      clearCookie,
    } as unknown as Response;

    expect(controller.logout(res)).toEqual({ ok: true });
    expect(clearCookie).toHaveBeenCalledWith('access_token', { path: '/' });
  });

  it('delegates signup to the auth service', async () => {
    const response = { ok: true, accessToken: 'token' };
    service.signup.mockResolvedValue(response);

    await expect(
      controller.signup({ email: 'user@example.com', password: 'password123' }),
    ).resolves.toBe(response);
    expect(service.signup).toHaveBeenCalledWith(
      'user@example.com',
      'password123',
    );
  });

  it('delegates password reset request to the auth service', async () => {
    service.requestPasswordReset.mockResolvedValue({ ok: true });

    await expect(
      controller.requestPasswordReset({ email: 'user@example.com' }),
    ).resolves.toEqual({ ok: true });
    expect(service.requestPasswordReset).toHaveBeenCalledWith(
      'user@example.com',
    );
  });

  it('delegates password reset confirmation to the auth service', async () => {
    const response = { ok: true, accessToken: 'token' };
    service.confirmPasswordReset.mockResolvedValue(response);

    await expect(
      controller.confirmPasswordReset({
        token: 'reset-token',
        password: 'newpassword',
      }),
    ).resolves.toBe(response);
    expect(service.confirmPasswordReset).toHaveBeenCalledWith(
      'reset-token',
      'newpassword',
    );
  });

  it('returns the authenticated request user', () => {
    const req = {
      user: {
        id: 'user-1',
        email: 'user@example.com',
      },
    } as Request;

    expect(controller.me(req)).toEqual({
      id: 'user-1',
      email: 'user@example.com',
    });
  });
});
