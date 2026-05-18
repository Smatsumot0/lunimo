import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import type { AuthUser } from 'src/auth/jwt.strategy';
import { CurrentUser } from 'src/auth/user.decorator';
import { PeriodDayLogsService } from './period-day-logs.service';

class UpdatePeriodDayLogDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(4)
  painVolume?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99)
  medicineCount?: number;
}

@UseGuards(JwtAuthGuard)
@Controller('period-day-logs')
export class PeriodDayLogsController {
  constructor(private readonly service: PeriodDayLogsService) {}

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    return this.service.list(user.id);
  }

  @Patch(':date')
  async upsert(
    @CurrentUser() user: AuthUser,
    @Param('date') date: string,
    @Body() body: UpdatePeriodDayLogDto,
  ) {
    return this.service.upsert(user.id, date, body);
  }
}
