import { IResolutionRepository } from './interfaces/repository.interface';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ResolutionRepository implements IResolutionRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: PatientMapper,
  ) {}

  async createPatient(patientEntity: PatientEntity): Promise<PatientEntity> {
    const patient: IPatient = this.mapper.toRow(patientEntity);
    const sql = `INSERT INTO patients 
                 (id, name, birthday, gender, mail, user_id) SET VALUES
                 ($1, $2, $3, $4, $5, $6);`;
    await this.pool.query(sql, [
      patient.id,
      patient.name,
      patient.birthday,
      patient.gender,
      patient.mail,
      patient.user_id,
    ]);
    return patientEntity;
  }

  async findPatientByUserID(userID: string): Promise<PatientEntity> {
    const sql = `SELECT * FROM patients WHERE user_id = $1`;
    const { rows } = await this.pool.query(sql, [userID]);
    const [result] = rows;
    return this.mapper.toEntity(result);
  }

  async getAllPatients(patientInfo: string): Promise<PatientEntity[]> {
    const sql = `SELECT * FROM patients
                 WHERE name LIKE '%${patientInfo}%'
                 OR mail LIKE '%${patientInfo}%'`;
    const { rows } = await this.pool.query(sql);
    return rows.map((row) => {
      return this.mapper.toEntity(row);
    });
  }

  async getPatientByID(patientID: string): Promise<PatientEntity> {
    const sql = `SELECT * FROM patients
                 WHERE id = $1`;
    const { rows } = await this.pool.query(sql, [patientID]);
    const [result] = rows;
    return this.mapper.toEntity(result);
  }
}
