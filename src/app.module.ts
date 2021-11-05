import { Module } from '@nestjs/common';
import { ResolutionModule } from './domain/resolution/resolution.module';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [ResolutionModule],
  controllers: [GrpcController],
})
export class AppModule {}
