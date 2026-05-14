import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PeriodLogsService } from './period-logs.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import type { AuthUser } from 'src/auth/jwt.strategy';
import { CurrentUser } from 'src/auth/user.decorator';
import { IsDateString } from 'class-validator';

class CreatePeriodLogDto {
  @IsDateString()
  startDate!: string;
}

class SetPeriodLogEndDateDto {
  @IsDateString()
  endDate!: string;
}

@UseGuards(JwtAuthGuard)
@Controller('period-logs')
export class PeriodLogsController {
  constructor(private readonly service: PeriodLogsService) {}

  @Get()
  async list(@CurrentUser() user: AuthUser) {
    return this.service.list(user.id);
  }

  @Post()
  async create(
    @CurrentUser() user: AuthUser,
    @Body() body: CreatePeriodLogDto,
  ) {
    return this.service.create(user.id, body.startDate);
  }

  @Patch(':id')
  async setEndDate(
    @CurrentUser() user: AuthUser,
    @Param('id') id: string,
    @Body() body: SetPeriodLogEndDateDto,
  ) {
    return this.service.setEndDate(user.id, id, body.endDate);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.service.remove(user.id, id);
  }
}
