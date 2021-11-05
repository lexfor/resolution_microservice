import { IPatient } from './patient.interface';

export interface IPatientService {
  getPatientByUserID(data: string): IPatient;
}
