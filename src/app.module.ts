import { Module } from '@nestjs/common';
import { ResolutionModule } from './domain/resolution/resolution.module';
import { GrpcController } from './grpc.controller';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config';

@Module({
  imports: [
    ResolutionModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [GrpcController],
})
export class AppModule {}
