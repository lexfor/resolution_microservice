import { Module } from '@nestjs/common';
import { ResolutionModule } from './domain/resolution/resolution.module';
import { GrpcController } from './grpc.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import config from './infrastructure/config';
import { HealthController } from './infrastructure/healthcheck/health.controller';
import { DatabaseHealthIndicator } from './infrastructure/healthcheck/database.health';
import { poolFactory } from './infrastructure/configs/database.config';

@Module({
  imports: [
    ResolutionModule,
    TerminusModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [GrpcController, HealthController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    DatabaseHealthIndicator,
  ],
})
export class AppModule {}
