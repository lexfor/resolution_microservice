import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { getParameter } from '../getParameter';

export async function poolFactory(configService: ConfigService) {
  return new Pool({
    connectionString: await getParameter('DATABASE_URL'),
  });
}
