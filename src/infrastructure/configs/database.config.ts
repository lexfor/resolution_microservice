import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

export async function poolFactory(configService: ConfigService) {
  return new Pool({
    connectionString: configService.get('DATABASE_URL'),
  });
}
