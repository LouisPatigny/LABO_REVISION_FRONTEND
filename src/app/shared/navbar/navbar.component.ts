import { Component } from '@angular/core';
import { CartService } from '../../merch/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCartVisible = false;

  constructor(private cartService: CartService) {
    this.cartService.cartVisible$.subscribe(
      (visible) => (this.isCartVisible = visible)
    );
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }
}
