import { IResolutionRepository } from './interfaces/repository.interface';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ResolutionMapper } from './mapper/resolution.mapper';
import { ResolutionEntity } from './entities/resolution.entity';
import { IResolution } from './interfaces/resolution.interface';
import { Cache } from 'cache-manager';

@Injectable()
export class ResolutionRepository implements IResolutionRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: ResolutionMapper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async addResolution(
    resolutionEntity: ResolutionEntity,
  ): Promise<ResolutionEntity> {
    const resolution: IResolution = this.mapper.toRow(resolutionEntity);
    const sql = `INSERT INTO resolutions (
                 id,
                 value,
                 delay,
                 created_time,
                 patient_id, 
                 doctor_name, 
                 doctor_specialization) VALUES
                 ($1, $2, $3, $4, $5, $6, $7);`;
    await this.pool.query(sql, [
      resolution.id,
      resolution.value,
      resolution.delay,
      resolution.created_time,
      resolution.patient_id,
      resolution.doctor_name,
      resolution.doctor_specialization,
    ]);
    return resolutionEntity;
  }

  async getAllResolutions(patientID: string): Promise<ResolutionEntity[]> {
    const sql = `SELECT * FROM resolutions WHERE patient_id = $1`;
    const { rows } = await this.pool.query(sql, [patientID]);
    return rows.map((row) => {
      if (!row) {
        return this.mapper.toEntity({
          id: null,
          value: null,
          delay: null,
          created_time: null,
          doctor_name: null,
          doctor_specialization: null,
          patient_id: null,
        });
      }
      return this.mapper.toEntity(row);
    });
  }

  async getResolutionByID(resolutionID: string): Promise<ResolutionEntity> {
    let value: IResolution = await this.cacheManager.get(
      `resolution/${resolutionID}`,
    );

    const sql = `SELECT * FROM resolutions WHERE id = $1`;

    if (!value) {
      const { rows } = await this.pool.query(sql, [resolutionID]);
      const [result] = rows;
      await this.cacheManager.set(`resolution/${resolutionID}`, result, {
        ttl: 3600,
      });
      value = rows;
    }

    if (!value) {
      return this.mapper.toEntity({
        id: null,
        value: null,
        delay: null,
        created_time: null,
        doctor_name: null,
        doctor_specialization: null,
        patient_id: null,
      });
    }
    return this.mapper.toEntity(value);
  }

  async deleteResolution(resolutionID: string): Promise<string> {
    const sql = `DELETE FROM resolutions WHERE id = $1`;
    await this.pool.query(sql, [resolutionID]);
    await this.cacheManager.del(`resolution/${resolutionID}`);
    return resolutionID;
  }
}
