import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { MerchService } from '../services/merch.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductResolver implements Resolve<Product> {
  constructor(private merchService: MerchService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product> {
    const id = route.params['id'];
    return this.merchService.getProductById(id);
  }
}
