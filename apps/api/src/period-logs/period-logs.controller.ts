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
import { IsDateString, IsOptional } from 'class-validator';

class CreatePeriodLogDto {
  @IsDateString()
  startDate!: string;
}

class UpdatePeriodLogDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;
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
    @Body() body: UpdatePeriodLogDto,
  ) {
    return this.service.update(user.id, id, body);
  }

  @Delete(':id')
  async remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.service.remove(user.id, id);
  }
}
