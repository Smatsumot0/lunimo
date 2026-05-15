import { HealthController } from './health.controller';

describe('HealthController', () => {
  const prisma = {
    $queryRaw: jest.fn(),
  };

  let controller: HealthController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new HealthController(prisma as never);
  });

  it('checks database connectivity and returns ok', async () => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    await expect(controller.health()).resolves.toEqual({ ok: true });
    expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
  });
});
