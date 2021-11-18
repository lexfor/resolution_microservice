import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { getParameter } from '../getParameter';

export function poolFactory(configService: ConfigService) {
  console.log(getParameter('DATABASE_URL'));
  return new Pool({
    connectionString: configService.get('DATABASE_URL'),
  });
}
