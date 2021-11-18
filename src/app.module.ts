import { Module } from '@nestjs/common';
import { ResolutionModule } from './domain/resolution/resolution.module';
import { GrpcController } from './grpc.controller';
import { ConfigModule } from '@nestjs/config';
import config from './infrastructure/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    ResolutionModule,
  ],
  controllers: [GrpcController],
})
export class AppModule {}
