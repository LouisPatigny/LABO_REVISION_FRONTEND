import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MerchService {
  constructor(private http: HttpClient) { }

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/Product/active`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/Product/${id}`);
  }
}
