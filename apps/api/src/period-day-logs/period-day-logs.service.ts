import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

type PeriodDayLogPatch = {
  painVolume?: number;
  medicineCount?: number;
};

@Injectable()
export class PeriodDayLogsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.periodDayLog.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
    });
  }

  async upsert(userId: string, date: string, patch: PeriodDayLogPatch) {
    const dateValue = new Date(date);

    return this.prisma.periodDayLog.upsert({
      where: {
        userId_date: {
          userId,
          date: dateValue,
        },
      },
      create: {
        userId,
        date: dateValue,
        ...(patch.painVolume !== undefined
          ? { painVolume: patch.painVolume }
          : {}),
        ...(patch.medicineCount !== undefined
          ? { medicineCount: patch.medicineCount }
          : {}),
      },
      update: {
        ...(patch.painVolume !== undefined
          ? { painVolume: patch.painVolume }
          : {}),
        ...(patch.medicineCount !== undefined
          ? { medicineCount: patch.medicineCount }
          : {}),
      },
    });
  }
}
