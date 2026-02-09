import { AuthUser } from 'src/auth/jwt.strategy';

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
