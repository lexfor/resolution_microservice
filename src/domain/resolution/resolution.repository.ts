import { IResolutionRepository } from './interfaces/repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { ResolutionMapper } from './mapper/resolution.mapper';
import { ResolutionEntity } from './entities/resolution.entity';
import { IResolution } from './interfaces/resolution.interface';

@Injectable()
export class ResolutionRepository implements IResolutionRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: ResolutionMapper,
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
    const sql = `SELECT * FROM resolutions WHERE id = $1`;
    const { rows } = await this.pool.query(sql, [resolutionID]);
    const [result] = rows;
    if (!result) {
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
    return this.mapper.toEntity(result);
  }

  async deleteResolution(resolutionID: string): Promise<string> {
    const sql = `DELETE FROM resolutions WHERE id = $1`;
    await this.pool.query(sql, [resolutionID]);
    return resolutionID;
  }
}
