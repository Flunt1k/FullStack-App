import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../Interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<Category[]> {
      return this.http.get<Category[]>('/api/category')
  }

  fetchById(id: string): Observable<Category> {
    return this.http.get<Category>(`/api/category/${id}`)
  }
}
