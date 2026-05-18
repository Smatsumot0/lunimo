import { PeriodDayLogsController } from './period-day-logs.controller';
import type { AuthUser } from 'src/auth/jwt.strategy';

describe('PeriodDayLogsController', () => {
  const service = {
    list: jest.fn(),
    upsert: jest.fn(),
  };

  const user: AuthUser = {
    id: 'user-1',
    email: 'user@example.com',
  };

  let controller: PeriodDayLogsController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new PeriodDayLogsController(service as never);
  });

  it('lists day logs for the current user', async () => {
    const logs = [{ id: 'day-log-1' }];
    service.list.mockResolvedValue(logs);

    await expect(controller.list(user)).resolves.toBe(logs);
    expect(service.list).toHaveBeenCalledWith('user-1');
  });

  it('upserts a day log for the current user and date', async () => {
    const log = { id: 'day-log-1' };
    const patch = { painVolume: 2, medicineCount: 1 };
    service.upsert.mockResolvedValue(log);

    await expect(controller.upsert(user, '2026-05-18', patch)).resolves.toBe(
      log,
    );
    expect(service.upsert).toHaveBeenCalledWith('user-1', '2026-05-18', patch);
  });
});
