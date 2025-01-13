import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Result } from '../models/result.model';
import { Trainer } from '../models/trainer.model';
import { TrainerRegisterModel } from '../models/trainer-register.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private readonly apiUrl = 'https://localhost:7092/api/trainers';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { }

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(`${this.apiUrl}`).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }

  registerTrainer(trainer: TrainerRegisterModel): Observable<Trainer> {
    return this.http.post<Trainer>(`${this.apiUrl}`, trainer).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }

  getTrainerById(id: number): Observable<Trainer> {
    return this.http.get<Trainer>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.errorHandler.handleHttpError.bind(this.errorHandler))
    );
  }
}
