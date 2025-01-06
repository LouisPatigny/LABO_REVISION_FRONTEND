import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MerchService } from '../services/merch.service';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class MerchResolver implements Resolve<Product[]> {
  constructor(private merchService: MerchService) {}

  resolve(): Observable<Product[]> {
    return this.merchService.getActiveProducts();
  }
}
