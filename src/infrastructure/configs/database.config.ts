import { ConfigService } from '@nestjs/config';
import pkg from 'pg';

const { Pool } = pkg;

export function poolFactory(configService: ConfigService) {
  return new Pool({
    user: configService.get('DATABASE_USER'),
    host: configService.get('DATABASE_HOST'),
    database: configService.get('DATABASE_DB'),
    password: configService.get('DATABASE_PASSWORD'),
    port: configService.get('DATABASE_PORT'),
    ssl: {
      rejectUnauthorized: false,
    },
  });
}
