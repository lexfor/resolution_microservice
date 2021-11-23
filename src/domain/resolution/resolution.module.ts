import { CacheModule, Module } from '@nestjs/common';
import { ResolutionController } from './resolution.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AddResolution } from './actions/addResolution';
import { DeleteResolution } from './actions/deleteResolution';
import { GetAllResolutions } from './actions/getAllResolutions';
import { ResolutionMapper } from './mapper/resolution.mapper';
import { ResolutionRepository } from './resolution.repository';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { JwtStrategy } from '../../infrastructure/strategies/jwt.strategy';
import { GetResolutionByID } from './actions/getResolutionByID';
import config from '../../infrastructure/config';
import { LoggerModule } from '../../infrastructure/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    CacheModule.register(),
    LoggerModule,
  ],
  controllers: [ResolutionController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'DATABASE_REPOSITORY',
      useClass: ResolutionRepository,
    },
    AddResolution,
    DeleteResolution,
    GetAllResolutions,
    GetResolutionByID,
    ResolutionMapper,
    JwtStrategy,
  ],
})
export class ResolutionModule {}
