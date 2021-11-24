import { Inject, Injectable } from '@nestjs/common';
import {
  HealthIndicator,
  HealthIndicatorResult,
  HealthCheckError,
} from '@nestjs/terminus';
import { sendMessage } from '../sendMessage';

@Injectable()
export class DatabaseHealthIndicator extends HealthIndicator {
  constructor(@Inject('DATABASE_POOL') private pool) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const sql = `SELECT * FROM specializations`;
    const { rows } = await this.pool.query(sql);
    const isHealthy = rows.length !== 0;
    const result = this.getStatus(key, isHealthy, { rows: rows.length });
    if (isHealthy) {
      return result;
    }
    await sendMessage('database from resolution microservice not available');
    throw new HealthCheckError('database failed', result);
  }
}
