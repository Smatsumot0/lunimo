import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { PeriodLogsModule } from './period-logs/period-logs.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // .envを読み込む
    PrismaModule,
    AuthModule,
    HealthModule,
    PeriodLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
