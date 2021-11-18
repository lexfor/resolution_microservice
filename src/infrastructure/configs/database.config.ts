import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { getParameter } from '../getParameter';

export function poolFactory(configService: ConfigService) {
  return new Pool({
    connectionString: configService.get('DATABASE_URL'),
  });
}
