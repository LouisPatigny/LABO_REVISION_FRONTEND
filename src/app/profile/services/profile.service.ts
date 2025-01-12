import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { OrderDTOModel } from '../../merch/shared/models/order.dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

  getFidelityPoints(id: number): Observable<number> {
    return this.http.get<number>(`${environment.apiUrl}/User/points/${id}`);
  }

  getUserOrders(email: string): Observable<OrderDTOModel[]> {
    return this.http.get<OrderDTOModel[]>(`${environment.apiUrl}/Order/allByEmail/${email}`);
  }
}
