import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../shared/models/product.model';
import { CartItem } from '../shared/models/cart.model';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-consulter-details',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './consulter-details.component.html',
  styleUrl: './consulter-details.component.css'
})
export class ConsulterDetailsComponent implements OnInit {
  product: Product | null = null;

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    // Retrieve resolved data from the route (Resolver)
    this.product = this.route.snapshot.data['product'];
  }

  addItem(product: Product): void {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    };
    this.cartService.addItem(cartItem);
  }
}
