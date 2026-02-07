import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PeriodLogsService {
  constructor(private readonly prisma: PrismaService) {}

  // TODO: ユーザーIDは認証機能実装後に動的に取得するように修正する
  private readonly userId = 'dev-user';

  async list() {
    return this.prisma.periodLog.findMany({
      where: { userId: this.userId },
      orderBy: { startDate: 'desc' },
    });
  }

  async create(startDate: string) {
    return this.prisma.periodLog.create({
      data: {
        userId: this.userId,
        startDate: new Date(startDate),
      },
    });
  }

  async setEndDate(id: string, endDate: string) {
    return this.prisma.periodLog.update({
      where: { id },
      data: { endDate: new Date(endDate) },
    });
  }

  async remove(id: string) {
    return this.prisma.periodLog.delete({
      where: { id },
    });
  }
}
