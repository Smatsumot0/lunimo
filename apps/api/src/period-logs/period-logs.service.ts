import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PeriodLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.periodLog.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
    });
  }

  async create(userId: string, startDate: string) {
    return this.prisma.periodLog.create({
      data: {
        userId,
        startDate: new Date(startDate),
      },
    });
  }

  async update(
    userId: string,
    id: string,
    patch: { startDate?: string; endDate?: string },
  ) {
    return this.prisma.periodLog.update({
      where: { userId, id },
      data: {
        ...(patch.startDate ? { startDate: new Date(patch.startDate) } : {}),
        ...(patch.endDate ? { endDate: new Date(patch.endDate) } : {}),
      },
    });
  }

  async remove(userId: string, id: string) {
    return this.prisma.periodLog.delete({
      where: { userId, id },
    });
  }
}
