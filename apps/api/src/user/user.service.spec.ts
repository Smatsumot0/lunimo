import { UserService } from './user.service';

describe('UserService', () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
    },
  };

  let service: UserService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new UserService(prisma as never);
  });

  it('finds a user by email', async () => {
    const user = { id: 'user-1', email: 'user@example.com' };
    prisma.user.findUnique.mockResolvedValue(user);

    await expect(service.findUserByEmail('user@example.com')).resolves.toBe(
      user,
    );
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: 'user@example.com' },
    });
  });
});
