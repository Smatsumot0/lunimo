import { PeriodLogsService } from './period-logs.service';

describe('PeriodLogsService', () => {
  const prisma = {
    periodLog: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  let service: PeriodLogsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PeriodLogsService(prisma as never);
  });

  it('lists period logs for a user from newest start date first', async () => {
    const logs = [{ id: 'log-1' }];
    prisma.periodLog.findMany.mockResolvedValue(logs);

    await expect(service.list('user-1')).resolves.toBe(logs);
    expect(prisma.periodLog.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: { startDate: 'desc' },
    });
  });

  it('creates a period log with a Date startDate', async () => {
    const log = { id: 'log-1' };
    prisma.periodLog.create.mockResolvedValue(log);

    await expect(service.create('user-1', '2026-05-15')).resolves.toBe(log);
    expect(prisma.periodLog.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
        startDate: new Date('2026-05-15'),
      },
    });
  });

  it('updates only provided date fields', async () => {
    const log = { id: 'log-1' };
    prisma.periodLog.update.mockResolvedValue(log);

    await expect(
      service.update('user-1', 'log-1', { endDate: '2026-05-20' }),
    ).resolves.toBe(log);
    expect(prisma.periodLog.update).toHaveBeenCalledWith({
      where: { userId: 'user-1', id: 'log-1' },
      data: {
        endDate: new Date('2026-05-20'),
      },
    });
  });

  it('removes a period log for a user', async () => {
    const log = { id: 'log-1' };
    prisma.periodLog.delete.mockResolvedValue(log);

    await expect(service.remove('user-1', 'log-1')).resolves.toBe(log);
    expect(prisma.periodLog.delete).toHaveBeenCalledWith({
      where: { userId: 'user-1', id: 'log-1' },
    });
  });
});
