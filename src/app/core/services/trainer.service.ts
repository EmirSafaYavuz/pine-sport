import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../models/result.model';
import { Trainer } from '../models/trainer.model';
import { TrainerRegisterModel } from '../models/trainer-register.model';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private readonly apiUrl = 'https://localhost:7092/api';

  constructor(private http: HttpClient) { }

  getTrainers(): Observable<Result<Trainer[]>> {
    return this.http.get<Result<Trainer[]>>(`${this.apiUrl}/trainer`);
  }

  registerTrainer(trainer: TrainerRegisterModel): Observable<Result<any>> {
    return this.http.post<Result<any>>(`${this.apiUrl}/trainer`, trainer);
  }
}
