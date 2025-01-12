import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleHttpError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400 && error.error?.errors) {
      return throwError(() => ({
        message: 'Validation failed',
        errors: error.error.errors
      } as ErrorResponse));
    }
    return throwError(() => ({
      message: error.error?.message || 'An unexpected error occurred'
    } as ErrorResponse));
  }
}
