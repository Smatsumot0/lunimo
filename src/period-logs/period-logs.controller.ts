import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PeriodLogsService } from './period-logs.service';

@Controller('period-logs')
export class PeriodLogsController {
  constructor(private readonly service: PeriodLogsService) {}

  @Get()
  async list() {
    return this.service.list();
  }

  @Post()
  async create(@Body() body: { startDate: string }) {
    return this.service.create(body.startDate);
  }

  @Patch(':id')
  async setEndDate(@Param('id') id: string, @Body() body: { endDate: string }) {
    return this.service.setEndDate(id, body.endDate);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
