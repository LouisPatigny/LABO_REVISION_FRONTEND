import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../shared/models/product.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './voir-produits.component.html',
  styleUrls: ['./voir-produits.component.css']
})
export class VoirProduitsComponent implements OnInit {
  products: Product[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve resolved data from the route (Resolver)
    this.products = this.route.snapshot.data['products'];
  }
}
