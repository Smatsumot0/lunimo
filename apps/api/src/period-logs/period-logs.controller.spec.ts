import { PeriodLogsController } from './period-logs.controller';
import type { AuthUser } from 'src/auth/jwt.strategy';

describe('PeriodLogsController', () => {
  const service = {
    list: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const user: AuthUser = {
    id: 'user-1',
    email: 'user@example.com',
  };

  let controller: PeriodLogsController;

  beforeEach(() => {
    jest.clearAllMocks();
    controller = new PeriodLogsController(service as never);
  });

  it('lists logs for the current user', async () => {
    const logs = [{ id: 'log-1' }];
    service.list.mockResolvedValue(logs);

    await expect(controller.list(user)).resolves.toBe(logs);
    expect(service.list).toHaveBeenCalledWith('user-1');
  });

  it('creates a log for the current user', async () => {
    const log = { id: 'log-1' };
    service.create.mockResolvedValue(log);

    await expect(
      controller.create(user, { startDate: '2026-05-15' }),
    ).resolves.toBe(log);
    expect(service.create).toHaveBeenCalledWith('user-1', '2026-05-15');
  });

  it('updates a log for the current user', async () => {
    const log = { id: 'log-1' };
    const patch = { startDate: '2026-05-15', endDate: '2026-05-20' };
    service.update.mockResolvedValue(log);

    await expect(controller.setEndDate(user, 'log-1', patch)).resolves.toBe(
      log,
    );
    expect(service.update).toHaveBeenCalledWith('user-1', 'log-1', patch);
  });

  it('removes a log for the current user', async () => {
    const log = { id: 'log-1' };
    service.remove.mockResolvedValue(log);

    await expect(controller.remove(user, 'log-1')).resolves.toBe(log);
    expect(service.remove).toHaveBeenCalledWith('user-1', 'log-1');
  });
});
