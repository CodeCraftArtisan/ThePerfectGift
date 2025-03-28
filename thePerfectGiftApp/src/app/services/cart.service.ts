import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  stripeID: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];  
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart); // Reactive cart state
  cart$ = this.cartSubject.asObservable(); // Observable for navbar & cart component

  getCart(): CartItem[] {  
    return [...this.cart];
  }

  addToCart(product: CartItem): void {
    console.log('Adding to cart:', product);
    const existingItem = this.cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...this.cart]); // Notifies navbar & cart component
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.cartSubject.next([...this.cart]); 
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  clearCart(): void {
    this.cart = [];
    this.cartSubject.next([...this.cart]); 
  }
}
