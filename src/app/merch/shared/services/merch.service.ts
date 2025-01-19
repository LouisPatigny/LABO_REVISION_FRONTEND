import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, map, switchMap, of, tap} from 'rxjs';
import { Product } from '../models/product.model';
import { environment } from '../../../../environments/environment';
import { CartService } from './cart.service';
import { AuthService } from '../../../auth/services/auth.service';
import { ShippingAddressModel } from '../models/shipping.address.model';
import { CheckoutPayload } from '../models/checkout.payload.model';
import { OrderDTOModel } from '../models/order.dto.model';

@Injectable({
  providedIn: 'root'
})
export class MerchService {
  constructor(
    private http: HttpClient,
    private cartService: CartService,
    private authService: AuthService,
  ) { }

  checkoutOrder(shippingAddress: ShippingAddressModel): Observable<OrderDTOModel> {

    // If the user is logged in, use AuthService; otherwise, use the email from the shipping form.
    const userEmail = this.authService.isLoggedIn()
      ? this.authService.getCurrentUserEmail()!
      : shippingAddress.email!

    const cartItems = this.cartService.getCartItems().map(item => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price
    }));

    let discountApplied = 0;
    if (this.authService.isLoggedIn()) {

    }

    return this.getCurrentFidelityPointsIfLoggedIn().pipe(
      map(currentPoints => {
        if (currentPoints === 3) {
          discountApplied = 5;
        }
        return discountApplied;
      }),
      switchMap(discountValue => {
        const cartTotal = this.cartService.getTotal();
        const finalTotal = Math.max(0, cartTotal - discountValue);

        const payload: CheckoutPayload = {
          email: userEmail,
          shippingAddress: shippingAddress,
          cartItems: cartItems,
          discountApplied: discountValue,
          totalAmount: finalTotal,
          status: "paid",
          orderDate: new Date().toISOString()
        };
        console.log('Checkout payload:', payload);
        return this.http.post<OrderDTOModel>(`${environment.apiUrl}/Order/checkout`, payload).pipe(
          tap(() => {
          this.cartService.clearCart();
          })
        );
      }));
  }

  getCurrentFidelityPointsIfLoggedIn(): Observable<number> {
    if (this.authService.isLoggedIn()) {
      const userId = this.authService.getCurrentUserId();
      if (userId) {
        return this.http.get<number>(`${environment.apiUrl}/User/points/${userId}`);
      }
    }
    return of(0);
  }

  getActiveProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/Product/active`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/Product/${id}`);
  }
}
