import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService<T> {
  constructor(private http: HttpClient) {}

  getAll(url: string) {
    return this.http.get<T[]>(url);
  }

  getById(url: string, id: number) {
    return this.http.get<T>(`${url}/${id}`);
  }

  create(url: string, data: T) {
    return this.http.post(url, data);
  }

  update(url: string, id: number, data: T) {
    return this.http.put(`${url}/${id}`, data);
  }

  delete(url: string, id: number) {
    return this.http.delete(`${url}/${id}`);
  }
}
