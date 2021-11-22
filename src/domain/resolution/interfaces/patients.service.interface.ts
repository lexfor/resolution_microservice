import { IUserIDMessage } from './userID-message.interface';
import { IPatientMessage } from './patient-message.interface';
import { Observable } from 'rxjs';

export interface IPatientService {
  getPatientByUserID(data: IUserIDMessage): Observable<IPatientMessage>;
  getPatientByID(data: IUserIDMessage): Observable<IPatientMessage>;
}
