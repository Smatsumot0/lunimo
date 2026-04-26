import { Module } from '@nestjs/common';
import { PeriodLogsController } from './period-logs.controller';
import { PeriodLogsService } from './period-logs.service';

@Module({
  controllers: [PeriodLogsController],
  providers: [PeriodLogsService],
})
export class PeriodLogsModule {}
