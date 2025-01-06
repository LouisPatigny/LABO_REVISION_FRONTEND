import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  total = 0;
  isCartVisible = false;

  constructor(private cartService: CartService) {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });

    this.cartService.cartVisible$.subscribe(
      (visible) => (this.isCartVisible = visible)
    );
  }

  removeItem(id: number): void {
    this.cartService.removeItem(id);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  proceedToPayment(): void {
    console.log('Proceeding to payment...');
  }
}
