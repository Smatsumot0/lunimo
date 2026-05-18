import { PeriodDayLogsService } from './period-day-logs.service';

describe('PeriodDayLogsService', () => {
  const prisma = {
    periodDayLog: {
      findMany: jest.fn(),
      upsert: jest.fn(),
    },
  };

  let service: PeriodDayLogsService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PeriodDayLogsService(prisma as never);
  });

  it('lists day logs for a user from newest date first', async () => {
    const logs = [{ id: 'day-log-1' }];
    prisma.periodDayLog.findMany.mockResolvedValue(logs);

    await expect(service.list('user-1')).resolves.toBe(logs);
    expect(prisma.periodDayLog.findMany).toHaveBeenCalledWith({
      where: { userId: 'user-1' },
      orderBy: { date: 'desc' },
    });
  });

  it('upserts a day log by user and date', async () => {
    const log = { id: 'day-log-1' };
    prisma.periodDayLog.upsert.mockResolvedValue(log);

    await expect(
      service.upsert('user-1', '2026-05-18', {
        painVolume: 3,
        medicineCount: 2,
      }),
    ).resolves.toBe(log);
    expect(prisma.periodDayLog.upsert).toHaveBeenCalledWith({
      where: {
        userId_date: {
          userId: 'user-1',
          date: new Date('2026-05-18'),
        },
      },
      create: {
        userId: 'user-1',
        date: new Date('2026-05-18'),
        painVolume: 3,
        medicineCount: 2,
      },
      update: {
        painVolume: 3,
        medicineCount: 2,
      },
    });
  });
});
