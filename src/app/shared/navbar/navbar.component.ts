import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';

import { CartService } from '../../merch/shared/services/cart.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isCartVisible = false;

  constructor(private cartService: CartService, public authService: AuthService, private router: Router) {
    this.cartService.cartVisible$.subscribe(
      (visible) => (this.isCartVisible = visible)
    );
  }

  toggleCart(): void {
    this.cartService.toggleCart();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/merch']).then(r => {});
  }
}
