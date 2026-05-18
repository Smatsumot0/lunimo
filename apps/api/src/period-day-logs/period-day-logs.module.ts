import { Module } from '@nestjs/common';
import { PeriodDayLogsController } from './period-day-logs.controller';
import { PeriodDayLogsService } from './period-day-logs.service';

@Module({
  controllers: [PeriodDayLogsController],
  providers: [PeriodDayLogsService],
})
export class PeriodDayLogsModule {}
