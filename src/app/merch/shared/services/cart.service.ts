import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly STORAGE_KEY = 'LABO_REVISION_CART';

  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  constructor() {
    this.loadCartFromLocalStorage();
  }

  toggleCart(): void {
    this.cartVisible.next(!this.cartVisible.getValue());
  }

  addItem(item: CartItem): void {
    const items = this.cartItems.getValue();
    const existingItem = items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      items.push(item);
    }
    this.cartItems.next([...items]);

    this.saveCartToLocalStorage();
  }

  removeItem(id: number): void {
    const items = this.cartItems.getValue().filter(i => i.id !== id);
    this.cartItems.next(items);

    this.saveCartToLocalStorage();
  }

  clearCart(): void {
    this.cartItems.next([]);

    this.saveCartToLocalStorage();
  }

  incrementQuantity(itemId: number): void {
    const items = this.cartItems.getValue();
    const index = items.findIndex(i => i.id === itemId);

    if (index !== -1) {
      if (items[index].stock == null || items[index].quantity < items[index].stock) {
        items[index].quantity++;
        this.cartItems.next([...items]);
        this.saveCartToLocalStorage();
      }
    }
  }

  decrementQuantity(itemId: number): void {
    const items = this.cartItems.getValue();
    const index = items.findIndex(i => i.id === itemId);

    if (index !== -1) {
      if (items[index].quantity > 1) {
        items[index].quantity--;
        this.cartItems.next([...items]);
        this.saveCartToLocalStorage();
      }
    }
  }

  getTotal(): number {
    return this.cartItems.getValue().reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  private loadCartFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      // If found, parse and load into BehaviorSubject
      const parsedItems: CartItem[] = JSON.parse(data);
      this.cartItems.next(parsedItems);
    }
  }

  private saveCartToLocalStorage(): void {
    const items = this.cartItems.getValue();
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }
}
