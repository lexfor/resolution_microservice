import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'lab',
    protoPath: join(__dirname, '../grpc/grpc.proto'),
  },
};
